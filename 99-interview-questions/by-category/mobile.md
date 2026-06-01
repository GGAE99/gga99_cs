# 모바일 (Mobile)

본문 폴더: [09-mobile](../../09-mobile/)

---

## Q. 웹뷰란 무엇인가?

??? note "정답 보기 ▼"
    - [x] 네이티브 앱 내부에 임베드된 브라우저 컴포넌트 (WKWebView, Android WebView)
    - [ ] 앱에서 외부 시스템 브라우저 창을 띄우는 SFSafariViewController / Chrome Custom Tabs API
    - [ ] 웹 코드를 네이티브 셸로 감싸 앱 스토어에 배포하는 Cordova / Capacitor 하이브리드 빌드
    - [ ] 브라우저에 설치 가능한 형태로 등록되어 오프라인·푸시를 지원하는 PWA 표준

### 핵심 답안 (30초)
> _네이티브 앱 내부에 임베드된 브라우저 컴포넌트. iOS WKWebView, Android WebView. 하이브리드 앱의 핵심._

### 꼬리 질문 후보
- 네이티브 ↔ 웹 통신은 어떻게 하나? (JS Bridge)
- SFSafariViewController / Chrome Custom Tabs와 WebView의 차이는?
- 웹뷰 보안 이슈는 어떤 것이 있나?
