# 자료구조 (Data Structure)

본문 폴더: [01-computer-science/data-structure](../../01-computer-science/data-structure/)

---

## Q. Array, Dynamic Array, Linked List를 비교해서 설명하시오.

### 핵심 답안 (30초)
> _작성 예정 — 메모리 배치, 접근 시간, 삽입·삭제 비용, 크기 가변성 관점으로 비교._

### 꼬리 질문 후보
- 동적 배열의 amortized O(1) push가 가능한 이유는?
- 연결 리스트가 캐시 친화적이지 않은 이유는?
- 자바스크립트 Array는 진짜 배열인가, 객체인가?

---

## Q. Queue와 Stack을 비교하여 설명하시오.

### 핵심 답안 (30초)
> _LIFO vs FIFO. 사용 사례, 구현 방식(배열/연결리스트), 시간 복잡도._

### 꼬리 질문 후보
- 두 스택으로 큐를 구현할 수 있는가?
- Deque는 어떤 자료구조인가?

---

## Q. BST와 Hash Table을 비교해 설명하시오.

### 핵심 답안 (30초)
> _순서 보존 vs 해시 분산, 평균/최악 시간 복잡도, 메모리, 범위 검색 가능성._

### 꼬리 질문 후보
- 해시 충돌은 어떻게 해결하나? (체이닝 / 개방 주소법)
- 균형 BST(AVL, Red-Black)가 필요한 이유는?
- DB 인덱스에 B-Tree가 쓰이고 Hash가 잘 안 쓰이는 이유는?

---

## Q. Linked List(연결 리스트)에 대해 설명하시오.

### 핵심 답안 (30초)
> _노드 + 포인터 구조. 단일/이중/원형, 접근 O(n), 삽입·삭제 O(1)._

### 꼬리 질문 후보
- 이중 연결 리스트가 필요한 경우는?
- LRU 캐시 구현에 왜 연결 리스트가 등장하는가?

---

## Q. LRU 캐시에 대해 설명하시오.

### 핵심 답안 (30초)
> _Least Recently Used. HashMap + Doubly Linked List로 O(1) get/put._

### 꼬리 질문 후보
- LFU와의 차이는?
- Redis의 maxmemory-policy에는 어떤 것들이 있나?
