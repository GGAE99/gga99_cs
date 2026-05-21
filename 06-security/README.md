# Layer 3-4. Security

> "**기본을 안 지키는 것**"이 대부분의 사고 원인.

## 학습 목표

- OWASP Top 10의 각 항목을 코드 레벨로 설명·방어 가능
- 대칭/공개키 암호와 TLS의 동작 흐름
- 인증/인가의 표준 흐름과 자주 발생하는 실수

## 학습 순서

```
web-security (가장 자주 마주치는 영역)
    ↓
crypto (암호의 원리)
    ↓
auth-deep-dive (인증/인가 심화)
```

## 섹션 안내

### [web-security.md](./web-security.md)
**핵심 토픽**: OWASP Top 10, XSS(Reflected/Stored/DOM), CSRF, SQL Injection, SSRF, IDOR, 안전한 헤더(CSP, HSTS, X-Frame-Options), 입력 검증·출력 인코딩
**Why**: 웹 개발자가 직접 막아야 하는 영역. 프레임워크가 다 해주지 않음.

### [crypto.md](./crypto.md)
**핵심 토픽**: 대칭키(AES) vs 공개키(RSA/ECC), 해시(SHA-256, bcrypt/argon2), 디지털 서명, TLS/SSL handshake, PKI, 인증서 체인
**Why**: HTTPS·JWT·OAuth 어디든 깔려 있는 기초.

### [auth-deep-dive.md](./auth-deep-dive.md)
**핵심 토픽**: 세션 vs JWT 트레이드오프, OAuth 2.0 (Authorization Code + PKCE), OIDC, 리프레시 토큰 회전, 토큰 저장 위치(쿠키/스토리지), CSRF + JWT
**Why**: 인증은 ["JWT만 쓰면 되죠?"](https://www.google.com/search?q=stop+using+jwt+for+sessions)에서 끝나는 영역이 아님.

## 정리 템플릿

각 취약점은 다음 4단계로:

1. **공격 시나리오** — 어떻게 뚫리는가 (PoC)
2. **근본 원인** — 왜 가능한가
3. **방어 방법** — 코드/설정 레벨 대응
4. **사례** — 실제 인시던트(있다면)

## 추천 자료

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- 『The Web Application Hacker's Handbook』
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — 무료 실습 최강
