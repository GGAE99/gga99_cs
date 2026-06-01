# 웹 / 브라우저 (Web)

본문 폴더: [07-web](../../07-web/)

---

## Q. 브라우저의 렌더링 과정을 설명하시오.

??? note "정답 보기 ▼"
    - [x] HTML 파싱 → DOM, CSS 파싱 → CSSOM, Render Tree, Layout, Paint, Composite 순서로 진행
    - [ ] script 태그는 기본적으로 파싱을 막으며, async는 다운로드 즉시 실행, defer는 파싱 완료 후 순서대로 실행하는 옵션
    - [ ] CSS는 Render Tree 구성에 필수라 다운로드 동안 렌더링을 막아 Render-blocking 자원으로 분류된다
    - [ ] 합성(Composite) 단계에서 transform·opacity는 별도 레이어로 처리되어 layout/paint 없이 GPU에서 합성될 수 있다

### 핵심 답안 (30초)
> _HTML 파싱 → DOM, CSS 파싱 → CSSOM, Render Tree, Layout, Paint, Composite._

### 꼬리 질문 후보
- script 태그의 async / defer는 파싱에 어떤 영향을 주나?
- CSS는 왜 Render-blocking인가?

---

## Q. reflow와 repaint의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] Reflow는 레이아웃(위치·크기) 재계산으로 비용이 크고, Repaint는 픽셀만 다시 그리는 상대적으로 저렴한 작업
    - [ ] Composite는 별도 레이어로 분리된 요소를 GPU에서 합성하는 단계로, transform·opacity 같은 속성만 변경하면 layout/paint를 건너뛸 수 있다
    - [ ] offsetTop·getBoundingClientRect를 쓰기 직전 스타일을 변경하면 브라우저가 강제로 즉시 layout을 수행하는 forced synchronous layout이 발생한다
    - [ ] `will-change`나 `transform: translateZ(0)`로 합성 레이어를 미리 만들어 두면 reflow·repaint를 피하고 합성만으로 애니메이션을 처리할 수 있다

### 핵심 답안 (30초)
> _Reflow: 레이아웃 재계산(비싸다). Repaint: 픽셀 다시 그리기(상대적으로 저렴)._

### 꼬리 질문 후보
- transform과 opacity가 GPU 가속을 받는 이유는?
- 무엇이 forced synchronous layout을 유발하나?

---

## Q. CORS(Cross-Origin Resource Sharing)란 무엇이며, 왜 발생하는가?

??? note "정답 보기 ▼"
    - [x] 브라우저의 SOP(같은 출처 정책) 때문 — 다른 출처 자원 접근 시 서버가 Access-Control-Allow-Origin 등 허용 헤더를 응답해야 한다
    - [ ] 본요청 전에 OPTIONS로 메서드·헤더 허용 여부를 미리 확인하는 절차가 Preflight Request이며 비-단순 요청에서 발생한다
    - [ ] `credentials: 'include'`로 쿠키를 함께 보내려면 서버가 Access-Control-Allow-Credentials: true와 명시적 Origin을 응답해야 한다
    - [ ] Content Security Policy(CSP)는 SOP와 별개로 페이지가 로드할 수 있는 출처를 제한하는 응답 헤더 기반 보안 정책이다

### 핵심 답안 (30초)
> _SOP(같은 출처 정책) 때문. 다른 출처 자원 접근 시 서버가 허용 헤더를 응답해야 함._

### 꼬리 질문 후보
- Simple Request와 Preflight Request의 차이는?
- credentials: 'include' 사용 시 주의점은?

---

## Q. localStorage와 sessionStorage의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] localStorage는 영구 보관, sessionStorage는 탭 세션 종료 시 삭제 — 둘 다 동기 API이며 도메인 단위 5~10MB 한도
    - [ ] 쿠키는 매 요청마다 서버로 자동 전송되며 4KB 한도로 작지만 HttpOnly·Secure·SameSite 같은 보안 속성을 가질 수 있다
    - [ ] IndexedDB는 비동기 트랜잭션 기반의 구조화된 데이터 저장소로 대용량(수백 MB 이상)과 객체 저장을 지원한다
    - [ ] Cache Storage는 Service Worker와 함께 사용되어 네트워크 응답을 Request 단위로 보관하는 오프라인 캐시 저장소다

### 핵심 답안 (30초)
> _localStorage: 영구. sessionStorage: 탭 세션 종료 시 삭제. 둘 다 도메인 단위, 5~10MB._

### 꼬리 질문 후보
- 쿠키와 비교했을 때의 장단점은?
- 보안 토큰을 여기에 저장해도 되는가?

---

