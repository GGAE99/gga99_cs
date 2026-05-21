# Layer 5. AI & Data (선택)

> 직접 모델을 만들지 않더라도, **"무엇이 가능하고 무엇이 어려운지"** 는 알아둘 영역.

## 학습 목표

- ML의 기본 개념(지도/비지도/강화학습, 학습/추론)을 정확히
- LLM이 동작하는 방식과 한계
- 빅데이터 처리의 표준 패턴(배치 / 스트리밍)
- 추천 시스템의 기본 접근법

## 학습 순서

```
ml-llm-basics (개념 잡기)
    ↓
big-data (데이터 처리 인프라)
    ↓
recommendation-system (응용 사례)
```

## 섹션 안내

### [ml-llm-basics.md](./ml-llm-basics.md)
**핵심 토픽**: 지도/비지도/강화학습, 과적합/일반화, 평가 지표(Precision/Recall/F1), 신경망 기초, Transformer, Tokenization, Context Window, RAG, 프롬프트 엔지니어링
**Why**: LLM은 더 이상 ML 엔지니어만의 영역이 아님.

### [big-data.md](./big-data.md)
**핵심 토픽**: Batch vs Streaming, Lambda/Kappa Architecture, Hadoop/Spark, Kafka Streams, 데이터 레이크/웨어하우스/레이크하우스, OLAP vs OLTP
**Why**: 데이터가 일정 규모를 넘으면 RDB만으로는 한계.

### [recommendation-system.md](./recommendation-system.md)
**핵심 토픽**: Content-Based / Collaborative Filtering / Hybrid, 임베딩, 콜드 스타트, A/B 테스트, 평가 지표(NDCG, Hit Rate)
**Why**: 가장 흔히 마주치는 ML 응용 분야.

## 추천 자료

- 『핸즈온 머신러닝』 (Aurélien Géron)
- 『빅데이터를 지탱하는 기술』
- [Hugging Face Course](https://huggingface.co/learn/nlp-course)
- [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) (Chip Huyen)
- [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy) — 깊은 수준의 무료 강의
