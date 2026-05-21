# 데이터베이스 (Database)

본문 폴더: [01-computer-science/database](../../01-computer-science/database/)

---

## Q. 트랜잭션에 대해 간략하게 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _하나의 논리적 작업 단위. ACID 속성(원자성·일관성·격리성·지속성) 보장._

### 꼬리 질문 후보
- 격리 수준(Read Uncommitted ~ Serializable) 4가지의 차이는?
- 분산 트랜잭션은 어떻게 처리하나? (2PC, SAGA)

---

## Q. SQL과 NoSQL의 차이점을 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _SQL: 정형 스키마·관계·강한 일관성. NoSQL: 유연한 스키마·수평 확장·다양한 모델(Doc/KV/Column/Graph)._

### 꼬리 질문 후보
- CAP 정리 관점에서 SQL/NoSQL은 어디에 위치하나?
- 어떤 워크로드에 어떤 DB가 적합한가?

---

## Q. RDB와 NoSQL의 차이를 설명하시오.

- **상태**: `[NEW]`

### 핵심 답안 (30초)
> _스키마 유연성, JOIN 가능 여부, 확장 방식(수직/수평), 일관성 모델._

### 꼬리 질문 후보
- MongoDB의 트랜잭션은 RDB와 어떻게 다른가?
- Polyglot Persistence란?
