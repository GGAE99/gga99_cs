# CPU 스케줄링 (CPU Scheduling)

> **한 줄 정리**
> Ready 큐에 있는 여러 프로세스/스레드 중 **다음에 CPU를 할당받을 대상을 결정**하는 정책.
> "공정성, 응답성, 처리량, 효율성" 사이의 트레이드오프를 다룬다.

---

## 1. 왜 CPU 스케줄링이 필요한가?

### 1.1 배경
- CPU는 한 번에 하나의 스레드만 실행 가능 (코어당)
- 메모리에는 여러 프로세스가 동시에 적재됨 (멀티프로그래밍)
- I/O 대기 중인 프로세스가 CPU를 점유하고 있으면 **CPU가 놀게 됨**

→ **Ready 상태의 프로세스 중 누구에게 CPU를 줄지 결정**해야 함.

### 1.2 스케줄러의 목표
| 목표 | 의미 | 충돌 가능성 |
|------|------|-------------|
| **CPU 이용률 (Utilization)** | CPU를 놀리지 않기 | - |
| **처리량 (Throughput)** | 단위 시간당 완료 프로세스 수 ↑ | 응답시간과 충돌 |
| **응답시간 (Response Time)** | 요청 후 첫 응답까지 시간 ↓ | 처리량과 충돌 |
| **대기시간 (Waiting Time)** | Ready 큐에서 기다리는 총 시간 ↓ | - |
| **반환시간 (Turnaround Time)** | 제출부터 완료까지 총 시간 ↓ | - |
| **공정성 (Fairness)** | 기아 없음 | 우선순위와 충돌 |

**현실은 모든 걸 만족할 수 없다.** 워크로드에 따라 우선순위를 둔다.
- 배치 시스템: 처리량, 반환시간 중시
- 대화형 시스템: 응답시간 중시
- 실시간 시스템: 마감시한(deadline) 중시

---

## 2. 스케줄링의 3 레벨

| 레벨 | 역할 | 빈도 |
|------|------|------|
| **장기 스케줄러 (Long-term)** | 어떤 프로세스를 메모리에 올릴지 (Job → Ready) | 드물게 (초~분) |
| **중기 스케줄러 (Medium-term)** | 메모리에서 디스크로 스왑 아웃 / 스왑 인 | 가끔 (메모리 부족 시) |
| **단기 스케줄러 (Short-term)** | Ready 큐에서 CPU에 누구를 올릴지 | 매우 자주 (ms 단위) |

**보통 "CPU 스케줄링"이라 하면 단기 스케줄러를 의미한다.**

---

## 3. 선점형 vs 비선점형

### 3.1 비선점형 (Non-preemptive)
- 한 번 CPU를 받으면 **자발적으로 놓을 때까지** 계속 실행
- CPU 양보 시점: 종료, I/O 대기, `yield()`
- 단순하지만 응답성↓ (긴 작업이 짧은 작업을 막음)
- 예: FCFS, SJF(비선점), Priority(비선점)

### 3.2 선점형 (Preemptive)
- OS가 강제로 CPU를 빼앗을 수 있음 (타이머 인터럽트 등)
- 응답성↑, 공정성↑
- 컨텍스트 스위칭 비용 ↑, 동기화 복잡도↑
- 예: Round Robin, SRTF, Priority(선점), MLFQ

**현대 OS는 거의 모두 선점형**이다 (Linux, Windows, macOS).

---

## 4. 주요 스케줄링 알고리즘

### 4.1 FCFS (First-Come, First-Served)
> 도착 순서대로 처리. **비선점형**.

**예시**: 도착 순서 P1(burst=24), P2(burst=3), P3(burst=3)

```
시간:  0─────────24──27──30
       │   P1    │P2│P3│
대기시간: P1=0, P2=24, P3=27
평균 대기시간 = (0+24+27)/3 = 17
```

