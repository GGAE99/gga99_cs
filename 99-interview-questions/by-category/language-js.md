# JavaScript

본문 폴더: [02-language/javascript](../../02-language/javascript/)

---

## Q. 함수 선언문과 함수 표현식의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] 선언문은 호이스팅 시 함수 전체가 끌어올려지고, 표현식은 변수 호이스팅만 되어 본체는 할당 시점에 생긴다
    - [ ] 화살표 함수는 함수 표현식의 일종으로 동일한 호이스팅 규칙을 따르며, 추가로 자체 this 바인딩이 없다는 점에서 일반 표현식과 구분된다
    - [ ] 즉시 실행 함수 표현식(IIFE)은 `(function(){})()` 형태로 정의 직후 호출되어 스코프 격리를 만드는 패턴이다
    - [ ] 이름 있는 함수 표현식(named function expression)은 스택 추적과 자기 참조에 유리하지만 이름이 외부 스코프에 노출되지는 않는다

### 핵심 답안 (30초)
> _선언문: 호이스팅 시 함수 전체가 끌어올려짐. 표현식: 변수 호이스팅만, 함수 본체는 할당 시점._

### 꼬리 질문 후보
- 화살표 함수도 함수 표현식인가?
- 함수 선언문의 호이스팅이 코드 가독성에 미치는 영향은?

---

## Q. 클로저(Closure)에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 함수가 선언된 렉시컬 환경(스코프)을 기억하여 외부 함수 실행 종료 후에도 그 변수에 접근 가능한 함수
    - [ ] 모듈 패턴은 즉시 실행 함수와 클로저를 결합해 비공개 변수와 공개 API를 분리하는 자바스크립트의 캡슐화 관용구다
    - [ ] React Hook의 stale closure는 effect/handler가 캡처한 변수 값이 이후 렌더의 최신 값을 보지 못해 생기는 클로저 관련 버그다
    - [ ] 이벤트 리스너가 외부 변수 참조를 유지하면 해당 객체의 가비지 컬렉션이 지연되어 메모리 누수를 만드는 패턴이 흔하다

### 핵심 답안 (30초)
> _함수가 선언된 렉시컬 환경을 기억하여, 외부 함수 실행 종료 후에도 변수에 접근 가능._

### 꼬리 질문 후보
- 클로저가 메모리 누수를 유발할 수 있는가?
- 모듈 패턴은 클로저의 어떤 성질을 이용하나?
- React Hook의 stale closure 문제는 무엇인가?

---

## Q. 실행 컨텍스트에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 코드 실행에 필요한 환경 정보 — Lexical Environment + Variable Environment + this binding으로 구성
    - [ ] 실행 컨텍스트가 생성되는 순서로 콜 스택에 쌓이고 종료 시 pop되는 것이 실행 컨텍스트 스택(콜 스택)이다
    - [ ] this 바인딩은 호출 형태에 따라 default(global/undefined), implicit(객체.메서드), explicit(call/apply/bind), new 4가지 규칙으로 결정된다
    - [ ] 스코프 체인은 현재 Lexical Environment를 따라 외부 환경을 거슬러 올라가며 식별자를 해석하는 참조 사슬이다

### 핵심 답안 (30초)
> _코드 실행에 필요한 환경 정보. Lexical Environment + Variable Environment + this binding._

### 꼬리 질문 후보
- 실행 컨텍스트 스택과 콜 스택의 관계는?
- this 바인딩이 결정되는 4가지 규칙은?

---

## Q. 자바스크립트가 동적 언어인 이유는?

??? note "정답 보기 ▼"
    - [x] 런타임에 타입이 결정되고 변수 타입 변경, 객체 속성의 동적 추가·삭제, 동적 디스패치가 가능하기 때문
    - [ ] TypeScript는 컴파일 타임에만 타입 검사를 추가해 런타임 동작은 그대로 두면서 동적 언어의 단점을 보완하는 점진적 타입 시스템이다
    - [ ] JIT 컴파일러는 자주 실행되는 코드를 최적화된 기계어로 변환하고, 가정이 깨지면 deoptimize로 되돌리는 방식으로 동적 언어 성능을 끌어올린다
    - [ ] V8의 hidden class는 객체의 속성 추가 순서에 따라 내부 형상을 공유해 동적 객체 접근을 단형 인라인 캐시로 최적화하는 기법이다

