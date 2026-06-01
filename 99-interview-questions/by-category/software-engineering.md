# 소프트웨어 공학 (Software Engineering)

본문 폴더: [01-computer-science/software-engineering](../../01-computer-science/software-engineering/)

---

## Q. 객체지향 프로그래밍(OOP)에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 캡슐화·상속·다형성·추상화를 기반으로 데이터와 행위를 객체로 묶어 모델링하는 패러다임
    - [ ] 모든 상태를 불변으로 두고 순수 함수의 합성으로 프로그램을 구성하는 패러다임
    - [ ] 데이터와 함수를 명확히 분리하고 절차적 호출 흐름으로 작성하는 방식
    - [ ] 이벤트 발생 시점에만 코드가 실행되는 콜백 중심 프로그래밍 모델

### 핵심 답안 (30초)
> _캡슐화·상속·다형성·추상화. 데이터와 행위를 객체로 묶어 모델링._

### 꼬리 질문 후보
- OOP와 함수형 패러다임의 차이는?
- SOLID 원칙 각각을 한 줄로 설명할 수 있나?
- "상속보다 합성"이라는 원칙의 이유는?

---

## Q. 단위 테스트와 통합 테스트의 차이점은 무엇인가?

??? note "정답 보기 ▼"
    - [x] 단위는 작은 단위(함수/클래스)를 격리해서 검증, 통합은 여러 컴포넌트의 상호작용을 검증
    - [ ] 단위는 개발자가 작성하고 통합은 QA만 작성한다는 책임 주체의 차이
    - [ ] 단위는 자동화 가능하고 통합은 반드시 수동으로 수행해야 한다
    - [ ] 단위는 프로덕션에서, 통합은 스테이징에서만 실행하는 환경적 구분

### 핵심 답안 (30초)
> _단위: 작은 단위(함수/클래스) 격리 테스트. 통합: 여러 컴포넌트의 상호작용 검증._

### 꼬리 질문 후보
- 테스트 더블(Mock/Stub/Spy/Fake)의 차이는?
- 테스트 피라미드란?
- E2E 테스트가 적은 게 좋은 이유는?

---

## Q. 다음 코드 3개에서 동기/비동기 선택이 적절한지 판단하고, 그 이유를 설명하시오.

??? note "정답 보기 ▼"
    - [x] A-2(Promise.all 병렬) / B-2(동기, 필요 시 Worker) / C-2(비동기 readFile)
    - [ ] A-1(직렬 await) / B-1(Promise 래핑) / C-1(readFileSync)
    - [ ] A-2 / B-1 (CPU 계산도 Promise로 감싸야 비동기) / C-2
    - [ ] A-1 (직렬도 충분) / B-2 / C-1 (Promise는 오버헤드)

### 핵심 답안 (30초)
> _A 비동기(Promise.all) / B 동기(또는 Worker) / C 비동기.
> "비동기가 빠르다"가 아니라 **워크로드 특성**(I/O vs CPU, 의존성 유무)에 따라 선택._

---

### 코드 A — 여러 독립 API 호출

```js
// A-1안
async function loadProfile(userId) {
  const user = await fetch(`/api/user/${userId}`).then(r => r.json());
  const posts = await fetch(`/api/posts/${userId}`).then(r => r.json());
  const followers = await fetch(`/api/followers/${userId}`).then(r => r.json());
  return { user, posts, followers };
}

// A-2안
async function loadProfile(userId) {
  const [user, posts, followers] = await Promise.all([
    fetch(`/api/user/${userId}`).then(r => r.json()),
    fetch(`/api/posts/${userId}`).then(r => r.json()),
    fetch(`/api/followers/${userId}`).then(r => r.json()),
  ]);
  return { user, posts, followers };
}
```

**정답**: A-2안 (Promise.all로 병렬 비동기)

**해설**
- 세 API는 서로 의존하지 않음 → 동시에 시작해도 됨
- A-1안: 직렬 대기. 각 200ms면 총 **600ms**
- A-2안: 동시 시작. 가장 오래 걸린 것 = **약 200ms**
- "비동기 = await만 붙이면 끝"이라는 오해를 깨는 예시.
  **의존성 없는 호출은 반드시 병렬화**해야 비동기 이득을 얻음

