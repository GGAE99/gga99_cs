# 자료구조 (Data Structure)

본문 폴더: [01-computer-science/data-structure](../../01-computer-science/data-structure/)

---

## Q. Array, Dynamic Array, Linked List를 비교해서 설명하시오.

??? note "정답 보기 ▼"
    - [x] 메모리 연속성·접근 O(1) vs O(n)·삽입/삭제 비용·크기 가변성에서 차이 (Array: 고정 / Dynamic Array: amortized 확장 / Linked List: 노드+포인터)
    - [ ] Dynamic Array는 push 시 2배씩 재할당하므로 평균 O(1)이지만 최악 O(n), Linked List는 head 삽입만 O(1)·중간 삽입은 탐색 비용 포함
    - [ ] Array는 인덱스를 base + offset 곱셈으로 계산하므로 캐시 친화적이고, Linked List는 포인터 추적이라 캐시 미스가 잦음
    - [ ] Deque는 양 끝에서의 push/pop이 O(1)이고 중간 접근은 불가능한 추상 자료구조로, Dynamic Array와 Linked List 양쪽으로 구현 가능

### 핵심 답안 (30초)
> _작성 예정 — 메모리 배치, 접근 시간, 삽입·삭제 비용, 크기 가변성 관점으로 비교._

### 꼬리 질문 후보
- 동적 배열의 amortized O(1) push가 가능한 이유는?
- 연결 리스트가 캐시 친화적이지 않은 이유는?
- 자바스크립트 Array는 진짜 배열인가, 객체인가?

---

## Q. Queue와 Stack을 비교하여 설명하시오.

??? note "정답 보기 ▼"
    - [x] Stack은 LIFO(후입선출), Queue는 FIFO(선입선출) — 둘 다 push/pop은 O(1)
    - [ ] Deque는 양 끝에서의 삽입·삭제가 모두 O(1)인 양방향 큐로, Stack과 Queue의 동작을 동시에 제공할 수 있는 일반화 구조
    - [ ] Priority Queue는 우선순위가 가장 높은 원소가 먼저 나오는 큐로, 보통 힙(heap)으로 구현되어 삽입·삭제가 O(log n)
    - [ ] Circular Queue는 배열을 환형으로 사용해 enqueue/dequeue 시 인덱스만 이동시켜 메모리 재사용을 극대화한 큐

### 핵심 답안 (30초)
> _LIFO vs FIFO. 사용 사례, 구현 방식(배열/연결리스트), 시간 복잡도._

### 꼬리 질문 후보
- 두 스택으로 큐를 구현할 수 있는가?
- Deque는 어떤 자료구조인가?

---

## Q. BST와 Hash Table을 비교해 설명하시오.

??? note "정답 보기 ▼"
    - [x] BST는 순서 보존·범위 검색 가능·평균 O(log n), Hash는 순서 없음·평균 O(1)·최악 O(n)
    - [ ] Hash 충돌은 체이닝(같은 버킷에 연결 리스트)과 개방 주소법(선형/제곱/이중 해싱)으로 처리하며 부하 인자에 따라 리해싱이 필요
    - [ ] Trie는 문자열을 문자 단위로 분기하는 트리로 prefix 검색에 강하지만 메모리 사용량이 BST·Hash보다 큰 경향이 있음
    - [ ] DB 인덱스에 B-Tree가 쓰이고 Hash가 잘 안 쓰이는 이유는 범위 스캔과 정렬된 순회 지원이 인덱스 워크로드에 더 중요하기 때문

### 핵심 답안 (30초)
> _순서 보존 vs 해시 분산, 평균/최악 시간 복잡도, 메모리, 범위 검색 가능성._

### 꼬리 질문 후보
- 해시 충돌은 어떻게 해결하나? (체이닝 / 개방 주소법)
- 균형 BST(AVL, Red-Black)가 필요한 이유는?
- DB 인덱스에 B-Tree가 쓰이고 Hash가 잘 안 쓰이는 이유는?

---

## Q. Linked List(연결 리스트)에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 노드 + 포인터 구조 — 단일/이중/원형 형태. 접근 O(n), 삽입·삭제는 노드 참조가 있으면 O(1)
    - [ ] 이중 연결 리스트는 prev·next 포인터를 모두 갖고 있어 양방향 순회가 가능하고 LRU 캐시 구현의 표준 자료구조
    - [ ] 원형 연결 리스트는 마지막 노드가 처음 노드를 가리켜 순환 구조를 이루며 라운드 로빈 스케줄링 등에 활용됨
    - [ ] 연결 리스트는 노드를 힙에 분산 할당하므로 포인터 추적 시 캐시 미스가 잦아 Array보다 캐시 친화도가 떨어짐

### 핵심 답안 (30초)
> _노드 + 포인터 구조. 단일/이중/원형, 접근 O(n), 삽입·삭제 O(1)._

### 꼬리 질문 후보
- 이중 연결 리스트가 필요한 경우는?
- LRU 캐시 구현에 왜 연결 리스트가 등장하는가?

---

## Q. LRU 캐시에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Least Recently Used — HashMap + Doubly Linked List 조합으로 O(1) get/put 구현
    - [ ] LFU(Least Frequently Used)는 참조 횟수가 가장 적은 항목을 제거하는 정책으로 짧은 burst 트래픽에 취약함
    - [ ] FIFO 캐시는 가장 먼저 들어온 항목을 제거하므로 구현은 단순하지만 최근성을 반영하지 못해 hit rate가 떨어짐
    - [ ] Redis의 `maxmemory-policy`에는 `allkeys-lru`, `volatile-lru`, `allkeys-lfu`, `allkeys-random` 등이 있고 워크로드에 맞게 선택

### 핵심 답안 (30초)
> _Least Recently Used. HashMap + Doubly Linked List로 O(1) get/put._

### 꼬리 질문 후보
- LFU와의 차이는?
- Redis의 maxmemory-policy에는 어떤 것들이 있나?
