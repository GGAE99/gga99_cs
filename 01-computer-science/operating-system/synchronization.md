# 프로세스/스레드 동기화 (Synchronization)

> **한 줄 정리**
> 여러 실행 흐름이 **공유 자원**에 접근할 때 발생하는 **경쟁 조건(Race Condition)**을 막기 위한 기법.
> 핵심은 **임계 구역(Critical Section)**을 한 번에 하나의 실행 흐름만 들어가도록 보장하는 것.

---

## 1. 왜 동기화가 필요한가?

### 1.1 경쟁 조건 (Race Condition)
두 개 이상의 실행 흐름이 **공유 데이터에 동시에 접근**하면, 실행 순서에 따라 결과가 달라지는 현상.

**예시: 잔액 1000원에서 두 스레드가 각각 500원씩 출금**
```
스레드 A             스레드 B            잔액(공유)
read balance(1000)                       1000
                    read balance(1000)   1000
write balance(500)                       500
                    write balance(500)   500   ← 1000원 출금되었지만 500만 빠짐!
```

원래는 `1000 - 500 - 500 = 0`이 되어야 하지만, 동기화가 없어서 잔액이 500원이 남는다. 은행 입장에서는 **돈을 잃는 버그**.

### 1.2 왜 일어나는가?
- `balance = balance - 500` 같은 **단순 연산도 기계어 수준에서는 여러 명령어** (load → subtract → store)
- 그 사이에 다른 스레드가 끼어들면 데이터가 깨짐
- 이 단위 연산을 **원자적(atomic)**으로 만들거나, **상호 배제(mutual exclusion)**로 보호해야 함

---

## 2. 임계 구역 (Critical Section)

> 공유 자원에 접근하는 코드 영역. 한 번에 하나의 스레드만 진입해야 한다.

```
entry section      ← 락 획득 시도
critical section   ← 공유 자원 접근 (보호 대상)
exit section       ← 락 해제
remainder section  ← 나머지 코드
```

### 임계 구역 문제 해결의 3가지 조건
1. **상호 배제 (Mutual Exclusion)**: 한 번에 한 스레드만 임계 구역 진입
2. **진행 (Progress)**: 임계 구역이 비어있고 누군가 들어가려 하면, 무한정 막혀선 안 됨
3. **한정 대기 (Bounded Waiting)**: 어떤 스레드도 무한정 기다리지 않아야 함 (기아 방지)

---

## 3. 주요 동기화 도구

### 3.1 뮤텍스 (Mutex, Mutual Exclusion)
> **소유권 개념의 이진 락**. 락을 획득한 스레드만 해제할 수 있다.

```
lock(mutex)         ← 다른 스레드가 잡고 있으면 대기 (Block)
  // critical section
unlock(mutex)       ← 락을 잡은 스레드만 해제 가능
```

**특징**
- `0` 또는 `1` 상태 (이진)
- **소유권(Ownership) 존재** → 락을 건 스레드만 풀 수 있음
- 다른 스레드가 풀려고 하면 에러 또는 정의되지 않은 동작

**예시 (pthread)**
```c
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void* worker(void* arg) {
    pthread_mutex_lock(&lock);
    balance -= 500;          // critical section
    pthread_mutex_unlock(&lock);
}
```

### 3.2 세마포어 (Semaphore)
> **정수 카운터 기반 동기화 도구**. 자원의 개수를 제어한다.

```
wait(S)   /* P 연산 */    if (S > 0) S--;  else block;
signal(S) /* V 연산 */    if (waiting) wake; else S++;
```

**종류**
- **카운팅 세마포어 (Counting Semaphore)**: 0 이상 정수. 자원 풀 관리에 적합.
- **이진 세마포어 (Binary Semaphore)**: 0 또는 1. 뮤텍스와 비슷하지만 소유권 없음.

**예시: DB 커넥션 풀 (최대 5개)**
```c
sem_t db_pool;
sem_init(&db_pool, 0, 5);  // 초기값 5

sem_wait(&db_pool);  // 자원 획득 (없으면 대기)
// use connection
sem_post(&db_pool);  // 자원 반환
```

### 3.3 뮤텍스 vs 세마포어