### 핵심 답안 (30초)
> _런타임 타입 결정, 변수 타입 변경 가능, 객체 속성 동적 추가/삭제, 동적 디스패치._

### 꼬리 질문 후보
- TypeScript가 해결하는 동적 언어의 단점은?
- JIT 컴파일러가 동적 언어 성능을 어떻게 보완하나?

---

## Q. 자바스크립트 제너레이터에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] function*와 yield로 작성하며 실행을 중단/재개할 수 있는 함수 — Iterator 프로토콜을 구현하는 객체를 반환
    - [ ] async/await는 사실 제너레이터 + 자동 호출자 패턴(co/regenerator)으로 트랜스파일되었던 역사가 있어 의미적으로 가깝지만 별개의 문법이다
    - [ ] Redux-Saga는 제너레이터의 yield로 부수 효과 명령을 기술하고 미들웨어가 그것을 해석·실행하는 비동기 제어 흐름 라이브러리다
    - [ ] async generator(`async function*`)는 비동기 시퀀스를 yield해 `for await ... of`로 소비할 수 있게 만든 비동기 이터레이터의 표준 형태다

### 핵심 답안 (30초)
> _function* 와 yield. 실행을 중단/재개할 수 있는 함수. Iterator 프로토콜 구현._

### 꼬리 질문 후보
- async/await는 제너레이터로 어떻게 구현 가능한가?
- Redux-Saga는 제너레이터를 어떻게 활용하나?

---

## Q. async / await에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Promise 위에 얹은 문법 설탕 — 비동기 코드를 동기처럼 쓰게 하며 await는 Promise 해결을 대기한다
    - [ ] async 함수의 반환값은 항상 Promise로 감싸지며, return된 평범한 값도 자동으로 resolved Promise가 된다
    - [ ] 여러 await를 병렬화하려면 `await Promise.all([...])`로 모아 한 번에 대기해야 직렬 합산 시간을 피할 수 있다
    - [ ] for-await-of는 비동기 이터러블을 한 번에 하나씩 await로 소비하는 구문으로 스트림 처리에 자주 사용된다

### 핵심 답안 (30초)
> _Promise 위 문법 설탕. 비동기 코드를 동기처럼. await는 Promise 해결 대기._

### 꼬리 질문 후보
- async 함수의 반환값은 항상 무엇인가?
- 여러 await를 병렬화하는 방법은?

---

## Q. 콜 스택과 힙에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 콜 스택은 함수 실행 컨텍스트를 LIFO로 쌓으며 원시값을 보관, 힙은 객체·참조 타입을 위한 동적 메모리
    - [ ] 재귀가 너무 깊어져 스택 한도를 넘어가면 RangeError: Maximum call stack size exceeded로 보고되는 스택 오버플로우가 발생한다
    - [ ] V8의 가비지 컬렉터는 세대 가설을 활용해 young/old 영역을 나누고, Scavenge·Mark-Sweep·Mark-Compact를 조합해 힙을 회수한다
    - [ ] 일부 엔진은 동일한 작은 객체를 콜 스택의 프레임에 직접 배치하는 escape analysis 기반의 스택 할당(scalar replacement)을 시도한다

### 핵심 답안 (30초)
> _콜 스택: 함수 실행 컨텍스트 LIFO 저장(원시값). 힙: 객체·참조 타입의 동적 메모리._

### 꼬리 질문 후보
- 스택 오버플로우는 어떤 상황에서 발생하나?
- 가비지 컬렉션은 힙에 어떻게 동작하나?

---

## Q. 이벤트 루프에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 콜 스택 + 태스크 큐 + 마이크로태스크 큐로 구성 — 스택이 비면 큐에서 작업을 꺼내 실행하는 단일 스레드 스케줄러
    - [ ] 마이크로태스크(Promise then, queueMicrotask)는 매크로태스크(setTimeout, setImmediate, I/O) 사이마다 큐가 비워질 때까지 모두 실행된다
    - [ ] setTimeout(fn, 0)은 0ms 후가 아니라 다음 매크로태스크 슬롯에 등록되는 것이라 현재 마이크로태스크 다음, 다음 렌더 전후 어딘가에 실행된다
    - [ ] Node.js의 이벤트 루프는 timers → pending → poll → check → close 같은 phase로 구성되어 setImmediate와 setTimeout이 다른 phase에서 실행된다

### 핵심 답안 (30초)
> _콜 스택 + 태스크 큐 + 마이크로태스크 큐. 스택이 비면 큐에서 작업을 꺼내 실행._

