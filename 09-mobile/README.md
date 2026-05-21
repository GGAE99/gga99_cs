# Layer 4-3. Mobile

> 웹과 비슷해 보이지만 **자원·생명주기·배포가 완전히 다른** 세계.

## 학습 목표

- 네이티브 앱의 **생명주기**와 메모리 관리 모델
- 크로스 플랫폼(RN/Flutter)의 동작 원리와 한계
- 웹뷰가 어디까지 가능한지 / 언제 네이티브가 필요한지

## 학습 순서

```
운영체제 기본기 (OS 섹션 선행 권장)
    ↓
ios  ←|→ android  (둘 중 하나 깊이)
    ↓
react-native / webview (크로스 플랫폼 시야)
```

## 섹션 안내

### [ios/](./ios/)
**핵심 토픽**: 앱 생명주기, ARC(자동 참조 카운팅), Swift 기초, SwiftUI vs UIKit, Concurrency(async/await, Actor), 앱 배포(앱스토어, 코드 사이닝)
**Why**: 메모리 관리 모델이 GC가 아닌 환경. 시야가 넓어짐.

### [android/](./android/)
**핵심 토픽**: Activity/Fragment 생명주기, Intent, Context, Jetpack(Compose, ViewModel, Room, Navigation), Coroutine + Flow, ProGuard/R8
**Why**: 모바일 점유율 1위. Compose는 선언형 UI의 좋은 예.

### [react-native.md](./react-native.md)
**핵심 토픽**: Bridge vs New Architecture(JSI/Fabric/TurboModules), 성능 함정, 네이티브 모듈 작성, 코드 푸시
**Why**: 한 코드베이스로 양 플랫폼 — 다만 "공짜는 없다"는 사례.

### [webview.md](./webview.md)
**핵심 토픽**: 네이티브 ↔ 웹 통신(JS Bridge), 보안 이슈, 성능 제약, 앱 내 브라우저(SFSafariViewController, Chrome Custom Tabs)
**Why**: 하이브리드 앱의 핵심. 사내 앱·이벤트 페이지에 압도적으로 많이 쓰임.

## 정리 템플릿

웹과 다른 점을 명시:

1. **생명주기** — 백그라운드 진입 시 무슨 일이 벌어지는가
2. **자원 제약** — 메모리/배터리/네트워크
3. **배포 사이클** — 스토어 심사·롤백 어려움
4. **플랫폼 가이드라인** — HIG (Apple), Material (Google)

## 추천 자료

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Android Developer Guides](https://developer.android.com/guide)
- 『앱은 OS가 절반』 (모바일 OS 관점)
- [React Native Docs](https://reactnative.dev/)
- [Compose Pathway](https://developer.android.com/courses/pathways/compose)
