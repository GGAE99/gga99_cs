# TypeScript

본문 폴더: [02-language/typescript](../../02-language/typescript/)

---

## Q. TypeScript 제네릭에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 타입을 파라미터화하여 호출 시점에 타입이 결정되는, 재사용 가능한 컴포넌트/함수 작성 기법
    - [ ] 컴파일러가 변수의 초기값과 사용 패턴을 보고 명시 없이 타입을 결정해 주는 타입 추론(type inference)
    - [ ] 같은 함수명이 매개변수 시그니처별로 다른 동작을 갖도록 선언할 수 있는 함수 오버로딩(function overload)
    - [ ] 유니온/인터섹션·조건부 타입 등으로 기존 타입을 가공해 새 타입을 만드는 매핑드 타입(mapped types)

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
    - [ ] `const enum`은 인라인 치환되어 런타임에 흔적이 없지만 isolatedModules와 충돌해 쓰지 못하는 환경이 많음
    - [ ] `union of string literals`는 enum과 유사한 타입 안전성을 주지만 값 자체가 런타임에 노출되지 않음
    - [ ] readonly 배열 + 인덱싱 패턴은 enum보다 표현력이 떨어지지만 정렬·반복에 강해 자주 쓰임

### 핵심 답안 (30초)
> _enum: 컴파일 결과 코드 증가, 양방향 매핑. const object + as const: 트리 셰이킹 가능, 타입 안전성 유지._

### 꼬리 질문 후보
- `const enum`은 어떻게 다른가?
- 왜 일부 팀은 enum 사용을 금지하나?

---

## Q. Type이나 Interface 선언이 많아지면 성능 처리를 어떻게 하는가?

??? note "정답 보기 ▼"
    - [x] 런타임 비용은 0이고 컴파일 시간이 문제 — `incremental`, `skipLibCheck`, project references, 복잡한 조건부 타입 단순화로 대응
    - [ ] `tsc --diagnostics`로 체크 시간 병목을 파악하고 자주 변하지 않는 의존 패키지의 d.ts는 사전 빌드해 캐시한다
    - [ ] 무거운 매핑드 타입은 helper 타입으로 추출하고 깊은 재귀 조건부 타입은 leaf 케이스를 우선 분기해 단순화한다
    - [ ] `tsserver`의 LSP 응답이 느려질 때는 에디터 별 메모리 옵션과 incremental 빌드 캐시를 우선 점검한다

### 핵심 답안 (30초)
> _타입은 런타임에 제거됨(zero runtime cost). 성능 이슈는 주로 컴파일 시간 — `incremental`, `skipLibCheck`, project references, 복잡한 조건부 타입 단순화._

### 꼬리 질문 후보
- type vs interface는 컴파일 성능에서 차이가 있는가?
- tsc --diagnostics로 무엇을 볼 수 있나?

---

## Q. TypeScript에서 모듈을 설명하시오.

??? note "정답 보기 ▼"
    - [x] ESM 기반 import/export로 파일 단위 캡슐화 — namespace, module declaration, ambient module 형태도 존재
    - [ ] `tsconfig`의 `module` / `moduleResolution` 옵션으로 CJS·ESM·NodeNext 등 산출물의 모듈 시스템을 결정하는 설정
    - [ ] 외부 자바스크립트 라이브러리의 타입만 별도로 기술해 임포트할 수 있도록 만든 `.d.ts` 선언 파일
    - [ ] 동일 디렉터리 안의 여러 파일을 하나의 진입점으로 모아 다시 내보내는 배럴(barrel) 파일 패턴

### 핵심 답안 (30초)
> _ESM 기반 import/export. 파일 단위 캡슐화. namespace, module declaration, ambient module._

### 꼬리 질문 후보
- ESM과 CJS의 상호 운용성 문제는?
- tsconfig의 module / moduleResolution 옵션은?
