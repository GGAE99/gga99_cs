# TypeScript

본문 폴더: [02-language/typescript](../../02-language/typescript/)

---

## Q. TypeScript 제네릭에 대해 설명하시오.

### 핵심 답안 (30초)
> _타입을 파라미터화하여 재사용 가능한 컴포넌트/함수 작성. 호출 시점에 타입 결정._

### 꼬리 질문 후보
- extends 제약(constraint)은 어떻게 쓰나?
- 조건부 타입(conditional type)과 infer는?
- 제네릭 vs any vs unknown의 차이는?

---

## Q. enum과 object의 차이를 설명하시오.

### 핵심 답안 (30초)
> _enum: 컴파일 결과 코드 증가, 양방향 매핑. const object + as const: 트리 셰이킹 가능, 타입 안전성 유지._

### 꼬리 질문 후보
- `const enum`은 어떻게 다른가?
- 왜 일부 팀은 enum 사용을 금지하나?

---

## Q. Type이나 Interface 선언이 많아지면 성능 처리를 어떻게 하는가?

### 핵심 답안 (30초)
> _타입은 런타임에 제거됨(zero runtime cost). 성능 이슈는 주로 컴파일 시간 — `incremental`, `skipLibCheck`, project references, 복잡한 조건부 타입 단순화._

### 꼬리 질문 후보
- type vs interface는 컴파일 성능에서 차이가 있는가?
- tsc --diagnostics로 무엇을 볼 수 있나?

---

## Q. TypeScript에서 모듈을 설명하시오.

### 핵심 답안 (30초)
> _ESM 기반 import/export. 파일 단위 캡슐화. namespace, module declaration, ambient module._

### 꼬리 질문 후보
- ESM과 CJS의 상호 운용성 문제는?
- tsconfig의 module / moduleResolution 옵션은?