## Q. CSS 속성 dvh, svh, lvh에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Dynamic / Small / Large viewport height — 모바일 브라우저 UI 표시 상태에 따라 변하는 100vh 문제를 해결하는 단위
    - [ ] svh는 항상 가장 작은 뷰포트(주소창이 보일 때) 기준이고, lvh는 가장 큰 뷰포트(주소창이 가려졌을 때) 기준으로 고정된 값이다
    - [ ] dvh는 현재 뷰포트 상태에 따라 동적으로 바뀌므로 자주 사용하면 스크롤 중 layout 트리거 비용이 발생할 수 있다
    - [ ] dvi/dvb는 인라인·블록 방향에 대응되는 논리적 단위로, 쓰기 방향(writing-mode)에 따라 dvh/dvw 대응값이 달라진다

### 핵심 답안 (30초)
> _Dynamic / Small / Large viewport height. 모바일 브라우저 UI 표시 상태에 따라 변하는 100vh 문제를 해결._

### 꼬리 질문 후보
- 100vh 사용 시 모바일에서 발생하는 문제는?
- dvh가 성능에 영향을 줄 수 있는가?

---

## Q. 브라우저 메모리 캐시와 디스크 캐시의 차이는?

??? note "정답 보기 ▼"
    - [x] 메모리 캐시는 세션 동안만 유지되며 빠르고, 디스크 캐시는 영구 보관되며 상대적으로 느림 — 브라우저가 자동 선택한다
    - [ ] Service Worker가 fetch 이벤트로 응답을 가로채 보관하는 캐시는 메모리·디스크 캐시와 별개의 Cache Storage에 저장된다
    - [ ] bfcache(Back/Forward Cache)는 뒤로/앞으로 이동 시 페이지 상태를 통째로 보존해 즉시 복원하기 위한 페이지 단위 캐시다
    - [ ] HTTP/2 Push는 서버가 요청 없이도 자원을 보내는 기능이지만 브라우저 캐시 계층 자체는 아니어서 점차 사용이 줄고 있다

### 핵심 답안 (30초)
> _메모리: 세션 동안만, 빠름. 디스크: 영구, 상대적으로 느림. 브라우저가 자동 선택._

### 꼬리 질문 후보
- Service Worker 캐시는 어디에 속하나?
- bfcache는 무엇인가?

---

## Q. Cache-Control 헤더에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 캐시 동작을 제어하는 지시문 모음 — max-age, s-maxage, no-cache, no-store, public/private, must-revalidate 등을 포함한다
    - [ ] no-cache는 응답을 캐시는 하되 사용 전 서버 재검증을 요구하는 반면, no-store는 어떤 캐시에도 저장하지 않게 만드는 지시문이다
    - [ ] ETag와 Last-Modified는 조건부 요청(If-None-Match / If-Modified-Since)을 통해 304 Not Modified로 본문 전송을 절약하는 메커니즘이다
    - [ ] stale-while-revalidate는 만료된 응답을 잠시 그대로 쓰면서 백그라운드에서 갱신을 시도해 체감 지연을 줄이는 지시문이다

### 핵심 답안 (30초)
> _캐시 동작 제어 지시문. max-age, s-maxage, no-cache, no-store, public/private, must-revalidate._

### 꼬리 질문 후보
- no-cache와 no-store의 차이는?
- ETag / Last-Modified는 어떻게 동작하나?

---

## Q. 브라우저가 폰트를 적용하는 과정을 설명하시오.

??? note "정답 보기 ▼"
    - [x] @font-face 발견 → 실제 사용 텍스트를 만나면 폰트 요청 → 다운로드 → 적용 (font-display로 FOUT/FOIT 제어)
    - [ ] FOUT는 기본 폰트로 먼저 표시했다가 새 폰트로 교체되는 깜빡임이고, FOIT는 새 폰트가 도착할 때까지 글자를 아예 숨기는 현상이다
    - [ ] font-display: swap은 즉시 폴백 폰트로 표시 후 도착 시 교체, optional은 짧은 시간 안에 안 오면 폴백을 유지하는 정책이다
    - [ ] `<link rel="preload" as="font" crossorigin>`로 폰트를 우선 가져오게 하면 LCP 텍스트의 늦은 폰트 적용을 줄이는 효과가 있다

### 핵심 답안 (30초)
> _@font-face 발견 → 실제 사용 텍스트 만나면 폰트 요청 → 다운로드 → 폰트 적용. font-display로 FOUT/FOIT 제어._

### 꼬리 질문 후보
- FOUT와 FOIT의 차이는?
- font-display: swap / optional / fallback의 차이는?
- preload로 폰트를 미리 받는 효과는?

---

