# 면접 질문 모음

> **답을 외우는 곳이 아니라**, 본인 언어로 정리하는 곳.

## 사용 방법

1. **질문 먼저, 답을 보지 말 것** — 본인 답안을 적어보기
2. **모범 답안과 비교** — 무엇이 빠졌는지 확인
3. **꼬리 질문 시뮬레이션** — "왜?"를 3번 더 던지기
4. **본인 사례로 재서술** — 실제 경험과 연결

## 구조

### [by-category/](./by-category/) — 카테고리별

각 파일은 영역별 Q&A 카드 모음. 본문이 풍부해진 항목은
`../<영역 폴더>/<주제>.md` 로 옮기고 카드는 링크만 남긴다.

| 카드 파일 | 영역 | 본문 폴더 |
|----------|------|----------|
| [data-structure.md](./by-category/data-structure.md) | 자료구조 | [01-computer-science/data-structure](../01-computer-science/data-structure/) |
| [operating-system.md](./by-category/operating-system.md) | 운영체제 | [01-computer-science/operating-system](<../01-computer-science/operating-system(OS)/>) |
| [network.md](./by-category/network.md) | 네트워크 | [01-computer-science/network](../01-computer-science/network/) |
| [database.md](./by-category/database.md) | 데이터베이스 | [01-computer-science/database](../01-computer-science/database/) |
| [computer-architecture.md](./by-category/computer-architecture.md) | 컴퓨터 구조 | [01-computer-science/computer-architecture](../01-computer-science/computer-architecture/) |
| [software-engineering.md](./by-category/software-engineering.md) | SW 공학 | [01-computer-science/software-engineering](../01-computer-science/software-engineering/) |
| [language-js.md](./by-category/language-js.md) | JavaScript | [02-language/javascript](../02-language/javascript/) |
| [language-ts.md](./by-category/language-ts.md) | TypeScript | [02-language/typescript](../02-language/typescript/) |
| [backend.md](./by-category/backend.md) | 백엔드 | [03-backend](../03-backend/) |
| [devops.md](./by-category/devops.md) | DevOps / 인프라 | [05-devops-infra](../05-devops-infra/) |
| [web.md](./by-category/web.md) | 웹 / 브라우저 | [07-web](../07-web/) |
| [frontend.md](./by-category/frontend.md) | 프론트엔드 | [08-frontend](../08-frontend/) |
| [mobile.md](./by-category/mobile.md) | 모바일 | [09-mobile](../09-mobile/) |
| [ai-data.md](./by-category/ai-data.md) | AI / 데이터 | [10-ai-data](../10-ai-data/) |

**카테고리별 질문 수 확인**
```bash
cd by-category
for f in *.md; do
  printf '%-30s %s\n' "$f" "$(grep -c '^## Q\.' "$f")"
done
```

### [by-difficulty/](./by-difficulty/) — 난이도별
- `entry-level.md` — 신입 / 인턴 (기본기 위주)
- `junior.md` — 1~3년 차 (실무 경험 + 기본기 깊이)
- `senior.md` — 시니어 (시스템 설계 + 트레이드오프 + 리더십)

### [mock-interviews/](./mock-interviews/) — 실전 모의 인터뷰
회사·포지션별 전체 흐름 시뮬레이션. (예: `kakao-backend-2026.md`)

## 질문 카드 템플릿

각 질문은 다음 형식으로 정리:

```markdown
## Q. 클로저(Closure)란 무엇인가?

### 핵심 답안 (30초)
> 함수가 선언된 렉시컬 환경(스코프)을 기억하여,
> 외부 함수의 실행이 끝난 뒤에도 그 변수에 접근할 수 있는 함수.

### 상세 설명
[원리, 메모리 모델, 예제 코드]

### 꼬리 질문
- 클로저는 메모리 누수를 일으킬 수 있는가?
- 이벤트 리스너에서 클로저가 자주 등장하는 이유?
- 모듈 패턴은 클로저의 어떤 성질을 이용하나?

### 본인 사례
[실제 프로젝트에서 클로저 때문에 고생했거나 활용한 경험]

### 관련 문서
- [클로저 상세](../../02-language/javascript/closure.md)
```

## 참고할 만한 외부 저장소

- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner)
- [yjs03057/Awesome-CS-Interview](https://github.com/yjs03057/Awesome-CS-Interview)
- [Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
