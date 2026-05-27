# 프론트엔드 (Frontend)

본문 폴더: [08-frontend](../../08-frontend/)

---

## Q. Virtual DOM이란 무엇이며, React에서 어떻게 동작하나?

### 핵심 답안 (30초)
> _실제 DOM을 추상화한 자바스크립트 객체. Diff로 변경점 계산 후 batch update._

### 꼬리 질문 후보
- Virtual DOM이 항상 빠른가? (Svelte/Solid의 반론)
- key prop이 중요한 이유는?
- React Fiber는 무엇을 해결했나?

---

## Q. CSR과 SSR의 차이점은 무엇인가?

### 핵심 답안 (30초)
> _CSR: 빈 HTML + JS 다운로드 후 렌더. SSR: 서버에서 완성된 HTML 전송. 초기 로딩·SEO·서버 부하의 트레이드오프._

### 꼬리 질문 후보
- Hydration이란?
- SSG / ISR / RSC는 어떻게 다른가?

---

## Q. Next.js에서 제공하는 렌더링 기법의 특징을 설명하시오.

### 핵심 답안 (30초)
> _SSG / SSR / ISR / CSR / RSC / Streaming. 각각 빌드·요청 시점·캐시 전략이 다름._

### 꼬리 질문 후보
- App Router에서 RSC가 기본인 이유는?
- "use client"와 "use server"의 차이는?
- ISR의 revalidate는 어떻게 동작하나?

---

## Q. React에서 컴포넌트 설계 시 중요하게 고려할 점은?

### 핵심 답안 (30초)
> _단일 책임, 합성 우선, props 최소화, 상태 끌어올리기, 명확한 prop 인터페이스, 접근성, 재사용성._

### 꼬리 질문 후보
- Container/Presentational 패턴은 여전히 유효한가?
- Compound Component 패턴이란?
- 상태를 어디에 두는지 결정하는 기준은?

---

## Q. 낙관적 업데이트(Optimistic Update)에 관하여 설명하시오.

### 핵심 답안 (30초)
> _서버 응답을 기다리지 않고 UI를 먼저 갱신. 실패 시 롤백. 사용자 경험 향상._

### 꼬리 질문 후보
- React Query / SWR에서는 어떻게 구현하나?
- 어떤 상황에서 낙관적 업데이트를 피해야 하나?

---

## Q. Webpack, Rollup 같은 번들러는 왜 필요한가?

### 핵심 답안 (30초)
> _모듈 의존성 해결, 단일/소수 파일로 결합, 코드 변환·압축·트리 셰이킹·코드 스플리팅._

### 꼬리 질문 후보
- Webpack과 Rollup의 차이는?
- ESM 네이티브 시대에 번들러는 여전히 필요한가?

---

## Q. Webpack에 대해 설명하시오.

### 핵심 답안 (30초)
> _Entry → Module → Loader → Plugin → Output. 의존성 그래프 기반 번들러._

### 꼬리 질문 후보
- Loader와 Plugin의 차이는?
- 트리 셰이킹이 동작하는 조건은?
- HMR(Hot Module Replacement)은 어떻게 동작하나?

---

## Q. Babel에 대해 설명하시오.

### 핵심 답안 (30초)
> _JS 트랜스파일러. 신문법 → 구버전 호환 코드. AST 변환 기반._

### 꼬리 질문 후보
- preset과 plugin의 차이는?
- SWC와 비교했을 때의 차이는?
- babel-polyfill과 core-js의 관계는?

---

## Q. ESLint에 대해 설명하시오.

### 핵심 답안 (30초)
> _JS/TS 정적 분석 도구. 코드 스타일·잠재적 버그·관례 위반 검출._

### 꼬리 질문 후보
- ESLint와 Prettier는 어떻게 역할이 다른가?
- flat config로 바뀐 이유는?

---

## Q. Prettier에 대해 설명하시오.

### 핵심 답안 (30초)
> _Opinionated 코드 포매터. 스타일 논쟁 제거, 일관된 포맷 자동 적용._

### 꼬리 질문 후보
- ESLint의 stylistic rule과 어떻게 분리해야 하나?
- "Opinionated"의 의미는?
