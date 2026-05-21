# 면접 질문 모음

> **답을 외우는 곳이 아니라**, 본인 언어로 정리하는 곳.

## 사용 방법

1. **질문 먼저, 답을 보지 말 것** — 본인 답안을 적어보기
2. **모범 답안과 비교** — 무엇이 빠졌는지 확인
3. **꼬리 질문 시뮬레이션** — "왜?"를 3번 더 던지기
4. **본인 사례로 재서술** — 실제 경험과 연결

## 구조

### [by-category/](./by-category/) — 카테고리별
```
data-structure.md     알고리즘.md           operating-system.md
network.md            database.md           computer-architecture.md
software-engineering.md  language-{js,ts,java,kotlin,python}.md
backend.md            system-design.md      devops.md
security.md           web.md                frontend.md   mobile.md
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

**난이도**:  신입 /  주니어 /  시니어
**카테고리**: language-js
**관련 문서**: [클로저 상세](../../02-language/javascript/closure.md)

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
```

## 학습 진도 관리 팁

각 질문 앞에 다음 라벨 중 하나를 붙여 진도를 표시:

- 처음 보는 질문 → `[NEW]`
- 답은 하지만 정리가 필요 → `[REVIEW]`
- 자신 있게 설명 가능 → `[OK]`
- 꼬리 질문까지 대응 가능 → `[MASTER]`

예시:

- `[NEW]` Q. 이벤트 루프란?
- `[REVIEW]` Q. 클로저란?
- `[OK]` Q. REST와 GraphQL 차이는?
- `[MASTER]` Q. CAP 정리를 실 사례와 함께 설명.

`README` 상단에 라벨별 개수를 적어두면 진도가 한눈에 보이고,
`grep -c "\[NEW\]" *.md` 같은 명령으로 자동 집계도 가능.

## 참고할 만한 외부 저장소

- [JaeYeopHan/Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner)
- [yjs03057/Awesome-CS-Interview](https://github.com/yjs03057/Awesome-CS-Interview)
- [Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)
- [Tech Interview Handbook](https://www.techinterviewhandbook.org/)