---

### 코드 B — 무거운 CPU 계산

```js
// B-1안
async function calculateStats(numbers) {
  return new Promise((resolve) => {
    let sum = 0;
    let sumSq = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
      sumSq += numbers[i] * numbers[i];
    }
    const mean = sum / numbers.length;
    const variance = sumSq / numbers.length - mean * mean;
    resolve({ mean, variance });
  });
}

// B-2안
function calculateStats(numbers) {
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    sumSq += numbers[i] * numbers[i];
  }
  const mean = sum / numbers.length;
  const variance = sumSq / numbers.length - mean * mean;
  return { mean, variance };
}
```

**정답**: B-2안 (동기) — 단, 진짜 무거우면 Worker Thread/Process로 분리

**해설**
- `async`/`Promise`는 **"비동기 실행"을 의미하지 않음**. "Promise를 반환하는 함수" 마크업일 뿐
- B-1안의 for 루프는 **여전히 메인 스레드에서 동기적으로 실행** → 이벤트 루프 블록
- 실행 시간 동일 + **Promise 오버헤드만 추가** → 더 느림
- 진짜 병렬: Node.js의 `worker_threads`, 브라우저의 `Web Worker`, 또는 별도 프로세스
- 계산이 짧으면(수 ms 이내) 그냥 동기. Worker 띄우는 오버헤드가 더 큼

---

### 코드 C — Node.js 서버 핸들러에서 파일 읽기

```js
const fs = require('fs');
const express = require('express');
const app = express();

// C-1안
app.get('/users', (req, res) => {
  const data = fs.readFileSync('./users.json');
  res.json(JSON.parse(data));
});

// C-2안
app.get('/users', async (req, res) => {
  const data = await fs.promises.readFile('./users.json');
  res.json(JSON.parse(data));
});
```

**정답**: C-2안 (비동기)

**해설**
- Node.js는 **싱글 스레드 이벤트 루프** 모델
- C-1안: 디스크 I/O 끝날 때까지 **전체 이벤트 루프 정지**
  → 동시에 들어오는 다른 모든 요청도 멈춤
  → 사용자 1명일 땐 차이 없지만, 동시 요청이 많으면 응답 지연 폭증
- C-2안: OS에 I/O 요청만 던지고 이벤트 루프는 다른 요청 처리 가능
- `readFileSync`를 써도 되는 경우: **서버 부팅 시점의 설정 파일 로딩**, **CLI 스크립트**
- **요청 핸들러 안에서는 절대 금지**

---

### 정리

| 코드 | 정답 | 키워드 |
|------|------|--------|
| A (다중 API) | 비동기 (Promise.all) | 의존성 없는 I/O는 병렬화 |
| B (CPU 계산) | 동기 / Worker | async가 마법이 아님 |
| C (서버 파일 I/O) | 비동기 | 이벤트 루프 블로킹 금지 |

**세 줄 결론**
1. 비동기 ≠ 자동 병렬 (Promise.all로 명시해야)
2. async ≠ 별도 스레드 (CPU 작업은 그냥 메인 스레드 블록)
3. 서버 핸들러에서 동기 I/O 금지 (이벤트 루프 전체 영향)

### 꼬리 질문 후보
- A에서 `posts` API가 `user.id`를 필요로 한다면 어떻게 작성?
- B에서 `crypto.scrypt`는 비동기인데, 같은 함수를 `async`로 감싼 것과 어떻게 다른가?
- C의 파일이 100MB라면 `readFile`로도 부족할 수 있다. 어떻게?
- 비동기 코드에서 `async function` 안의 동기 for 루프가 도는 동안 이벤트 루프는?
- Node.js에서 CPU 바운드 작업을 비동기로 처리하는 표준적인 방법은?

### 관련 문서
- [동기와 비동기 본문](../../01-computer-science/software-engineering/sync-and-async.md)
