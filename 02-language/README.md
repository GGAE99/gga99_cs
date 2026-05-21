# Layer 2. Language & Paradigm

> "언어를 안다"는 건 문법이 아니라 **런타임의 동작 원리를 안다**는 것.

## 학습 목표

- 사용 중인 언어의 **메모리 모델, 동시성 모델, 실행 모델**을 설명할 수 있다
- 언어별 **이디엄(idiom)** 과 함정을 안다
- 패러다임(객체지향/함수형/병행형) 간 전환이 가능하다

## 학습 전략

**주력 언어 1개 → 깊게**, 그 다음 **다른 패러다임 1개 → 시야 확장**.

```
주력 언어 (예: JS/TS)
    ↓
JVM 계열 (Java/Kotlin) — 정적 타입 & GC & 멀티스레딩 학습
    ↓
함수형/시스템 언어 1개 (Rust, Haskell, Go) — 패러다임 확장
```

## 섹션 안내

### [javascript/](./javascript/)
**핵심 토픽**: 실행 컨텍스트, 호이스팅, 클로저, this 바인딩, 이벤트 루프, 마이크로/매크로 태스크, Promise, async/await, 제너레이터, 프로토타입 체인
**Why**: 브라우저·Node·모바일 어디든 등장. 단일 스레드 비동기 모델의 정수.

### [typescript/](./typescript/)
**핵심 토픽**: 구조적 타이핑, 제네릭, 유틸리티 타입, Type vs Interface, 조건부 타입, 모듈 시스템, tsconfig
**Why**: 타입 시스템으로 사고하는 법 + 대규모 코드베이스 협업의 기본기.

### [java/](./java/)
**핵심 토픽**: JVM 구조, 클래스 로딩, GC 종류와 동작, 컬렉션 프레임워크, 멀티스레딩, Stream API, 람다
**Why**: 백엔드 표준의 한 축. JVM 이해는 Kotlin/Scala로 자연스럽게 확장.

### [kotlin/](./kotlin/)
**핵심 토픽**: null 안정성, 데이터 클래스, 확장 함수, 코루틴(suspend/Flow), Scope Functions
**Why**: Android & Server 양쪽 모두에서 사용. 코루틴은 비동기 학습의 좋은 모델.

### [python/](./python/)
**핵심 토픽**: GIL, 데코레이터, 제너레이터, 컨텍스트 매니저, 이터레이터 프로토콜, asyncio
**Why**: 데이터/스크립팅/AI 영역의 공용어.

### [etc/](./etc/)
**핵심 토픽**: Go (goroutine/channel), Rust (소유권/borrow checker), C/C++ (메모리 직접 관리)
**Why**: 시스템 프로그래밍 시야 확장. 한 언어라도 봐두면 다른 언어를 깊게 이해할 수 있음.

## 정리 템플릿

각 언어 폴더의 글은 가급적 다음 흐름으로:

1. **언어가 풀려는 문제**: 왜 등장했나
2. **메모리 / 실행 모델**: 런타임 동작
3. **동시성 모델**: 어떻게 병행을 다루는가
4. **언어 고유의 함정**: 자주 틀리는 부분
5. **이디엄**: 그 언어다운 코드 스타일

## 추천 자료

- **JavaScript**: 『모던 자바스크립트 Deep Dive』, [MDN](https://developer.mozilla.org/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/), 『이펙티브 타입스크립트』
- **Java**: 『이펙티브 자바』, 『자바 ORM 표준 JPA 프로그래밍』
- **Kotlin**: 『코틀린 인 액션』, [Kotlin Coroutines Guide](https://kotlinlang.org/docs/coroutines-guide.html)
- **Python**: 『Fluent Python』
