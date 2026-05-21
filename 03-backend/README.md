# Layer 3-1. Backend

> 서버는 "요청을 받아 응답한다"가 전부지만, **그 사이가 전부**다.

## 학습 목표

- 프레임워크가 **숨기는 것**과 **드러내는 것**을 구분
- API 설계의 트레이드오프 (REST vs GraphQL vs gRPC) 판단 능력
- 인증·캐싱·메시징의 표준 패턴과 그 한계

## 학습 순서

```
framework (1개 프레임워크 깊이 + 다른 1개 비교)
    ↓
api-design (REST 먼저 → GraphQL/gRPC 차이)
    ↓
auth (세션/쿠키 → JWT → OAuth)
    ↓
caching (로컬 캐시 → Redis → 캐싱 전략)
    ↓
messaging (Pub/Sub → Kafka의 차별점)
```

## 섹션 안내

### [framework/](./framework/)
**핵심 토픽**: Spring(IoC/DI/AOP), Spring Boot, JPA(영속성 컨텍스트, N+1), Node.js(Express/NestJS), Django ORM
**Why**: 프레임워크의 마법을 걷어내고 "그래서 내부에서 무슨 일이?"를 설명할 수 있어야 함.

### [api-design/](./api-design/)
**핵심 토픽**: REST 원칙, 리소스 모델링, HTTP 메서드/상태 코드, GraphQL 스키마/리졸버, gRPC와 Protobuf, API 버저닝, BFF 패턴
**Why**: API는 시스템의 계약. 잘못 설계하면 영원히 끌고 감.

### [auth/](./auth/)
**핵심 토픽**: 인증 vs 인가, 세션/쿠키, JWT(서명/만료/리프레시), OAuth 2.0 / OIDC, SSO, MFA
**Why**: 보안의 첫 관문. 작은 실수가 전체 시스템을 위태롭게 함.

### [caching/](./caching/)
**핵심 토픽**: 캐시 계층(브라우저/CDN/서버/DB), Redis vs Memcached, LRU/LFU, 캐싱 전략(Look-Aside, Write-Through, Write-Back), 캐시 무효화
**Why**: "캐시 무효화는 컴퓨터 과학의 두 가지 어려운 문제 중 하나."

### [messaging/](./messaging/)
**핵심 토픽**: Pub/Sub vs Message Queue, Kafka(파티션/오프셋/컨슈머 그룹), RabbitMQ, At-most-once / At-least-once / Exactly-once, Outbox 패턴
**Why**: 비동기 처리·이벤트 드리븐 아키텍처의 핵심 부품.

## 정리 템플릿

1. **풀려는 문제**: 왜 이 기술/패턴이 필요한가
2. **동작 원리**: 한 단계 아래에서 어떻게 돌아가는가
3. **트레이드오프**: 무엇을 얻고 무엇을 잃는가
4. **실무 함정**: 자주 발생하는 사고 사례
5. **대안**: 비슷한 문제를 푸는 다른 방법

## 추천 자료

- 『토비의 스프링』, 『자바 ORM 표준 JPA 프로그래밍』 (Spring 계열)
- 『가상 면접 사례로 배우는 대규모 시스템 설계 기초』 (Alex Xu)
- 『Designing Data-Intensive Applications』 (Martin Kleppmann) — 백엔드의 바이블
- [High Scalability](http://highscalability.com/), [AWS Architecture Center](https://aws.amazon.com/architecture/)