### 꼬리 질문 후보
- 마이크로태스크와 매크로태스크의 우선순위는?
- setTimeout(fn, 0)이 즉시 실행되지 않는 이유는?
- Node.js의 이벤트 루프와 브라우저는 어떻게 다른가?

---

## Q. JSON에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] JavaScript Object Notation — 텍스트 기반의 언어 독립적 데이터 교환 포맷으로 대부분 언어에서 직렬화·역직렬화를 지원
    - [ ] JSON.stringify는 두 번째 replacer로 직렬화 대상 키·값을 가공하고, 세 번째 space로 들여쓰기 폭을 지정해 가독성을 조정한다
    - [ ] JSON은 undefined, function, Symbol, 순환 참조, BigInt 같은 값을 표현하지 못하며 stringify 시 제외되거나 예외가 발생한다
    - [ ] JSON5나 JSON Schema는 각각 주석·후행 쉼표 같은 작성 편의성과 구조 검증을 보강한 JSON 파생 표준이다

### 핵심 답안 (30초)
> _JavaScript Object Notation. 텍스트 기반 데이터 교환 포맷. 언어 독립적._

### 꼬리 질문 후보
- JSON.stringify의 두 번째/세 번째 인자는?
- JSON이 표현할 수 없는 JS 값은? (undefined, function, Symbol, 순환 참조)

---

## Q. 자바스크립트 label에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 반복문에 이름을 붙여 break/continue로 특정 루프를 제어하는 문법 — 중첩 루프 탈출에 유용
    - [ ] 흐름 제어를 명시적으로 만들어 가독성을 높이지만, 잘못 쓰면 goto와 유사해 보여 코드 스타일 가이드에서 제한적으로 권장된다
    - [ ] label은 for·while·do-while뿐 아니라 블록문에도 붙일 수 있어 단순 블록에서의 조기 종료 패턴에 사용되기도 한다
    - [ ] switch 문 안에서는 label 없이 break가 case만 빠져나가므로, 바깥 반복문을 함께 끊으려면 label이 필요하다

### 핵심 답안 (30초)
> _반복문에 이름을 붙여 break/continue로 특정 루프 제어. 중첩 루프 탈출에 유용._

### 꼬리 질문 후보
- label 사용이 권장되지 않는 이유는?

---

## Q. Ajax에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Asynchronous JavaScript and XML — 비동기 HTTP 요청으로 페이지 갱신 없이 데이터를 교환하는 기법
    - [ ] XMLHttpRequest는 오래된 콜백 기반 API이고 fetch는 Promise 기반의 모던 대체로, 응답 본문 스트리밍과 Headers/Request 객체를 표준화했다
    - [ ] fetch는 네트워크 오류일 때만 reject되고 4xx/5xx 응답은 그대로 resolve되므로 ok 속성이나 status를 직접 확인해야 한다
    - [ ] AbortController로 fetch 요청을 취소할 수 있으며 동일 신호를 여러 요청에 공유해 그룹 단위 취소를 구현할 수 있다

### 핵심 답안 (30초)
> _Asynchronous JavaScript and XML. 비동기 HTTP 요청으로 페이지 갱신 없이 데이터 교환._

### 꼬리 질문 후보
- XMLHttpRequest와 fetch의 차이는?
- fetch는 왜 4xx/5xx에서 reject되지 않는가?

---

## Q. undefined와 null의 차이점은?

??? note "정답 보기 ▼"
    - [x] undefined는 변수 선언 후 미할당 상태 / 의도 없음, null은 의도적인 "값 없음" 할당
    - [ ] typeof null이 "object"인 이유는 초기 JS의 내부 태그 비트 구조에서 비롯된 버그성 동작으로 표준에 그대로 굳어진 결과다
    - [ ] `null == undefined`는 true이지만 `null === undefined`는 false인데, 이는 == 비교 시 두 값을 동치로 보는 명세 예외 때문이다
    - [ ] 옵셔널 체이닝(`?.`)과 nullish coalescing(`??`)은 null·undefined 모두를 nullish로 다루어 안전한 접근과 기본값 설정을 단순화한다

### 핵심 답안 (30초)
> _undefined: 변수 선언 후 미할당 / 의도 없음. null: 의도적인 "값 없음" 할당._

### 꼬리 질문 후보
- typeof null이 "object"인 이유는?
- == 와 === 비교에서 둘은 어떻게 다른가?

