# Layer 4-2. Frontend

> 프레임워크는 도구. 진짜 실력은 **이 도구가 풀려는 문제를 아는 것**.

## 학습 목표

- React/Next.js의 동작 원리를 라이브러리 사용 수준이 아니라 내부까지
- 상태 관리의 **본질적 문제**와 라이브러리별 해결책 비교
- CSS 아키텍처와 빌드 도구의 트레이드오프

## 학습 순서

```
react (UI 라이브러리의 원리)
    ↓
state-management (앱 규모가 커질 때)
    ↓
nextjs (React 위의 프레임워크)
    ↓
css (스타일 아키텍처)
    ↓
build-tools (개발 환경 이해)
```

## 섹션 안내

### [react/](./react/)
**핵심 토픽**: Virtual DOM, Reconciliation(Fiber), 함수형 컴포넌트 + Hook, useState/useEffect/useMemo/useCallback의 실제 동작, 렌더링 최적화, React 18의 Concurrent / Suspense, Server Components
**Why**: 점유율과 생태계가 가장 큰 라이브러리. 원리를 알면 Vue/Solid로 옮겨도 빠르게 적응.

### [nextjs/](./nextjs/)
**핵심 토픽**: App Router vs Pages Router, RSC, Server Actions, 라우팅·레이아웃, ISR, 미들웨어, 캐싱 4계층, 메타데이터
**Why**: React 기반 풀스택의 사실상 표준.

### [state-management/](./state-management/)
**핵심 토픽**: 클라이언트 상태 vs 서버 상태 분리, Redux/Toolkit, Zustand, Jotai/Recoil, React Query/SWR, 상태 끌어올리기 vs Context vs 전역 스토어
**Why**: "왜 Redux는 줄어들고 React Query가 떴는가" — 문제 분리의 역사.

### [css/](./css/)
**핵심 토픽**: 박스 모델, Flexbox, Grid, 단위(rem/em/vh/dvh/svh/lvh), 명시도, BEM/OOCSS, CSS-in-JS vs Utility(Tailwind) vs CSS Modules, 다크모드, 반응형 전략
**Why**: 모르고 쓰면 평생 헤맴.

### [build-tools/](./build-tools/)
**핵심 토픽**: 번들러(Webpack/Vite/Rollup/Turbopack/esbuild), 트랜스파일러(Babel/SWC/TSC), 로더 vs 플러그인, 트리 셰이킹, 코드 스플리팅, HMR, ESLint/Prettier
**Why**: 개발 환경이 느려지면 생산성이 곧장 죽는다.

## 정리 템플릿

각 라이브러리/도구는 다음 흐름으로:

1. **이전엔 어떻게 했나** (jQuery 시대 vs 지금)
2. **이 도구가 제공하는 추상**
3. **추상이 깨지는 지점** — 어디까지 알아야 하는가
4. **내가 직접 겪은 함정**

## 추천 자료

- [React 공식 문서 (신규)](https://react.dev/) — 정말 잘 쓰여 있음
- [Next.js Docs](https://nextjs.org/docs)
- 『리액트를 다루는 기술』, 『러닝 리액트』
- [Patterns.dev](https://www.patterns.dev/) — 프론트 디자인 패턴
- [Josh Comeau의 블로그](https://www.joshwcomeau.com/) — CSS/React 깊이
