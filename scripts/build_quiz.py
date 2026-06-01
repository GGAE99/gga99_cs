#!/usr/bin/env python3
"""
99-interview-questions/by-category/*.md 의 ??? quiz admonition 블록을 추출해
quiz/questions.json 으로 직렬화한다.

카드 인식 규칙
- 카드 구분자: 빈 줄 + '---' + 빈 줄
- 질문:      '## Q. <텍스트>'
- 퀴즈 블록: '??? quiz "..."' 이후 4칸 들여쓰기된 '- [x]' / '- [ ]' 항목
- 핵심 답안: '### 핵심 답안 ...' 이후 '>' 인용 블록
- 꼬리 질문: '### 꼬리 질문 ...' 이후 '-' 불릿
- 관련 문서: '### 관련 문서' 이후 마크다운 링크 '-' 불릿

퀴즈 블록이 없는 카드는 무시(점진적 마이그레이션 허용).
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from dataclasses import dataclass, asdict, field
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "99-interview-questions" / "by-category"
OUTPUT_FILE = ROOT / "quiz" / "questions.json"

CATEGORY_LABELS: dict[str, str] = {
    "data-structure": "자료구조",
    "operating-system": "운영체제",
    "network": "네트워크",
    "database": "데이터베이스",
    "computer-architecture": "컴퓨터 구조",
    "software-engineering": "SW 공학",
    "language-js": "JavaScript",
    "language-ts": "TypeScript",
    "backend": "백엔드",
    "devops": "DevOps / 인프라",
    "web": "웹 / 브라우저",
    "frontend": "프론트엔드",
    "mobile": "모바일",
    "ai-data": "AI / 데이터",
}

CARD_SEPARATOR = re.compile(r"\n\s*---\s*\n")
RE_QUESTION = re.compile(r"^##\s*Q\.\s*(.+?)\s*$", re.MULTILINE)
# note 어드모니션 + 제목이 "정답"으로 시작하는 블록만 퀴즈로 인식
RE_QUIZ_HEADER = re.compile(r'^\?\?\?\+?\s*note\b[^"\n]*"\s*정답[^"\n]*"', re.MULTILINE)
RE_QUIZ_OPTION = re.compile(r"^\s{4,}-\s*\[(x| )\]\s*(.+?)\s*$", re.MULTILINE)
RE_SECTION = re.compile(r"^###\s+(.+?)\s*$", re.MULTILINE)
RE_BLOCKQUOTE_LINE = re.compile(r"^>\s?(.*)$")
RE_BULLET = re.compile(r"^-\s+(.+?)\s*$")
RE_MD_LINK = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")


@dataclass
class QuizQuestion:
    id: str
    category: str
    category_label: str
    question: str
    answer: str
    distractors: list[str]
    explanation: str
    followups: list[str] = field(default_factory=list)
    related: list[dict[str, str]] = field(default_factory=list)
    source: str = ""


def stable_id(category: str, question: str) -> str:
    digest = hashlib.sha1(f"{category}|{question}".encode("utf-8")).hexdigest()
    return f"{category}-{digest[:8]}"


def _strip_emphasis(text: str) -> str:
    """줄 끝 공백 및 양 끝의 마크다운 강조(_,*) 제거 — 핵심 답안 추출용."""
    text = text.strip()
    while text and text[0] in ("_", "*") and text[-1] == text[0]:
        text = text[1:-1].strip()
    return text


def extract_quiz_block(card: str) -> tuple[str, list[str]] | None:
    """??? quiz 블록에서 정답 1개와 오답 리스트를 뽑는다. 없으면 None."""
    header_match = RE_QUIZ_HEADER.search(card)
    if not header_match:
        return None

    start = header_match.end()
    # 헤더 이후 줄 단위로 옵션 수집. 들여쓰기가 끊기면 종료.
    lines = card[start:].splitlines()
    correct: list[str] = []
    distractors: list[str] = []
    started = False
    for line in lines:
        if not line.strip():
            # admonition 안에서 빈 줄은 허용 (계속 진행)
            if started:
                continue
            else:
                continue
        # 들여쓰기 없는 줄 → 블록 끝
        if not line.startswith(("    ", "\t")):
            break
        m = RE_QUIZ_OPTION.match(line)
        if not m:
            # 블록 내부의 다른 들여쓴 줄(추가 설명 등)은 허용하고 스킵
            continue
        started = True
        mark, text = m.group(1), m.group(2).strip()
        if mark == "x":
            correct.append(text)
        else:
            distractors.append(text)

    if not correct:
        return None
    if len(correct) > 1:
        print(f"  ⚠️  정답이 2개 이상 — 첫 번째만 사용: {correct}", file=sys.stderr)
    return correct[0], distractors


def extract_section(card: str, section_pattern: str) -> str:
    """### <섹션> 다음 본문(다음 ### 전까지)을 반환."""
    re_header = re.compile(rf"^###\s+{section_pattern}\s*$", re.MULTILINE)
    m = re_header.search(card)
    if not m:
        return ""
    body_start = m.end()
    next_section = RE_SECTION.search(card, body_start)
    body_end = next_section.start() if next_section else len(card)
    return card[body_start:body_end].strip()