## Q. Core Web Vitals란 무엇인가?

??? note "정답 보기 ▼"
    - [x] LCP(로딩), INP(상호작용, 구 FID), CLS(시각 안정성) — Google이 정의한 사용자 경험 핵심 지표 세 가지
    - [ ] FCP는 첫 콘텐츠가 그려진 시각, TTFB는 첫 바이트 도착 시각으로 Core Web Vitals 보조 지표로 자주 함께 본다
    - [ ] Lab data는 Lighthouse 같은 통제된 환경의 측정값이고, Field data(CrUX)는 실제 사용자 측정 데이터로 둘이 다를 수 있다
    - [ ] LCP Good 기준은 2.5s 이하, INP는 200ms 이하, CLS는 0.1 이하로 75퍼센타일을 기준으로 평가된다

### 핵심 답안 (30초)
> _LCP(로딩), INP(상호작용, 구 FID), CLS(시각 안정성). Google이 정한 사용자 경험 핵심 지표._

### 꼬리 질문 후보
- 각 지표의 Good 기준값은?
- Lab data와 Field data의 차이는?

---

## Q. 웹 접근성의 개념과 개선 방법을 설명하시오.

??? note "정답 보기 ▼"
    - [x] 모든 사용자가 동등하게 정보·기능을 이용 — 시맨틱 HTML, ARIA, 키보드 탐색, 색 대비, 스크린 리더 호환 등을 포괄
    - [ ] WCAG의 4가지 원칙은 Perceivable·Operable·Understandable·Robust(POUR)로 모든 가이드라인의 상위 카테고리다
    - [ ] alt는 이미지의 대체 텍스트를 제공하는 속성이고, aria-label은 시각 요소에 보이지 않는 접근성 이름을 부여하는 속성이다
    - [ ] 키보드 탐색을 위해 적절한 focus 순서와 가시적인 focus ring을 유지하는 것은 운영성(Operable) 원칙의 핵심 요건이다

### 핵심 답안 (30초)
> _모든 사용자가 동등하게 정보·기능을 이용. 시맨틱 HTML, ARIA, 키보드 탐색, 색 대비, 스크린 리더 호환._

### 꼬리 질문 후보
- WCAG의 4가지 원칙(POUR)은?
- aria-label과 alt의 사용 차이는?

---

## Q. 웹표준이 무엇인가?

??? note "정답 보기 ▼"
    - [x] W3C/WHATWG가 정한 웹 기술 명세 — 호환성·접근성·상호운용성을 확보하기 위한 공개 약속
    - [ ] HTML 표준은 WHATWG의 Living Standard로 운영되어 명세가 지속적으로 갱신되는 모델이며 W3C는 이를 참조한다
    - [ ] CSS와 ECMAScript 같은 표준은 WD(Working Draft) → CR(Candidate Recommendation) → REC(Recommendation) 단계를 거치며 정식화된다
    - [ ] 웹 표준 적합성은 WPT(Web Platform Tests) 같은 공동 테스트 스위트와 caniuse.com 같은 호환성 자료로 검증된다

### 핵심 답안 (30초)
> _W3C/WHATWG가 정한 웹 기술 명세. 호환성·접근성·상호운용성 확보._

### 꼬리 질문 후보
- 표준화 과정(WD → CR → REC)은 어떻게 진행되나?
- WHATWG와 W3C의 관계는?

---

## Q. 웹 애플리케이션의 성능을 최적화할 수 있는 방법은?

??? note "정답 보기 ▼"
    - [x] 리소스 최소화·압축, 캐싱, CDN, 이미지 포맷·lazy loading, 코드 스플리팅, 렌더링 최적화 등의 조합으로 다층 대응
    - [ ] LCP를 개선하려면 가장 큰 콘텐츠 이미지를 `<img fetchpriority="high">`나 preload로 우선 로딩하고 폰트·CSS의 블로킹을 줄이는 것이 효과적이다
    - [ ] INP를 개선하려면 무거운 메인 스레드 작업을 잘게 쪼개 yield하고 Long Task를 줄여 입력 처리가 지연되지 않도록 해야 한다
    - [ ] CLS를 개선하려면 이미지·iframe에 width/height·aspect-ratio를 지정하고 동적으로 삽입되는 요소가 콘텐츠를 밀어내지 않게 공간을 미리 확보해야 한다

### 핵심 답안 (30초)
> _리소스 최소화·압축, 캐싱, CDN, 이미지 포맷·lazy loading, 코드 스플리팅, 렌더링 최적화._

### 꼬리 질문 후보
- LCP를 개선하는 구체적 방법은?
- 폰트 로딩이 성능에 미치는 영향은?
