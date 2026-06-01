# 프론트엔드 (Frontend)

본문 폴더: [08-frontend](../../08-frontend/)

---

## Q. Virtual DOM이란 무엇이며, React에서 어떻게 동작하나?

??? note "정답 보기 ▼"
    - [x] 실제 DOM을 추상화한 JS 객체. diff로 변경점을 계산해 실제 DOM에 일괄(batch) 반영
    - [ ] 컴포넌트 캡슐화를 위해 스타일·DOM을 외부와 격리시키는 브라우저 표준인 Shadow DOM
    - [ ] Svelte처럼 빌드 타임에 변경 지점을 정적으로 컴파일해 DOM을 직접 갱신하는 No-VDOM 접근
    - [ ] React 18의 동시성 렌더링과 우선순위 기반 작업 분할을 가능하게 하는 내부 재구현인 Fiber 아키텍처

### 핵심 답안 (30초)
> _실제 DOM을 추상화한 자바스크립트 객체. Diff로 변경점 계산 후 batch update._

### 꼬리 질문 후보
- Virtual DOM이 항상 빠른가? (Svelte/Solid의 반론)
- key prop이 중요한 이유는?
- React Fiber는 무엇을 해결했나?

---

## Q. CSR과 SSR의 차이점은 무엇인가?

??? note "정답 보기 ▼"
    - [x] CSR은 빈 HTML + JS 다운로드 후 클라이언트가 렌더, SSR은 서버에서 완성된 HTML 전송 — 초기 로딩·SEO·서버 부하의 트레이드오프
    - [ ] SSG는 빌드 타임에 HTML을 미리 생성해 정적으로 서빙하며, ISR은 그 HTML을 일정 시점에 백그라운드로 재생성하는 방식
    - [ ] Hydration은 SSR로 받은 정적 HTML 위에 클라이언트 JS가 이벤트 핸들러를 다시 붙여 인터랙티브하게 만드는 단계
    - [ ] RSC(React Server Components)는 서버에서만 실행되는 컴포넌트를 직렬화해 보내고, 클라이언트는 JS 번들을 줄일 수 있는 모델

### 핵심 답안 (30초)
> _CSR: 빈 HTML + JS 다운로드 후 렌더. SSR: 서버에서 완성된 HTML 전송. 초기 로딩·SEO·서버 부하의 트레이드오프._

### 꼬리 질문 후보
- Hydration이란?
- SSG / ISR / RSC는 어떻게 다른가?

---

## Q. Next.js에서 제공하는 렌더링 기법의 특징을 설명하시오.

??? note "정답 보기 ▼"
    - [x] SSG / SSR / ISR / CSR / RSC / Streaming — 각각 빌드·요청 시점·캐시 전략이 다름
    - [ ] SSR은 매 요청마다 서버에서 HTML을 생성하고, SSG는 빌드 타임에 미리 생성해 캐시·CDN으로 빠르게 서빙한다
    - [ ] ISR은 SSG로 만든 페이지를 `revalidate` 시간이 지나면 백그라운드 재생성으로 stale-while-revalidate 패턴을 구현한다
    - [ ] App Router의 기본은 서버 컴포넌트(RSC)이며 `"use client"` 지시어를 붙인 컴포넌트만 클라이언트로 번들된다

### 핵심 답안 (30초)
> _SSG / SSR / ISR / CSR / RSC / Streaming. 각각 빌드·요청 시점·캐시 전략이 다름._

### 꼬리 질문 후보
- App Router에서 RSC가 기본인 이유는?
- "use client"와 "use server"의 차이는?
- ISR의 revalidate는 어떻게 동작하나?

---

## Q. React에서 컴포넌트 설계 시 중요하게 고려할 점은?

??? note "정답 보기 ▼"
    - [x] 단일 책임, 합성 우선, props 최소화, 상태 끌어올리기, 명확한 prop 인터페이스, 접근성, 재사용성
    - [ ] 데이터 흐름과 표시 책임을 분리해 표시는 부모에 두고 로직만 자식에 두는 Container/Presentational 패턴 우선 적용
    - [ ] children, slot, render props로 구성 요소를 조합 가능하게 만드는 Compound Component 패턴 우선 적용
    - [ ] Context로 깊은 prop drilling을 제거하고 공통 상태는 가장 가까운 공통 조상에 두는 상태 끌어올리기 전략

### 핵심 답안 (30초)
> _단일 책임, 합성 우선, props 최소화, 상태 끌어올리기, 명확한 prop 인터페이스, 접근성, 재사용성._

### 꼬리 질문 후보
- Container/Presentational 패턴은 여전히 유효한가?
- Compound Component 패턴이란?
- 상태를 어디에 두는지 결정하는 기준은?

---

## Q. 낙관적 업데이트(Optimistic Update)에 관하여 설명하시오.

??? note "정답 보기 ▼"
    - [x] 서버 응답을 기다리지 않고 UI를 먼저 갱신, 실패 시 롤백 — 사용자 경험을 향상시키는 전략
    - [ ] React Query의 `onMutate`/`onError` 핸들러로 캐시를 임시 갱신했다가 실패 시 이전 스냅샷으로 되돌리는 구현 방식
    - [ ] 결제·재고 차감처럼 동일성 보장이 강하게 요구되는 작업에서는 서버 확정 후 UI를 갱신하는 비관적 업데이트가 더 적합
    - [ ] 동일 요청을 사용자가 빠르게 반복할 때 입력을 묶어 한 번에 보내는 debounce/throttle은 낙관적 업데이트와 별개의 UX 최적화