**문제: Convoy Effect**
긴 작업 뒤에 짧은 작업들이 줄줄이 대기하는 현상.
도착 순서가 P2→P3→P1이었다면 평균 대기시간 = (0+3+6)/3 = 3 (훨씬 좋음)

| 장점 | 단점 |
|------|------|
| 구현 단순, 공정 | Convoy Effect, 응답시간 큼 |

### 4.2 SJF (Shortest Job First)
> CPU 점유시간(burst time)이 **짧은 작업부터** 처리.

- **비선점형 SJF**: 한 번 시작하면 끝까지
- **선점형 SJF = SRTF (Shortest Remaining Time First)**: 더 짧은 작업이 도착하면 선점

**장점**: 평균 대기시간 최적 (이론상 최소)
**단점**:
- burst time을 **미리 알 수 없음** → 예측해야 함 (지수 평균: `τ_{n+1} = α·t_n + (1-α)·τ_n`)
- 긴 작업 **기아** 발생 가능

### 4.3 Priority Scheduling
> 우선순위가 높은 프로세스 먼저.

- 우선순위 결정: 사용자 지정, 메모리 요구량, CPU 시간, 외부 요인 등
- SJF는 사실상 burst time이 우선순위인 priority scheduling
- **선점형/비선점형 모두 가능**

**문제: 기아 (Starvation)**
낮은 우선순위는 영원히 못 받을 수 있음.

**해결: 에이징 (Aging)**
대기 시간이 길어질수록 우선순위를 점진적으로 ↑

### 4.4 Round Robin (RR)
> 각 프로세스에 **타임 슬라이스(Time Quantum)**를 부여하고 순환.

- 타임 슬라이스가 끝나면 **타이머 인터럽트** → 강제 선점 → 큐 뒤로
- 대화형 시스템에 적합 (응답시간 좋음)

**타임 슬라이스 크기 선택**
- **너무 크면**: FCFS와 동일해짐
- **너무 작으면**: 컨텍스트 스위칭 오버헤드 ↑
- 일반적으로 **10~100ms** 범위

**예시**: P1(24), P2(3), P3(3), quantum=4
```
0──4──7──10──14──18──22──26──30
P1│P2│P3│P1 │P1 │P1 │P1 │P1│
대기시간: P1=6, P2=4, P3=7
평균 = 17/3 ≈ 5.66
```

### 4.5 Multilevel Queue
> Ready 큐를 **여러 개의 큐로 분리**하고 큐마다 다른 알고리즘 적용.

- 예: Foreground(RR) / Background(FCFS)
- 큐 간 우선순위 (Foreground이 항상 우선) — 단순하지만 기아 위험
- 또는 시간 분할 (Foreground 80%, Background 20%)

**문제**: 프로세스가 큐 사이 이동 불가 → 유연성 ↓

### 4.6 MLFQ (Multilevel Feedback Queue)
> Multilevel Queue + **큐 간 이동 허용**.

**규칙 (OSTEP 정식 규칙)**
1. 우선순위가 더 높은 큐가 있으면 그쪽 먼저
2. 같은 큐에서는 Round Robin
3. 새 작업은 **최상위 큐**에서 시작 (보통 짧다고 가정)
4. 타임 슬라이스를 모두 쓰면 한 단계 **강등** (CPU 바운드로 판단)
5. 일정 시간마다 모든 작업을 **최상위로 승격** (기아 방지)

**장점**: 짧은 작업/대화형은 빠르게, 긴 CPU 바운드 작업은 낮은 우선순위로 → 두 마리 토끼
**단점**: 파라미터 튜닝 어려움, 게이밍 가능 (I/O 한 번씩 끼워서 우선순위 유지)

**실무**: Windows, 과거 Solaris 등이 MLFQ 계열 사용

---

## 5. 알고리즘 비교 요약