---

## Q. 자바스크립트 Promise에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 비동기 작업의 최종 결과를 나타내는 객체 — 상태는 Pending → Fulfilled / Rejected로 한 번만 전이된다
    - [ ] Promise 체이닝에서 어느 한 단계가 reject되면 catch가 등장할 때까지 자동으로 전파되며 중간 then의 onFulfilled는 건너뛴다
    - [ ] then이 새 Promise를 반환하는 마이크로태스크 기반 체인 구조 덕분에 콜백 지옥 없이 비동기 흐름을 평탄하게 표현할 수 있다
    - [ ] Unhandled promise rejection은 catch가 없는 reject가 마이크로태스크를 빠져나갈 때 발생해 런타임이 경고를 발생시키는 에러 처리 누락 신호다

### 핵심 답안 (30초)
> _비동기 작업의 최종 결과를 나타내는 객체. Pending → Fulfilled / Rejected._

### 꼬리 질문 후보
- Promise 체이닝 중 에러는 어떻게 전파되나?
- 콜백 지옥과 Promise는 어떻게 다른가?

---

## Q. Promise.all과 Promise.race의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] all은 모두 성공 시 결과 배열을 반환하고 하나라도 실패하면 reject, race는 가장 먼저 settled(성공·실패 무관)되는 결과를 반환
    - [ ] allSettled는 성공·실패 여부와 무관하게 모든 Promise가 끝날 때까지 기다린 뒤 각각의 상태와 값을 담은 객체 배열을 반환한다
    - [ ] any는 가장 먼저 fulfilled되는 결과를 반환하며, 모두 reject되면 AggregateError로 한꺼번에 실패를 보고한다
    - [ ] race는 가장 먼저 끝나기만 하면 reject 결과도 그대로 전달되므로 타임아웃 구현 시 정상 응답보다 타이머가 먼저 끝나는 시나리오를 고려해야 한다

### 핵심 답안 (30초)
> _all: 모두 성공 시 결과 배열, 하나라도 실패 시 reject. race: 가장 먼저 settled되는 결과._

### 꼬리 질문 후보
- Promise.allSettled / Promise.any는 무엇이 다른가?

---

## Q. == 와 === 의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] ==은 타입 강제 변환 후 비교, ===은 타입까지 일치해야 true를 반환하는 엄격 비교
    - [ ] `null == undefined`가 true인 것은 ECMAScript 명세에서 두 값을 서로 동치로 정의한 예외적인 == 규칙 때문이다
    - [ ] `NaN === NaN`은 false인데, IEEE 754 표준에서 NaN은 자기 자신과도 같지 않다고 정의되어 있어 `Number.isNaN`으로 별도 검사해야 한다
    - [ ] `Object.is(a, b)`는 ===와 거의 같지만 `+0 !== -0`, `NaN === NaN` 같은 엣지 케이스를 다르게 처리하는 동일성 비교 함수다

### 핵심 답안 (30초)
> _==: 타입 강제 변환 후 비교. ===: 타입까지 일치해야 true._

### 꼬리 질문 후보
- null == undefined 가 true인 이유는?
- NaN === NaN 이 false인 이유는?

---

## Q. 디바운스와 쓰로틀의 차이를 설명하시오.

??? note "정답 보기 ▼"
    - [x] 디바운스는 마지막 호출 후 일정 시간이 지나야 한 번 실행, 쓰로틀은 일정 주기마다 최대 1번 실행
    - [ ] 검색창 자동완성처럼 "타이핑이 멈춘 시점에만" 요청해야 할 때는 디바운스가 적합하며 leading/trailing 옵션으로 첫·끝 실행 시점을 조절한다
    - [ ] 무한 스크롤·resize 같은 연속 이벤트는 일정 주기로 안정적으로 처리해야 하므로 쓰로틀이 적합하며 requestAnimationFrame 기반 변형도 자주 쓰인다
    - [ ] lodash의 throttle은 내부적으로 디바운스를 maxWait 옵션과 결합해 구현되어 있어 두 기법이 동일한 코드 베이스 위에 만들어지는 경우가 많다

### 핵심 답안 (30초)
> _Debounce: 마지막 호출 후 일정 시간 뒤 1번 실행. Throttle: 일정 주기로 최대 1번 실행._

### 꼬리 질문 후보
- 검색창 자동완성에는 어느 쪽이 적합한가?
- 무한 스크롤에는 어느 쪽이 적합한가?
