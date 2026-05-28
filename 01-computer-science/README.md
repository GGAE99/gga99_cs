# Layer 1. Computer Science 기초

> **모든 개발자의 공통 기반.**

## 학습 목표

- "왜?"에 답할 수 있는 근본 원리 이해
- 새로운 기술을 만나도 빠르게 흡수할 수 있는 사고 틀 형성
- 면접에서 깊이 있는 답변이 가능해지는 수준

## 학습 순서 (권장)

```
1) data-structure   →  2) algorithm
                              ↓
3) computer-architecture  →  4) operating-system
                              ↓
                          5) network  →  6) database
                              ↓
                  7) software-engineering  →  8) theory (선택)
```

## 섹션 안내

### [data-structure/](./data-structure/) — 자료구조
**핵심 토픽**: Array, LinkedList, Stack, Queue, Tree(BST/AVL/Red-Black), Graph, Hash Table, Heap, Trie, B-Tree
**Why**: 모든 알고리즘과 시스템의 기초. DB 인덱스(B-Tree), Redis(Hash), 라우팅(Trie)까지 연결됨.

### [algorithm/](./algorithm/) — 알고리즘
**핵심 토픽**: 정렬, 탐색, 분할정복, DP, 그리디, 백트래킹, DFS/BFS, 다익스트라, 시간/공간 복잡도
**Why**: 코딩 테스트뿐 아니라 시스템 설계 시 trade-off 판단의 근거.

### [computer-architecture/](./computer-architecture/) — 컴퓨터 구조
**핵심 토픽**: CPU 파이프라인, 캐시 계층, 메모리 계층 구조, 폰 노이만 구조, 2의 보수, 부동소수점, 인터럽트
**Why**: "왜 캐시 친화적 코드가 빠른가?", "왜 0.1 + 0.2 ≠ 0.3인가?"에 답할 수 있음.

### [operating-system/](./operating-system/) — 운영체제
**핵심 토픽**: 프로세스 vs 스레드, 스케줄링, 컨텍스트 스위칭, 메모리 관리(페이징/세그멘테이션), 동기화(Mutex/Semaphore), 데드락, 파일 시스템
**Why**: 동시성 버그, 메모리 누수, 성능 튜닝의 본질을 이해.

### [network/](./network/) — 네트워크
**핵심 토픽**: OSI 7계층, TCP vs UDP, 3-way handshake, HTTP/HTTPS, DNS, 라우팅, 흐름 제어 vs 혼잡 제어, 로드 밸런싱
**Why**: 웹/모바일/백엔드 어디든 등장. CORS, 캐시, CDN 등의 뿌리.

### [database/](./database/) — 데이터베이스
**핵심 토픽**: RDB vs NoSQL, 정규화, 트랜잭션 ACID, 격리 수준, 인덱스 동작 원리, 락, 샤딩, 복제
**Why**: 실무 90%의 성능 문제는 DB에서 발생.

### [software-engineering/](./software-engineering/) — 소프트웨어 공학
**핵심 토픽**: OOP 4대 원칙, SOLID, GoF 디자인 패턴, TDD, 클린 코드, 애자일, MSA vs Monolith
**Why**: 협업과 유지보수 가능한 코드를 짜는 기준.

### [theory/](./theory/) — 이론 (선택/심화)
**핵심 토픽**: 오토마타, 형식 언어, 컴파일러, 계산 이론, 이산수학
**Why**: 정규식·파서·언어 설계의 근간. 깊이 있는 개발자가 되고 싶다면.

## 추천 자료

- **책**: 『운영체제 — 공룡책』, 『컴퓨터 네트워킹 — 하향식 접근』, 『알고리즘 — CLRS』, 『Database System Concepts』
- **강의**: CS50, MIT OCW 6.006(Algorithms), Coursera Operating Systems
- **온라인**: [GeeksforGeeks](https://www.geeksforgeeks.org/), [Computer Science from the Bottom Up](https://www.bottomupcs.com/)
