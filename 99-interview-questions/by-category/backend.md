# 백엔드 (Backend)

본문 폴더: [03-backend](../../03-backend/)

---

## Q. REST API에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] 리소스 중심·HTTP 메서드 활용·Stateless·표현 계층 분리 — Roy Fielding이 정의한 아키텍처 스타일
    - [ ] 함수 호출 단위의 단일 엔드포인트(/rpc)에 메서드명과 인자를 본문으로 보내는 호출 지향 통신 스타일인 RPC
    - [ ] 클라이언트가 필요한 필드를 쿼리 언어로 요청해 over-fetching/under-fetching을 줄이는 API 쿼리 언어인 GraphQL
    - [ ] 양방향 풀 듀플렉스 채널을 열어두고 서버가 능동적으로 메시지를 푸시할 수 있는 WebSocket 기반 실시간 통신

### 핵심 답안 (30초)
> _리소스 중심, HTTP 메서드 활용, Stateless, 표현 계층 분리. Roy Fielding의 아키텍처 스타일._

### 꼬리 질문 후보
- REST의 6가지 제약 조건은?
- HATEOAS란? 실무에서 잘 안 쓰이는 이유는?

---

## Q. REST API 설계 시 주의할 점을 설명하시오.

??? note "정답 보기 ▼"
    - [x] 리소스 명사형 URL, 일관된 메서드, 적절한 상태 코드, 버저닝, 페이지네이션, 멱등성 고려
    - [ ] 응답 구조에 self/next/prev 같은 하이퍼링크를 포함시켜 클라이언트가 다음 동작을 발견하도록 만드는 HATEOAS 적용
    - [ ] 4xx/5xx 응답에 RFC 7807 Problem Details 포맷으로 type·title·detail을 담아 표준화된 에러 표현을 제공
    - [ ] 응답 헤더에 ETag/Last-Modified를 실어 조건부 요청(If-None-Match)으로 304를 반환해 대역폭을 절약

### 핵심 답안 (30초)
> _리소스 명사형 URL, 일관된 메서드 사용, 적절한 상태 코드, 버저닝, 페이지네이션, 멱등성._

### 꼬리 질문 후보
- POST와 PUT의 차이를 멱등성 관점에서 설명하면?
- 400과 422는 어떻게 다른가?

---

## Q. 쿠키와 세션을 왜 사용하는가?

??? note "정답 보기 ▼"
    - [x] HTTP가 Stateless이기 때문에 사용자 상태 유지를 위해 쿠키(클라이언트 저장) + 세션(서버 저장)으로 보완
    - [ ] 쿠키의 HttpOnly·Secure·SameSite 속성으로 XSS·CSRF 같은 클라이언트 측 공격 표면을 줄이기 위한 보안 메커니즘
    - [ ] 여러 서버 간 세션을 공유하기 위해 Redis 같은 중앙 저장소에 보관하는 분산 세션(sticky session 대안) 구성
    - [ ] 클라이언트의 후속 요청에 자동으로 동일한 식별자를 실어 보내, 멱등 키처럼 중복 처리 방지에 활용하기 위한 도구

### 핵심 답안 (30초)
> _HTTP는 Stateless. 사용자 상태 유지를 위해 쿠키(클라이언트 저장) + 세션(서버 저장)으로 보완._

### 꼬리 질문 후보
- HttpOnly, Secure, SameSite 속성의 역할은?
- 세션을 여러 서버에서 공유하려면 어떻게 하나?

---

## Q. JWT는 무엇이고 어떻게 사용되는가?

??? note "정답 보기 ▼"
    - [x] Header.Payload.Signature 구조의 서명된 자기 완결형 토큰. Stateless 인증에 활용
    - [ ] 사용자가 인증 동의를 한 뒤 클라이언트가 토큰을 교환할 때 사용하는 일회성 코드인 OAuth 2.0 Authorization Code
    - [ ] 인증 서버가 발급한 OpenID Connect의 id_token으로, OAuth 위에서 사용자 식별 정보를 표준 클레임으로 담은 토큰
    - [ ] 액세스 토큰 만료 후 새 토큰을 재발급받기 위해 별도로 보관·회전되는 장기 유효 토큰인 Refresh Token

### 핵심 답안 (30초)
> _JSON Web Token. Header.Payload.Signature. 서명된 자기 완결형 토큰. Stateless 인증에 활용._

### 꼬리 질문 후보
- JWT는 어디에 저장해야 하나? (localStorage vs Cookie)
- 토큰 탈취 시 어떻게 무효화하나?

