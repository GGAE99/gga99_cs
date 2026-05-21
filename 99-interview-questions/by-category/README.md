# 카테고리별 면접 질문

각 파일은 카테고리별 Q&A 카드 모음. 진도 라벨로 상태 관리.

## 진도 라벨

- `[NEW]` — 아직 답을 정리하지 못함
- `[REVIEW]` — 답은 하지만 정리가 필요
- `[OK]` — 자신 있게 설명 가능
- `[MASTER]` — 꼬리 질문까지 대응 가능

## 파일 목록

| 파일 | 영역 | 본문 폴더 |
|------|------|----------|
| [data-structure.md](./data-structure.md) | 자료구조 | [01-computer-science/data-structure](../../01-computer-science/data-structure/) |
| [operating-system.md](./operating-system.md) | 운영체제 | [01-computer-science/operating-system](../../01-computer-science/operating-system/) |
| [network.md](./network.md) | 네트워크 | [01-computer-science/network](../../01-computer-science/network/) |
| [database.md](./database.md) | 데이터베이스 | [01-computer-science/database](../../01-computer-science/database/) |
| [computer-architecture.md](./computer-architecture.md) | 컴퓨터 구조 | [01-computer-science/computer-architecture](../../01-computer-science/computer-architecture/) |
| [software-engineering.md](./software-engineering.md) | SW 공학 | [01-computer-science/software-engineering](../../01-computer-science/software-engineering/) |
| [language-js.md](./language-js.md) | JavaScript | [02-language/javascript](../../02-language/javascript/) |
| [language-ts.md](./language-ts.md) | TypeScript | [02-language/typescript](../../02-language/typescript/) |
| [backend.md](./backend.md) | 백엔드 | [03-backend](../../03-backend/) |
| [devops.md](./devops.md) | DevOps / 인프라 | [05-devops-infra](../../05-devops-infra/) |
| [web.md](./web.md) | 웹 / 브라우저 | [07-web](../../07-web/) |
| [frontend.md](./frontend.md) | 프론트엔드 | [08-frontend](../../08-frontend/) |
| [mobile.md](./mobile.md) | 모바일 | [09-mobile](../../09-mobile/) |
| [ai-data.md](./ai-data.md) | AI / 데이터 | [10-ai-data](../../10-ai-data/) |

## 진도 집계

```bash
# NEW 라벨 개수 세기
grep -c '`\[NEW\]`' *.md

# 전체 라벨별 합계
for label in NEW REVIEW OK MASTER; do
  echo -n "[$label]: "
  grep -rh "\`\[$label\]\`" . | wc -l
done
```
