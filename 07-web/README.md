# Layer 4-1. Web & Browser

> 프레임워크는 바뀌어도 **브라우저와 HTTP는 남는다.**

## 학습 목표

- 브라우저가 URL 입력부터 렌더링까지 어떻게 동작하는지 설명 가능
- HTTP의 메커니즘(캐시·CORS·쿠키)을 깊게 이해
- CSR/SSR/SSG 등 렌더링 전략 비교 능력
- 성능 최적화의 **측정 가능한** 기준 보유 (Core Web Vitals)

## 학습 순서

```
http-deep-dive (모든 것의 기반)
    ↓
browser-rendering (브라우저 내부)
    ↓
cors → cookie-storage (자주 마주치는 함정)
    ↓
csr-ssr-ssg (렌더링 전략)
    ↓
core-web-vitals → performance (측정과 최적화)
    ↓
web-standards (접근성·표준)
```

## 섹션 안내

### [http-deep-dive.md](./http-deep-dive.md)
**핵심 토픽**: HTTP/1.1 vs HTTP/2 vs HTTP/3(QUIC), 메서드/상태 코드 정확한 의미, 헤더(캐시·인증·콘텐츠 협상), 멱등성/안전성, Connection 재사용
**Why**: 거의 모든 웹 문제의 디버깅은 HTTP 레벨에서 끝남.

### [browser-rendering.md](./browser-rendering.md)
**핵심 토픽**: Critical Rendering Path, HTML 파싱 → DOM, CSSOM, Render Tree, Layout, Paint, Composite, Reflow vs Repaint, GPU 가속
**Why**: "왜 이 애니메이션이 끊기는가?"의 답.

### [cors.md](./cors.md)
**핵심 토픽**: SOP(Same-Origin Policy), Simple vs Preflight, 자격증명 포함 요청, 일반적인 오해와 함정
**Why**: 프론트와 백을 막론하고 가장 자주 막히는 지점.

### [cookie-storage.md](./cookie-storage.md)
**핵심 토픽**: Cookie 속성(HttpOnly, Secure, SameSite), LocalStorage, SessionStorage, IndexedDB, 토큰 저장 위치 결정 기준
**Why**: 보안과 직결. 잘못된 선택이 XSS/CSRF로 이어짐.

### [csr-ssr-ssg.md](./csr-ssr-ssg.md)
**핵심 토픽**: CSR / SSR / SSG / ISR / Streaming SSR / RSC, 각 전략의 trade-off, Hydration, Selective Hydration
**Why**: Next.js·Nuxt·Remix가 푸는 문제 그 자체.

### [web-standards.md](./web-standards.md)
**핵심 토픽**: 시맨틱 HTML, WAI-ARIA, 키보드 내비게이션, 색대비, 스크린 리더, WCAG
**Why**: 접근성은 "있으면 좋은 것"이 아니라 **표준**.

### [core-web-vitals.md](./core-web-vitals.md)
**핵심 토픽**: LCP, INP(구 FID), CLS, TTFB, FCP, 측정 방법(Lab vs Field), 개선 패턴
**Why**: 구글이 검색 랭킹에 반영하는 지표. 측정의 기준.

### [performance.md](./performance.md)
**핵심 토픽**: HTTP 캐시(강한/약한), CDN, 이미지 최적화(AVIF/WebP, lazy loading), 번들 최적화(코드 스플리팅, 트리 셰이킹), Preload/Prefetch
**Why**: 사용자 이탈률은 1초 지연마다 급증.

## 추천 자료

- [MDN Web Docs](https://developer.mozilla.org/) — 절대적 기준
- [web.dev](https://web.dev/) — Google의 베스트 프랙티스
- 『HTTP 완벽 가이드』
- 『웹 성능 최적화 기법』 (Steve Souders)
- [What forces layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