---

## Q. 세션과 JWT의 차이점은 무엇인가?

??? note "정답 보기 ▼"
    - [x] 세션은 서버가 상태를 보관해 즉시 무효화 가능, JWT는 서버 무상태로 확장이 쉽지만 즉시 무효화가 어려움
    - [ ] 세션은 만료 시점이 서버 정책으로 통제되고, JWT는 발급 시 정해진 exp 클레임을 토큰 자체가 들고 다닌다
    - [ ] 세션은 SameSite·HttpOnly 쿠키로 보호하고, JWT는 보통 Authorization 헤더로 전달되어 XSS 노출 면이 다르다
    - [ ] 세션은 수평 확장 시 sticky session/공용 저장소가 필요하고, JWT는 검증만 하면 되어 다중 서버에서 자유롭다

### 핵심 답안 (30초)
> _세션: 서버 상태 보관, 무효화 즉시. JWT: 서버 무상태, 확장 용이하지만 즉시 무효화 어려움._

### 꼬리 질문 후보
- 리프레시 토큰 회전(rotation)이란?
- 마이크로서비스에서 JWT가 선호되는 이유는?

---

## Q. BFF(Backend For Frontend)란 무엇인가?

??? note "정답 보기 ▼"
    - [x] 클라이언트 종류(웹/모바일 등)별로 전용 백엔드를 두어 응답 가공·집계·UI 친화적 API를 제공하는 패턴
    - [ ] 클라이언트와 백엔드 사이에서 인증·라우팅·rate limit 같은 횡단 관심사를 처리하는 단일 진입점인 API Gateway
    - [ ] 여러 마이크로서비스 호출을 하나의 그래프 질의로 묶어 over-fetching을 줄여 주는 GraphQL Federation 게이트웨이
    - [ ] 백엔드 변경에도 클라이언트 영향이 없도록 응답 스키마를 안정화하는 Anti-Corruption Layer 패턴

### 핵심 답안 (30초)
> _클라이언트 종류별로 전용 백엔드를 두는 패턴. 응답 가공·집계·UI 친화적 API._

### 꼬리 질문 후보
- API Gateway와 BFF는 어떻게 다른가?
- BFF의 단점은?

---

## Q. 톰캣(Tomcat)에 대해 설명하시오.

??? note "정답 보기 ▼"
    - [x] Servlet/JSP 실행 환경을 제공하는 Servlet 컨테이너이며 Spring Boot의 내장 기본 WAS
    - [ ] 비동기 논블로킹 I/O에 특화된 풀 스택 자바 WAS로, Spring WebFlux와 함께 자주 쓰이는 Netty 기반 런타임
    - [ ] EJB·JTA·JMS 등 Jakarta EE 스펙 전반을 구현해 엔터프라이즈 풀 프로파일을 제공하는 WildFly·Payara 같은 애플리케이션 서버
    - [ ] 정적 자원과 리버스 프록시·로드 밸런싱을 처리하며 WAS 앞단에서 동작하는 이벤트 기반 웹 서버인 Nginx

### 핵심 답안 (30초)
> _Servlet 컨테이너. JSP/Servlet 실행 환경. Spring Boot 내장 기본 WAS._

### 꼬리 질문 후보
- WAS와 웹 서버의 차이는?
- 톰캣의 NIO Connector와 BIO Connector의 차이는?

---

## Q. 서버리스란 무엇인가?

??? note "정답 보기 ▼"
    - [x] 서버 관리를 추상화한 실행 모델 — FaaS(Lambda 등) + BaaS, 사용량 기반 과금
    - [ ] 함수 단위가 아닌 컨테이너 이미지를 트래픽에 맞춰 자동으로 0까지 스케일다운하는 Knative·Cloud Run 류의 서버리스 컨테이너
    - [ ] 데이터베이스·인증·스토리지 같은 백엔드 기능을 매니지드 서비스로 제공해 클라이언트가 직접 호출하는 BaaS(Firebase 등)
    - [ ] 워크로드 급증 시 노드 풀을 자동으로 늘리는 Cluster Autoscaler 기반 Kubernetes 운영 패턴인 Auto-scaling 그룹

### 핵심 답안 (30초)
> _서버 관리를 추상화한 실행 모델. FaaS(Lambda 등) + BaaS. 사용량 기반 과금._

### 꼬리 질문 후보
- 콜드 스타트는 무엇이고 어떻게 완화하나?
- 서버리스가 부적합한 워크로드는?
