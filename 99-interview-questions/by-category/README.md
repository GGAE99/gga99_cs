# 카테고리별 면접 질문

각 파일은 영역별 Q&A 카드 모음입니다. 본문이 풍부해진 항목은
`../../<영역 폴더>/<주제>.md` 로 옮기고 카드는 링크만 남깁니다.

## 파일 목록

| 파일 | 영역 | 본문 폴더 |
|------|------|----------|
| [data-structure.md](./data-structure.md) | 자료구조 | [01-computer-science/data-structure](../../01-computer-science/data-structure/) |
| [operating-system.md](./operating-system.md) | 운영체제 | [01-computer-science/operating-system](../../01-computer-science/operating-system/) |
| [network.md](./network.md) | 네트워크 | [01-computer-science/network](../../01-computer-science/network/) |
| [database.md](./database.md) | 데이터베이스 | [01-computer-science/database](../../01-computer-science/database/) |
| [computer-architecture.md](./computer-architecture.md) | 컴퓨터 구조 | [01-computer-science/computer-architecture](../../01-computer-science/computer-architecture/) |
| [software-engineering.md](./software-engineering.md) | SW 공학 | [01-computer-science/software-engineering](../../01-computer-science/software-engineering/) |
| [language-js.md](./language-js.md) | JavaScript | [02-language/javascript](../../02-language/javascript/) |
| [language-ts.md](./language-ts.md) | TypeScript | [02-language/typescript](../../02-language/typescript/) |
| [backend.md](./backend.md) | 백엔드 | [03-backend](../../03-backend/) |
| [devops.md](./devops.md) | DevOps / 인프라 | [05-devops-infra](../../05-devops-infra/) |
| [web.md](./web.md) | 웹 / 브라우저 | [07-web](../../07-web/) |
| [frontend.md](./frontend.md) | 프론트엔드 | [08-frontend](../../08-frontend/) |
| [mobile.md](./mobile.md) | 모바일 | [09-mobile](../../09-mobile/) |
| [ai-data.md](./ai-data.md) | AI / 데이터 | [10-ai-data](../../10-ai-data/) |

## 질문 개수 확인

```bash
# 카테고리별 질문 수
for f in *.md; do
  [ "$f" = "README.md" ] && continue
  printf '%-30s %s\n' "$f" "$(grep -c '^## Q\.' "$f")"
done
```
