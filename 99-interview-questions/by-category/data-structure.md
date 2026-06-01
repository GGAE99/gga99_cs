# 자료구조 (Data Structure)

본문 폴더: [01-computer-science/data-structure](../../01-computer-science/data-structure/)

---

## Q. Array, Dynamic Array, Linked List를 비교해서 설명하시오.

??? note "정답 보기 ▼"
    - [x] 메모리 연속성·접근 O(1) vs O(n)·삽입/삭제 비용·크기 가변성에서 차이 (Array: 고정 / Dynamic Array: amortized 확장 / Linked List: 노드+포인터)
    - [ ] 세 자료구조 모두 무작위 접근 O(1)이며 차이는 메모리 사용량뿐
    - [ ] Linked List가 Dynamic Array보다 캐시 친화적이고 더 빠르다
    - [ ] Array는 가변 크기이고 Dynamic Array는 고정 크기다

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
    - [ ] Stack은 FIFO, Queue는 LIFO 구조
    - [ ] 둘 다 무작위 접근(인덱스)이 O(1)이며 차이는 메모리 위치뿐
    - [ ] Stack은 정렬을 보장하고 Queue는 정렬을 보장하지 않는다

### 핵심 답안 (30초)
> _LIFO vs FIFO. 사용 사례, 구현 방식(배열/연결리스트), 시간 복잡도._

### 꼬리 질문 후보
- 두 스택으로 큐를 구현할 수 있는가?
- Deque는 어떤 자료구조인가?

---

## Q. BST와 Hash Table을 비교해 설명하시오.

??? note "정답 보기 ▼"
    - [x] BST는 순서 보존·범위 검색 가능·평균 O(log n), Hash는 순서 없음·평균 O(1)·최악 O(n)
    - [ ] BST는 O(1) 평균 시간 복잡도이고 Hash는 O(log n)이다
    - [ ] Hash는 키의 순서대로 순회가 가능하고 BST는 불가능하다
    - [ ] BST는 충돌 처리가 필요하고 Hash는 충돌이 발생하지 않는다

### 핵심 답안 (30초)
> _순서 보존 vs 해시 분산, 평균/최악 시간 복잡도, 메모리, 범위 검색 가능성._

### 꼬리 질문 후보
- 해시 충돌은 어떻게 해결하나? (체이닝 / 개방 주소법)
- 균형 BST(AVL, Red-Black)가 필요한 이유는?
- DB 인덱스에 B-Tree가 쓰이고 Hash가 잘 안 쓰이는 이유는?

---

## Q. Linked List(연결 리스트)에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 노드 + 포인터 구조 — 단일/이중/원형 형태. 접근 O(n), 삽입·삭제 O(1)
    - [ ] 메모리에 연속 저장되는 자료구조로, 무작위 접근이 O(1)이다
    - [ ] 항상 정렬된 상태를 유지하며 이진 탐색이 가능한 구조
    - [ ] 해시 함수로 인덱스를 계산하는 자료구조

### 핵심 답안 (30초)
> _노드 + 포인터 구조. 단일/이중/원형, 접근 O(n), 삽입·삭제 O(1)._

### 꼬리 질문 후보
- 이중 연결 리스트가 필요한 경우는?
- LRU 캐시 구현에 왜 연결 리스트가 등장하는가?

---

## Q. LRU 캐시에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Least Recently Used — HashMap + Doubly Linked List 조합으로 O(1) get/put 구현
    - [ ] Least Frequently Used — 참조 횟수가 가장 적은 항목을 제거하는 정책
    - [ ] FIFO 큐 한 개만으로 구현되며 평균 시간 복잡도는 O(n)이다
    - [ ] 모든 항목을 정렬된 트리에 저장하고 최저 우선순위 항목을 제거하는 방식

### 핵심 답안 (30초)
> _Least Recently Used. HashMap + Doubly Linked List로 O(1) get/put._

### 꼬리 질문 후보
- LFU와의 차이는?
- Redis의 maxmemory-policy에는 어떤 것들이 있나?