def extract_blockquote(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines():
        bm = RE_BLOCKQUOTE_LINE.match(line.strip())
        if bm:
            content = bm.group(1).strip()
            if content:
                lines.append(_strip_emphasis(content))
        elif lines:
            # 인용 블록이 한 번 시작된 뒤 비-인용 줄이 나오면 종료
            break
    return " ".join(lines).strip()


def extract_bullets(text: str) -> list[str]:
    bullets: list[str] = []
    for line in text.splitlines():
        bm = RE_BULLET.match(line.strip())
        if bm:
            bullets.append(bm.group(1).strip())
    return bullets


def extract_related(text: str) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for bullet in extract_bullets(text):
        link = RE_MD_LINK.search(bullet)
        if link:
            items.append({"title": link.group(1).strip(), "url": link.group(2).strip()})
        else:
            items.append({"title": bullet, "url": ""})
    return items


def parse_card(card: str, category: str, source_rel: str) -> QuizQuestion | None:
    q_match = RE_QUESTION.search(card)
    if not q_match:
        return None
    question = q_match.group(1).strip()

    quiz = extract_quiz_block(card)
    if not quiz:
        return None
    answer, distractors = quiz

    explanation = extract_blockquote(extract_section(card, r"핵심\s*답안.*"))
    followups = extract_bullets(extract_section(card, r"꼬리\s*질문.*"))
    related = extract_related(extract_section(card, r"관련\s*문서"))

    return QuizQuestion(
        id=stable_id(category, question),
        category=category,
        category_label=CATEGORY_LABELS.get(category, category),
        question=question,
        answer=answer,
        distractors=distractors,
        explanation=explanation,
        followups=followups,
        related=related,
        source=source_rel,
    )


def parse_file(path: Path) -> list[QuizQuestion]:
    text = path.read_text(encoding="utf-8")
    category = path.stem
    source_rel = str(path.relative_to(ROOT)).replace("\\", "/")
    cards = CARD_SEPARATOR.split(text)
    out: list[QuizQuestion] = []
    for card in cards:
        if "## Q." not in card:
            continue
        parsed = parse_card(card, category, source_rel)
        if parsed:
            out.append(parsed)
    return out


def main() -> int:
    if not SOURCE_DIR.is_dir():
        print(f"❌ 소스 디렉터리 없음: {SOURCE_DIR}", file=sys.stderr)
        return 1

    files = sorted(SOURCE_DIR.glob("*.md"))
    all_questions: list[QuizQuestion] = []
    per_category_total: dict[str, int] = {}

    for path in files:
        cat = path.stem
        text = path.read_text(encoding="utf-8")
        total_q = len(RE_QUESTION.findall(text))
        parsed = parse_file(path)
        all_questions.extend(parsed)
        per_category_total[cat] = total_q
        print(f"  {cat:25s} 추출 {len(parsed):3d} / 총 {total_q:3d}")

    # 카테고리 메타 (퀴즈에 들어간 카드가 있는 카테고리만 표기)
    counts: dict[str, int] = {}
    for q in all_questions:
        counts[q.category] = counts.get(q.category, 0) + 1
    categories = [
        {
            "id": cat,
            "label": CATEGORY_LABELS.get(cat, cat),
            "count": counts[cat],
        }
        for cat in sorted(counts.keys(), key=lambda c: CATEGORY_LABELS.get(c, c))
    ]

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "categories": categories,
        "questions": [asdict(q) for q in all_questions],
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print()
    print(f"✅ {len(all_questions)} 문항 → {OUTPUT_FILE.relative_to(ROOT)}")
    _print_length_bias_report(all_questions)
    return 0


def _print_length_bias_report(questions: list[QuizQuestion]) -> None:
    """정답이 오답보다 일관되게 길면 '긴 거 누르면 정답' 현상이 발생.
    각 카드의 정답 길이 vs 오답 평균 길이를 비교해 경고 신호를 출력.
    """
    if not questions:
        return
    bias_warn_ratio = 1.2  # 정답/오답평균 비율 임계치
    longest_correct = 0
    biased = []
    for q in questions:
        ans = len(q.answer)
        dists = [len(d) for d in q.distractors] or [0]
        avg_d = sum(dists) / len(dists)
        max_d = max(dists)
        if ans >= max_d:
            longest_correct += 1
        if avg_d and ans / avg_d > bias_warn_ratio:
            biased.append((q.category, q.question, ans, max_d, avg_d, ans / avg_d))

    total = len(questions)
    pct = longest_correct * 100 // total
    print()
    print("── 길이 편향 진단 ──────────────────────────────────")
    print(f"  정답이 가장 긴 카드:           {longest_correct}/{total} ({pct}%)  목표 ≤ 50%")
    print(f"  정답/오답평균 > {bias_warn_ratio:>3} 인 카드:   {len(biased)}/{total}  목표 ≤ {total // 5}")

    if biased:
        biased.sort(key=lambda x: -x[5])
        print()
        print("  Top 5 편향 카드 (정답 길이가 너무 도드라짐):")
        for cat, question, ans, max_d, avg_d, ratio in biased[:5]:
            short = question[:38] + ("…" if len(question) > 38 else "")
            print(f"    {cat:22s} ans={ans:3d}  avgD={avg_d:4.0f}  x{ratio:.2f}  {short}")
    print()


if __name__ == "__main__":
    sys.exit(main())
