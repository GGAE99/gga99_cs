# Layer 3-3. DevOps & Infrastructure

> "내 노트북에선 잘 돌던데요?"에서 벗어나는 영역.

## 학습 목표

- 코드가 **개발 → 빌드 → 배포 → 운영 → 관측**되는 전체 파이프라인 이해
- 컨테이너·오케스트레이션의 원리 (단순 사용법이 아니라)
- 클라우드 핵심 구성요소(컴퓨팅/스토리지/네트워크/IAM)의 추상

## 학습 순서

```
linux (모든 것의 기반)
    ↓
docker (불변 인프라의 시작)
    ↓
cicd (자동화)
    ↓
kubernetes (오케스트레이션) ──┐
                             ├──→ aws (실전 인프라)
monitoring (관측 가능성) ──────┘
```

## 섹션 안내

### [linux.md](./linux.md)
**핵심 토픽**: 프로세스 모델, 파일 시스템, 시그널, 권한, 셸 스크립트, 자주 쓰는 명령어(top/htop, ps, netstat/ss, lsof, strace, tcpdump)
**Why**: 서버는 거의 다 Linux. 컨테이너 안도 Linux.

### [docker.md](./docker.md)
**핵심 토픽**: 이미지 vs 컨테이너, Layer/Union FS, Namespace + cgroup, Dockerfile 베스트 프랙티스, 멀티 스테이지 빌드, 네트워킹, 볼륨
**Why**: "내 컴퓨터에선 돌아요" 문제의 종결자. 동작 원리를 알면 디버깅이 쉬워짐.

### [kubernetes.md](./kubernetes.md)
**핵심 토픽**: Pod/Deployment/Service/Ingress, ConfigMap/Secret, 스케줄링, HPA, Helm, Operator 패턴
**Why**: 컨테이너 한 개와 1000개의 운영은 다른 일.

### [aws/](./aws/)
**핵심 토픽**: IAM (제일 먼저), VPC/Subnet, EC2, S3, RDS/Aurora, Lambda, CloudWatch, ECS/EKS, Route 53
**Why**: 클라우드 점유율 1위. 다른 클라우드도 개념은 유사.

### [cicd.md](./cicd.md)
**핵심 토픽**: CI vs CD vs Continuous Deployment, GitHub Actions/Jenkins/ArgoCD, 빌드 캐시, 시크릿 관리, Blue-Green / Canary / Rolling
**Why**: 배포가 무서워지면 안 됨. 자주 작게 배포.

### [monitoring.md](./monitoring.md)
**핵심 토픽**: 3 Pillars (Logs / Metrics / Traces), Prometheus + Grafana, ELK, OpenTelemetry, SLI/SLO/SLA, 알림 피로 방지
**Why**: 측정할 수 없으면 개선할 수 없다.

## 정리 템플릿

각 도구는 "사용법"보다 "**왜 등장했고, 무엇을 추상화하는가**"부터.

1. 이 도구가 없으면 어떻게 했어야 했나
2. 어떤 추상을 제공하는가
3. 그 추상이 깨지는 지점은 어디인가 (= 어디까지 알아야 하는가)

## 추천 자료

- 『시스템 성능 분석과 최적화』 (Brendan Gregg)
- 『도커 교과서』, 『쿠버네티스 패턴』
- 『Site Reliability Engineering』 (Google) — [무료 공개](https://sre.google/books/)
- [12-Factor App](https://12factor.net/) — 클라우드 네이티브의 출발점