| 항목 | 뮤텍스 (Mutex) | 세마포어 (Semaphore) |
|------|----------------|---------------------|
| **목적** | 상호 배제 | 자원 개수 제어 |
| **값** | 0 또는 1 (이진) | 0 이상 정수 |
| **소유권** | 있음 (잠근 스레드만 해제) | 없음 (다른 스레드도 해제 가능) |
| **용도** | 임계 구역 보호 | 자원 풀, 순서 제어 |
| **우선순위 역전 보호** | 지원 (Priority Inheritance) | 미지원 |
| **비유** | 화장실 열쇠 1개 | 화장실 N개의 이용권 |

**자주 나오는 질문**: "이진 세마포어가 뮤텍스를 대체할 수 있는가?"
→ **유사하지만 다르다.** 이진 세마포어는 소유권이 없어서 **다른 스레드도 해제 가능**. 우선순위 역전 문제, ABA 문제 방지 측면에서 뮤텍스가 더 안전.

### 3.4 모니터 (Monitor)
> **고수준 동기화 추상화**. 객체 단위로 자동으로 상호 배제를 보장.

- 메서드 진입 시 자동으로 락 획득, 종료 시 해제
- **조건 변수(Condition Variable)**와 함께 동작: `wait()`, `notify()`, `notifyAll()`
- 자바의 `synchronized`, `wait/notify`가 모니터의 대표적 구현

**예시 (Java)**
```java
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;                  // 자동으로 락 획득/해제
    }

    public synchronized int get() {
        return count;
    }
}
```

### 3.5 스핀락 (Spinlock)
> **락이 풀릴 때까지 CPU를 점유하며 계속 확인**하는 락.

```c
while (test_and_set(&lock)) {
    // busy waiting (loop)
}
// critical section
lock = 0;
```

**특징**
- 컨텍스트 스위칭이 없음 → 락 보유 시간이 매우 짧을 때 효율적
- 락이 길어지면 CPU를 낭비함 (Busy Waiting)
- **단일 CPU 환경에서는 의미 없음** (락 보유자가 실행되어야 풀리는데, 스핀 중이라 양보 안 함)
- 커널 내부, SMP 환경에서 짧은 임계 구역에 자주 쓰임

**스핀락 vs 뮤텍스**
| 항목 | 스핀락 | 뮤텍스 |
|------|--------|--------|
| **대기 방식** | Busy Waiting (CPU 점유) | Blocking (Sleep) |
| **컨텍스트 스위칭** | 없음 | 있음 |
| **적합한 상황** | 락 보유 시간이 매우 짧을 때 | 락 보유 시간이 길 때 |
| **CPU 사용량** | 높음 | 낮음 |

### 3.6 읽기-쓰기 락 (Read-Write Lock, RW Lock)
> **읽기는 여러 스레드가 동시에**, **쓰기는 단독으로**.

- 읽기 빈도가 압도적으로 많은 경우 효율적
- 쓰기 기아(Writer Starvation) 가능성 주의
- Java의 `ReentrantReadWriteLock`, POSIX의 `pthread_rwlock_t`

---

## 4. 조건 변수 (Condition Variable)

> "**어떤 조건이 만족될 때까지 기다리는**" 동기화 도구. 뮤텍스와 함께 사용.

**대표 패턴: 생산자-소비자**
```c
pthread_mutex_lock(&mutex);
while (queue_is_empty()) {           // while 사용 주의 (spurious wakeup 방지)
    pthread_cond_wait(&cond, &mutex); // 락 해제 + 대기 + 깨어나면 재획득
}
item = dequeue();
pthread_mutex_unlock(&mutex);
```

**주의: `while`이 아닌 `if`를 쓰면 안 되는 이유**
- **Spurious Wakeup**: 신호 없이도 깨어날 수 있음
- 깨어났을 때 조건을 **다시 확인**해야 안전

---

## 5. 데드락 (Deadlock)

### 5.1 정의
두 개 이상의 스레드가 서로 상대가 가진 자원을 기다리며 **무한히 대기**하는 상태.

**예시**
```
스레드 A: lock(R1) → lock(R2) 대기
스레드 B: lock(R2) → lock(R1) 대기  → 데드락
```