| 알고리즘 | 선점 | 평균 대기시간 | 응답성 | 기아 | 비고 |
|----------|------|---------------|--------|------|------|
| FCFS | X | 나쁨 (Convoy) | 나쁨 | 없음 | 단순 |
| SJF | X | 최적 | 나쁨 | 있음 | burst 예측 필요 |
| SRTF | O | 최적 | 좋음 | 있음 | SJF 선점형 |
| Priority | O/X | 변동 | 변동 | 있음 | 에이징 필요 |
| RR | O | 중간 | 좋음 | 없음 | quantum 튜닝 |
| MLFQ | O | 좋음 | 좋음 | 거의 없음 | 파라미터 多 |

---

## 6. 성능 지표 계산 (예시 문제)

**상황**: 다음 세 프로세스가 거의 동시에 도착 (도착 시간 0).

| 프로세스 | Burst Time | Priority |
|----------|-----------|----------|
| P1 | 10 | 3 |
| P2 | 1 | 1 (높음) |
| P3 | 2 | 2 |

### FCFS (도착 순서: P1 → P2 → P3)
```
0──────10──11──13
   P1   │P2│ P3│
대기시간: P1=0, P2=10, P3=11 → 평균 7
반환시간: P1=10, P2=11, P3=13 → 평균 11.33
```

### SJF (비선점, burst 짧은 순)
```
0─1──3───────────13
P2│ P3 │   P1     │
대기시간: P2=0, P3=1, P1=3 → 평균 1.33
반환시간: P2=1, P3=3, P1=13 → 평균 5.66
```

### Priority (비선점)
```
0─1──3───────────13
P2│ P3 │   P1     │
(P2 → P3 → P1 우선순위 순)
평균 대기시간 = 1.33
```

### Round Robin (quantum = 2)
```
0─2──3─5─7─9─11─13
P1│P2│P3│P1│P1│P1│P1│
... (계산 필요)
```

→ 면접에서는 **간트 차트 그리고 평균 대기/반환 시간 계산**이 자주 나옴.

---

## 7. 실제 OS의 스케줄러

### 7.1 Linux — CFS (Completely Fair Scheduler)
- 2.6.23 이후 기본 (2007년~)
- 각 프로세스에 **vruntime(가상 실행 시간)** 부여
- vruntime이 가장 작은 프로세스에 CPU 할당 → "지금까지 덜 받은 사람"부터
- **Red-Black Tree**로 vruntime 정렬 (O(log N))
- nice 값(`-20 ~ +19`)으로 가중치 조정 → vruntime 증가 속도 조절

**예시**
- 두 프로세스 A, B가 같은 가중치일 때 → 50:50 분할
- A의 nice가 더 낮으면 (우선순위↑) → A의 vruntime이 천천히 증가 → 더 자주 선택됨

> Linux 6.6부터 **EEVDF (Earliest Eligible Virtual Deadline First)** 스케줄러로 대체됨. 개념은 CFS와 유사.

### 7.2 Windows
- **Priority-based preemptive multilevel feedback queue**
- 32 단계 우선순위 (0=Idle, 31=실시간)
- I/O 후엔 우선순위 일시 상승 (Boost) → 대화형 응답성↑

### 7.3 macOS / iOS
- **Mach 기반의 우선순위 스케줄러**
- QoS (Quality of Service) 클래스: User Interactive, User Initiated, Default, Utility, Background
- 앱이 QoS만 지정하면 OS가 적절히 분배

### 7.4 실시간 스케줄링
- **Rate Monotonic (RM)**: 주기 짧을수록 우선순위 ↑ (정적)
- **EDF (Earliest Deadline First)**: 마감시한 빠를수록 우선순위 ↑ (동적, 이론상 최적)
- Linux: `SCHED_FIFO`, `SCHED_RR`, `SCHED_DEADLINE` 클래스

---

## 8. 멀티코어 스케줄링

### 8.1 로드 밸런싱
- CPU 코어마다 별도 Ready 큐
- 한 코어만 바쁘면 다른 코어로 작업 이동 (Push/Pull Migration)