### 핵심 답안 (30초)
> _서버 응답을 기다리지 않고 UI를 먼저 갱신. 실패 시 롤백. 사용자 경험 향상._

### 꼬리 질문 후보
- React Query / SWR에서는 어떻게 구현하나?
- 어떤 상황에서 낙관적 업데이트를 피해야 하나?

---

## Q. Webpack, Rollup 같은 번들러는 왜 필요한가?

??? note "정답 보기 ▼"
    - [x] 모듈 의존성 해결, 단일/소수 파일로 결합, 코드 변환·압축·트리 셰이킹·코드 스플리팅을 자동화하기 위해
    - [ ] 브라우저가 직접 처리할 수 없는 JSX·TS·SCSS 같은 입력을 변환해 표준 JS/CSS로 만들기 위해서도 함께 사용된다
    - [ ] 운영 환경에서 청크 단위 점진적 로딩과 lazy import를 가능하게 해 초기 번들 크기를 최소화하기 위해서도 사용된다
    - [ ] 개발 환경의 HMR(Hot Module Replacement)로 변경된 모듈만 새로 가져와 빠른 피드백 루프를 제공하기 위해서도 사용된다

### 핵심 답안 (30초)
> _모듈 의존성 해결, 단일/소수 파일로 결합, 코드 변환·압축·트리 셰이킹·코드 스플리팅._

### 꼬리 질문 후보
- Webpack과 Rollup의 차이는?
- ESM 네이티브 시대에 번들러는 여전히 필요한가?

---

## Q. Webpack에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Entry → Module → Loader → Plugin → Output 파이프라인으로 의존성 그래프 기반 번들을 생성
    - [ ] Loader는 파일 변환(TS, CSS 등)을, Plugin은 번들 전반의 라이프사이클 훅을 다루며 역할이 서로 다른 확장 지점
    - [ ] 트리 셰이킹은 ESM의 정적 import/export 분석을 활용해 사용되지 않는 export를 결과 번들에서 제거하는 최적화
    - [ ] HMR은 변경된 모듈과 그 의존을 런타임에 교체해 페이지 전체 새로 고침 없이 빠른 피드백을 제공하는 기능

### 핵심 답안 (30초)
> _Entry → Module → Loader → Plugin → Output. 의존성 그래프 기반 번들러._

### 꼬리 질문 후보
- Loader와 Plugin의 차이는?
- 트리 셰이킹이 동작하는 조건은?
- HMR(Hot Module Replacement)은 어떻게 동작하나?

---

## Q. Babel에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] JS 트랜스파일러 — 신문법을 구버전 호환 코드로 변환, AST 변환 기반
    - [ ] preset은 plugin들을 미리 묶은 패키지이며, plugin이 실제 변환 단위를 담당하는 Babel 확장 구조
    - [ ] core-js는 런타임에서 누락된 표준 API를 보충하는 polyfill 라이브러리로 Babel과 함께 자주 사용된다
    - [ ] SWC는 Rust로 작성된 Babel 대안 트랜스파일러로 동일 변환을 더 빠르게 수행하지만 플러그인 생태계가 좁다

### 핵심 답안 (30초)
> _JS 트랜스파일러. 신문법 → 구버전 호환 코드. AST 변환 기반._

### 꼬리 질문 후보
- preset과 plugin의 차이는?
- SWC와 비교했을 때의 차이는?
- babel-polyfill과 core-js의 관계는?

---

## Q. ESLint에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] JS/TS 정적 분석 도구 — 코드 스타일, 잠재적 버그, 관례 위반 등을 검출
    - [ ] 코드 포맷팅 전용 도구로 의미 변경 없이 들여쓰기만 정리한다
    - [ ] JS 신문법을 구버전으로 변환하는 트랜스파일러
    - [ ] 의존성 그래프를 분석해 단일 번들을 생성하는 빌드 도구

### 핵심 답안 (30초)
> _JS/TS 정적 분석 도구. 코드 스타일·잠재적 버그·관례 위반 검출._

### 꼬리 질문 후보
- ESLint와 Prettier는 어떻게 역할이 다른가?
- flat config로 바뀐 이유는?

---

## Q. Prettier에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Opinionated 코드 포매터 — 스타일 논쟁을 제거하고 일관된 포맷을 자동 적용
    - [ ] AST를 다시 출력하는 방식으로 동작해 들여쓰기·줄바꿈·따옴표 같은 표시만 재구성하고 의미는 보존한다
    - [ ] ESLint의 stylistic rule과 충돌을 막기 위해 `eslint-config-prettier`로 스타일 규칙을 끄고 Prettier에 위임하는 관행
    - [ ] Git pre-commit 훅(`lint-staged` 등)에 묶어 변경된 파일만 자동 포맷하도록 워크플로에 통합하는 사용 패턴

### 핵심 답안 (30초)
> _Opinionated 코드 포매터. 스타일 논쟁 제거, 일관된 포맷 자동 적용._

### 꼬리 질문 후보
- ESLint의 stylistic rule과 어떻게 분리해야 하나?
- "Opinionated"의 의미는?
