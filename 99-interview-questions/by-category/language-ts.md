# TypeScript

본문 폴더: [02-language/typescript](../../02-language/typescript/)

---

## Q. TypeScript 제네릭에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 타입을 파라미터화하여 호출 시점에 타입이 결정되는, 재사용 가능한 컴포넌트/함수 작성 기법
    - [ ] any로 선언된 변수에 자동으로 런타임 타입 검사가 들어가는 기능
    - [ ] 타입을 명시하지 않고 컴파일러가 변수 사용 패턴을 추론하는 타입 인퍼런스
    - [ ] 클래스 상속을 통한 다형성으로, OOP의 상속 메커니즘과 동일한 개념

### 핵심 답안 (30초)
> _타입을 파라미터화하여 재사용 가능한 컴포넌트/함수 작성. 호출 시점에 타입 결정._

### 꼬리 질문 후보
- extends 제약(constraint)은 어떻게 쓰나?
- 조건부 타입(conditional type)과 infer는?
- 제네릭 vs any vs unknown의 차이는?

---

## Q. enum과 object의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] enum은 양방향 매핑 코드를 생성해 번들이 커지고, `const object + as const`는 트리 셰이킹과 타입 안전성을 함께 얻음
    - [ ] enum은 런타임에 사라지고 object는 코드로 남는다 (정반대)
    - [ ] 둘 다 컴파일 결과가 동일해서 어느 쪽을 써도 차이가 없다
    - [ ] enum은 문자열만, object는 숫자만 키로 사용할 수 있다

### 핵심 답안 (30초)
> _enum: 컴파일 결과 코드 증가, 양방향 매핑. const object + as const: 트리 셰이킹 가능, 타입 안전성 유지._

### 꼬리 질문 후보
- `const enum`은 어떻게 다른가?
- 왜 일부 팀은 enum 사용을 금지하나?

---

## Q. Type이나 Interface 선언이 많아지면 성능 처리를 어떻게 하는가?

??? note "정답 보기 ▼"
    - [x] 런타임 비용은 0이고 컴파일 시간이 문제 — `incremental`, `skipLibCheck`, project references, 복잡한 조건부 타입 단순화로 대응
    - [ ] 타입은 런타임에 메모리를 차지하므로 적게 선언해야 한다
    - [ ] tsc는 자동 최적화가 없어 사용자가 직접 dead-type elimination을 수행해야 한다
    - [ ] type 키워드 대신 모두 class로 바꾸면 컴파일 시간이 줄어든다

### 핵심 답안 (30초)
> _타입은 런타임에 제거됨(zero runtime cost). 성능 이슈는 주로 컴파일 시간 — `incremental`, `skipLibCheck`, project references, 복잡한 조건부 타입 단순화._

### 꼬리 질문 후보
- type vs interface는 컴파일 성능에서 차이가 있는가?
- tsc --diagnostics로 무엇을 볼 수 있나?

---

## Q. TypeScript에서 모듈을 설명하시오.

??? note "정답 보기 ▼"
    - [x] ESM 기반 import/export로 파일 단위 캡슐화 — namespace, module declaration, ambient module 형태도 존재
    - [ ] 모든 모듈이 단일 글로벌 스코프에 합쳐져 평탄화되어 컴파일된다
    - [ ] TypeScript에는 모듈 시스템이 없고 CommonJS만 사용 가능하다
    - [ ] 모듈은 컴파일 시 제거되고 런타임에는 전부 인라인 코드로 변환된다

### 핵심 답안 (30초)
> _ESM 기반 import/export. 파일 단위 캡슐화. namespace, module declaration, ambient module._

### 꼬리 질문 후보
- ESM과 CJS의 상호 운용성 문제는?
- tsconfig의 module / moduleResolution 옵션은?