### 8.2 프로세서 친화도 (Processor Affinity)
- 같은 코어에서 실행하면 **캐시 적중률 ↑**
- **Soft Affinity**: 가능하면 같은 코어
- **Hard Affinity**: 강제 (`sched_setaffinity()`)

### 8.3 NUMA (Non-Uniform Memory Access)
- 메모리가 코어 그룹별로 분산 → 가까운 메모리가 빠름
- 스케줄러가 NUMA 토폴로지 인식 필요

---

## 9. CPU 바운드 vs I/O 바운드

| 특성 | CPU 바운드 | I/O 바운드 |
|------|-----------|-----------|
| **CPU burst** | 길다 | 짧다 (I/O 대기 잦음) |
| **예** | 동영상 인코딩, 수치 계산 | 웹서버, DB 클라이언트 |
| **스케줄링 전략** | 처리량 우선 | 응답시간 우선 |
| **MLFQ에서** | 낮은 우선순위로 강등 | 최상위 유지 |

**좋은 스케줄러는 두 종류를 자동으로 구분**해 적절히 분배.

---

## 10. 면접 단골 질문

### Q1. 선점형과 비선점형의 차이는?
→ 비선점: 자발적 양보. 비교적 단순하지만 응답성↓
→ 선점: OS가 강제 회수. 응답성↑ but 컨텍스트 스위칭 비용↑

### Q2. SJF가 최적임에도 잘 안 쓰이는 이유는?
- **burst time을 미리 알 수 없다** → 예측해야 함
- 긴 작업 기아
- 실무는 RR이나 MLFQ 계열로 근사

### Q3. Round Robin의 타임 슬라이스를 너무 작게 하면?
- 컨텍스트 스위칭 오버헤드가 실제 작업 시간보다 커짐
- CPU 이용률↓, 처리량↓
- 일반적으로 컨텍스트 스위칭 비용의 100배 이상으로 설정

### Q4. Linux의 CFS는 어떻게 "공정"한가?
- 각 프로세스의 **누적 실행 시간(vruntime)**을 측정
- vruntime이 가장 작은 프로세스에 CPU 할당 → 모두에게 골고루
- nice 값으로 가중치 조정 가능

### Q5. 컨텍스트 스위칭 비용은 무엇으로 구성되나?
- 레지스터, PC 저장/복원
- 메모리 맵 교체 (프로세스 간일 때) → TLB 무효화 → 캐시 미스
- 커널 모드 전환 비용
- 일반적으로 수 μs ~ 수십 μs

### Q6. 우선순위 기반 스케줄러의 기아 문제 해결법은?
- **에이징 (Aging)**: 대기 시간에 비례해 우선순위 점진적 상승
- MLFQ: 일정 시간마다 모든 작업을 최상위 큐로 승격

### Q7. 멀티코어 환경에서 캐시 친화도가 왜 중요한가?
- 같은 코어에서 실행하면 L1/L2 캐시 재사용 가능
- 다른 코어로 이동하면 캐시 미스 → 메모리 접근 → 성능 ↓
- → Soft Affinity로 가능한 한 같은 코어 유지

---

## 11. 관련 주제

- [프로세스와 스레드](./process-and-thread.md)
- [동기화](./synchronization.md)
- [데드락](./deadlock.md)
- 컨텍스트 스위칭 상세 *(TBD)*
- 메모리 관리 (페이징, 세그멘테이션) *(TBD)*

---

## 참고

- *Operating System Concepts* (공룡책) — Silberschatz, Chapter 5
- *Operating Systems: Three Easy Pieces (OSTEP)* — Remzi, Ch. 7-10
- [Linux CFS Documentation](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)
- [Linux EEVDF Scheduler (LWN)](https://lwn.net/Articles/925371/)
- [Windows Internals — Thread Scheduling](https://learn.microsoft.com/en-us/windows/win32/procthread/scheduling-priorities)
