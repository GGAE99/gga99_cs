# 웹 / 브라우저 (Web)

본문 폴더: [07-web](../../07-web/)

---

## Q. 브라우저의 렌더링 과정을 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _HTML 파싱 → DOM, CSS 파싱 → CSSOM, Render Tree, Layout, Paint, Composite._

### 꼬리 질문 후보
- script 태그의 async / defer는 파싱에 어떤 영향을 주나?
- CSS는 왜 Render-blocking인가?

---

## Q. reflow와 repaint의 차이를 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _Reflow: 레이아웃 재계산(비싸다). Repaint: 픽셀 다시 그리기(상대적으로 저렴)._

### 꼬리 질문 후보
- transform과 opacity가 GPU 가속을 받는 이유는?
- 무엇이 forced synchronous layout을 유발하나?

---

## Q. CORS(Cross-Origin Resource Sharing)란 무엇이며, 왜 발생하는가?

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _SOP(같은 출처 정책) 때문. 다른 출처 자원 접근 시 서버가 허용 헤더를 응답해야 함._

### 꼬리 질문 후보
- Simple Request와 Preflight Request의 차이는?
- credentials: 'include' 사용 시 주의점은?

---

## Q. localStorage와 sessionStorage의 차이를 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _localStorage: 영구. sessionStorage: 탭 세션 종료 시 삭제. 둘 다 도메인 단위, 5~10MB._

### 꼬리 질문 후보
- 쿠키와 비교했을 때의 장단점은?
- 보안 토큰을 여기에 저장해도 되는가?

---

## Q. CSS 속성 dvh, svh, lvh에 대해 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _Dynamic / Small / Large viewport height. 모바일 브라우저 UI 표시 상태에 따라 변하는 100vh 문제를 해결._

### 꼬리 질문 후보
- 100vh 사용 시 모바일에서 발생하는 문제는?
- dvh가 성능에 영향을 줄 수 있는가?

---

## Q. 브라우저 메모리 캐시와 디스크 캐시의 차이는?

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _메모리: 세션 동안만, 빠름. 디스크: 영구, 상대적으로 느림. 브라우저가 자동 선택._

### 꼬리 질문 후보
- Service Worker 캐시는 어디에 속하나?
- bfcache는 무엇인가?

---

## Q. Cache-Control 헤더에 대해 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _캐시 동작 제어 지시문. max-age, s-maxage, no-cache, no-store, public/private, must-revalidate._

### 꼬리 질문 후보
- no-cache와 no-store의 차이는?
- ETag / Last-Modified는 어떻게 동작하나?

---

## Q. 브라우저가 폰트를 적용하는 과정을 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _@font-face 발견 → 실제 사용 텍스트 만나면 폰트 요청 → 다운로드 → 폰트 적용. font-display로 FOUT/FOIT 제어._

### 꼬리 질문 후보
- FOUT와 FOIT의 차이는?
- font-display: swap / optional / fallback의 차이는?
- preload로 폰트를 미리 받는 효과는?

---

## Q. Core Web Vitals란 무엇인가?

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _LCP(로딩), INP(상호작용, 구 FID), CLS(시각 안정성). Google이 정한 사용자 경험 핵심 지표._

### 꼬리 질문 후보
- 각 지표의 Good 기준값은?
- Lab data와 Field data의 차이는?

---

## Q. 웹 접근성의 개념과 개선 방법을 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _모든 사용자가 동등하게 정보·기능을 이용. 시맨틱 HTML, ARIA, 키보드 탐색, 색 대비, 스크린 리더 호환._

### 꼬리 질문 후보
- WCAG의 4가지 원칙(POUR)은?
- aria-label과 alt의 사용 차이는?

---

## Q. 웹표준이 무엇인가?

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _W3C/WHATWG가 정한 웹 기술 명세. 호환성·접근성·상호운용성 확보._

### 꼬리 질문 후보
- 표준화 과정(WD → CR → REC)은 어떻게 진행되나?
- WHATWG와 W3C의 관계는?

---

## Q. 웹 애플리케이션의 성능을 최적화할 수 있는 방법은?

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _리소스 최소화·압축, 캐싱, CDN, 이미지 포맷·lazy loading, 코드 스플리팅, 렌더링 최적화._

### 꼬리 질문 후보
- LCP를 개선하는 구체적 방법은?
- 폰트 로딩이 성능에 미치는 영향은?
