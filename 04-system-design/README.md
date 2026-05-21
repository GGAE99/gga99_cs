# Layer 3-2. System Design

> "동작하는 시스템"과 "**살아남는 시스템**"의 차이.

## 학습 목표

- 트래픽·데이터 규모가 커질 때 발생하는 문제와 해법을 안다
- 분산 시스템의 **본질적 한계(CAP, FLP)** 와 그 우회법
- 시스템 디자인 면접에서 **요구사항 → 추정 → 설계 → 트레이드오프** 흐름

## 학습 순서

```
scalability (확장의 기본)
    ↓
distributed-systems (분산의 본질과 한계)
    ↓
microservices (MSA의 약속과 비용)
    ↓
design-patterns (시스템 패턴)
    ↓
case-study (실제 시스템 설계 연습)
```

## 섹션 안내

### [scalability.md](./scalability.md)
**핵심 토픽**: 수직 확장 vs 수평 확장, 로드 밸런싱(L4/L7), Stateless 설계, DB 샤딩·복제, CDN, 캐싱 계층
**Why**: "사용자 100명 시스템"과 "1억 명 시스템"의 차이를 만드는 첫 단추.

### [microservices.md](./microservices.md)
**핵심 토픽**: 모놀리스 vs MSA, 서비스 분리 기준, 서비스 간 통신(동기/비동기), API Gateway, Service Mesh, MSA의 비용(운영/일관성)
**Why**: MSA는 만능이 아니다 — 언제 도입하고 언제 피해야 하는지.

### [distributed-systems.md](./distributed-systems.md)
**핵심 토픽**: CAP 정리, 일관성 모델(Strong / Eventual / Causal), 분산 트랜잭션(2PC, SAGA), 분산 락, 합의 알고리즘(Raft/Paxos), 멱등성
**Why**: 모든 대규모 시스템이 마주하는 근본 제약.

### [design-patterns.md](./design-patterns.md)
**핵심 토픽**: Circuit Breaker, Bulkhead, Retry + Backoff, CQRS, Event Sourcing, Outbox, Strangler Fig
**Why**: GoF 패턴 위 계층 — 시스템 레벨의 재사용 가능한 해법.

### [case-study/](./case-study/)
**핵심 토픽**: URL 단축기, 채팅 시스템, 뉴스 피드, 실시간 검색, 알림 시스템, 동영상 스트리밍
**Why**: 면접/실무 모두에서 가장 자주 등장. 글로 정리하면 사고가 정돈됨.

## 시스템 설계 면접 프레임워크

1. **요구사항 명확화** — 기능/비기능, 제약 조건
2. **규모 추정** — DAU, QPS, 저장 용량, 대역폭
3. **High-Level 설계** — 주요 컴포넌트와 데이터 흐름
4. **데이터 모델 / 핵심 API** — 스키마와 인터페이스
5. **상세 설계** — 병목 지점, 캐시 전략, 샤딩 키
6. **트레이드오프 / 확장 시나리오** — 무엇을 포기했는가

## 추천 자료

- 『가상 면접 사례로 배우는 대규모 시스템 설계 기초』 1, 2 (Alex Xu) — 입문 필수
- 『Designing Data-Intensive Applications』 (Martin Kleppmann)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [ByteByteGo Newsletter](https://blog.bytebytego.com/)
- [High Scalability](http://highscalability.com/)