### 5.2 데드락의 4가지 필요 조건 (Coffman Conditions)
**모두 만족해야** 데드락이 발생.

1. **상호 배제 (Mutual Exclusion)**: 자원은 한 번에 한 스레드만 사용 가능
2. **점유와 대기 (Hold and Wait)**: 자원을 가진 채로 다른 자원을 기다림
3. **비선점 (No Preemption)**: 자원을 강제로 빼앗을 수 없음
4. **순환 대기 (Circular Wait)**: 대기 그래프에 사이클 존재

### 5.3 데드락 해결 방법
| 전략 | 설명 |
|------|------|
| **예방 (Prevention)** | 4가지 조건 중 하나를 사전에 깨뜨림 (예: 자원 한꺼번에 할당) |
| **회피 (Avoidance)** | 자원 할당 전 안전한지 검사 (예: Banker's Algorithm) |
| **탐지 & 복구 (Detection & Recovery)** | 데드락 발생 후 발견하면 일부 프로세스 종료 |
| **무시 (Ostrich Algorithm)** | 발생 확률 낮으면 그냥 무시 (실제 OS들이 종종 선택) |

### 5.4 실무에서 자주 쓰는 회피 패턴
- **락 순서 일관성**: 모든 스레드가 동일한 순서로 락을 획득 (`lock(A) → lock(B)`)
- **타임아웃**: 일정 시간 안에 락 못 얻으면 포기 (`tryLock`)
- **계층적 락(Lock Hierarchy)**: 락에 레벨을 두고 낮은 레벨 → 높은 레벨 순서로만 획득

---

## 6. 기아 (Starvation)와 우선순위 역전 (Priority Inversion)

### 6.1 기아 (Starvation)
특정 스레드가 **계속 자원을 못 얻는 상태**.
- 우선순위가 낮아서 계속 밀리는 경우
- 락 정책이 불공정한 경우 (예: 항상 같은 스레드가 먼저 깨어남)

**해결**: Fair Lock, 에이징(Aging — 대기 시간이 길어질수록 우선순위 상승)

### 6.2 우선순위 역전 (Priority Inversion)
**낮은 우선순위 스레드가 락을 잡고 있어서, 높은 우선순위 스레드가 대기**하는 현상.

**유명 사례: 1997년 NASA Mars Pathfinder**
- 저우선순위 태스크가 뮤텍스 보유 중
- 중간 우선순위 태스크가 CPU 점유 → 저우선순위는 실행 못함 → 락 못 품
- 고우선순위 태스크는 락 대기 중 → 워치독 리셋 반복

**해결**
- **우선순위 상속 (Priority Inheritance)**: 낮은 우선순위가 락 잡고 있는 동안, 대기 중인 고우선순위 스레드의 우선순위를 임시로 상속
- **우선순위 천장 (Priority Ceiling)**: 락마다 천장 우선순위를 두고, 잡은 순간 그 우선순위로 상승

---

## 7. 원자 연산 (Atomic Operations) & Lock-Free

### 7.1 원자 연산
CPU가 한 번에 처리하는, 중간에 끊기지 않는 연산.
- `compare_and_swap (CAS)`
- `fetch_and_add`
- `test_and_set`

**예시 (C++ atomic)**
```cpp
std::atomic<int> counter{0};
counter.fetch_add(1);   // 락 없이도 안전
```

### 7.2 Lock-Free / Wait-Free
락을 쓰지 않고 원자 연산만으로 동기화하는 알고리즘.

| 종류 | 의미 |
|------|------|
| **Lock-Free** | 어떤 스레드는 진행을 보장 받음 (다른 스레드는 대기 가능) |
| **Wait-Free** | 모든 스레드가 유한 시간 안에 완료 보장 |

**장점**: 데드락 없음, 컨텍스트 스위칭 비용 없음
**단점**: 구현 어려움, ABA 문제, 메모리 모델 이해 필요

---

## 8. 동기화 종류별 비교 요약

| 도구 | 용도 | 비용 | 비고 |
|------|------|------|------|
| **Mutex** | 임계 구역 보호 | 중간 (Blocking) | 소유권 있음 |
| **Semaphore** | 자원 개수 제어 | 중간 | 소유권 없음, 카운팅 가능 |
| **Spinlock** | 짧은 임계 구역 | CPU 점유 | 짧을 때만 효율 |
| **Monitor** | 객체 단위 자동 동기화 | 중간 | 고수준 추상화 (Java synchronized) |
| **RW Lock** | 읽기 多, 쓰기 少 | 중간 | 읽기 공유, 쓰기 단독 |
| **Atomic** | 단순 변수 연산 | 매우 낮음 | Lock-Free |
| **Condition Variable** | 조건부 대기 | 중간 | Mutex와 짝 |

---

## 9. 실무에서 자주 마주치는 동기화

### 9.1 Java
- `synchronized` (모니터 기반)
- `ReentrantLock` (명시적 락, tryLock 지원)
- `ReadWriteLock`
- `ConcurrentHashMap` (락 분할 - Lock Striping)
- `AtomicInteger`, `AtomicReference` (CAS 기반)
- `volatile` (가시성만 보장, 원자성 X)

### 9.2 Python
- `threading.Lock`, `threading.RLock`
- `threading.Semaphore`, `BoundedSemaphore`
- `Queue` (내부적으로 락 사용)
- **GIL** 때문에 Python 스레드는 CPU 바운드 동시 실행이 안 됨 (하나만 실행) — 이건 동기화 도구가 아니라 인터프리터 락

### 9.3 데이터베이스
- **비관적 락 (Pessimistic Lock)**: `SELECT ... FOR UPDATE`
- **낙관적 락 (Optimistic Lock)**: 버전 컬럼 비교 후 업데이트
- 트랜잭션 격리 수준 (Read Committed, Repeatable Read, Serializable)

---

## 10. 면접 단골 질문

### Q1. Race Condition을 막는 방법은?
- 임계 구역을 락으로 보호 (Mutex, Semaphore)
- 원자 연산 사용 (CAS, Atomic)
- 불변(Immutable) 데이터 사용
- 스레드 로컬 저장소 (ThreadLocal)
- 메시지 패싱 (공유 메모리 대신)

### Q2. Mutex와 Semaphore의 차이는?
→ [§3.3 표 참조]. 핵심: **소유권 + 카운팅 여부**.

### Q3. 데드락의 4가지 조건과 해결 방법은?
→ [§5.2, §5.3 참조].

### Q4. 자바의 synchronized와 ReentrantLock의 차이는?
- `synchronized`: 모니터 기반, 자동 해제 (try-finally 불필요), `tryLock`/타임아웃 미지원
- `ReentrantLock`: 명시적 락, `tryLock` 지원, 공정성(Fair) 옵션, Condition 여러 개 가능
- 단순한 경우 `synchronized`가 충분하고 가독성도 좋음. 세밀한 제어가 필요하면 `ReentrantLock`.

### Q5. `volatile`은 동기화 도구인가?
- **아니다.** 메모리 가시성(visibility)만 보장. **원자성은 보장하지 않음.**
- `volatile int count; count++;` → 여전히 Race Condition 발생
- Atomic 변수나 락이 필요한 경우 `volatile`로는 부족

### Q6. CAS(Compare-And-Swap)의 단점은?
- **ABA 문제**: 값이 A → B → A로 바뀌어도 CAS는 같다고 판단
- **해결**: 버전 번호 추가 (Stamped Reference, ABA Counter)
- 경쟁이 심하면 재시도가 많아져 오히려 락보다 느릴 수 있음

---

## 11. 관련 주제

- [프로세스와 스레드](./process-and-thread.md) — 동기화가 필요한 이유의 출발점
- 데드락 상세 *(TBD)*
- CPU 스케줄링 *(TBD)*
- Java Memory Model (JMM) *(TBD)*
- 트랜잭션 격리 수준 *(TBD)*

---

## 참고

- *Operating System Concepts* (공룡책) — Silberschatz, Chapter 6-7
- *The Art of Multiprocessor Programming* — Herlihy & Shavit
- *Java Concurrency in Practice* — Brian Goetz
- [POSIX Threads Programming (LLNL)](https://hpc-tutorials.llnl.gov/posix/)
- [Mars Pathfinder Priority Inversion](https://www.cs.unc.edu/~anderson/teach/comp790/papers/mars_pathfinder_long_version.html)
