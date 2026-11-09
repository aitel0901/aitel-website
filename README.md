# AITEL 웹사이트 (aitel.yu.ac.kr)

AI Thermal & Energy Lab. 홈페이지 소스입니다. 빌드 도구 없이 HTML/CSS/JS만으로 동작하는 정적 사이트이며,
GitHub Pages(무료)에 올려 `aitel.yu.ac.kr` 주소로 서비스합니다.

## 폴더 구조

```
index.html              Home
pi/index.html           PI (교수 소개)        ← 내용은 이 파일에서 직접 수정
members/index.html      Members              ← 내용은 data/members.js 에서 수정
research/index.html     Research             ← 연구주제는 이 파일, 과제 목록은 data/projects.js
publication/index.html  Publication          ← 내용은 data/publications.js 에서 수정
news/index.html         News                 ← 내용은 data/news.js 에서 수정
contact/index.html      Contact              ← 이 파일에서 직접 수정
home/index.html         예전 주소(/home) → 새 홈으로 이동
404.html                없는 주소로 들어왔을 때 보이는 페이지
CNAME                   aitel.yu.ac.kr 연결 후 GitHub이 자동으로 만드는 파일 — 생기면 지우지 마세요
data/                   소식·구성원·논문·과제 목록 (가장 자주 고치는 곳)
assets/css/style.css    디자인
assets/js/main.js       메뉴, 목록 표시, 배경 애니메이션
assets/img/             사진·로고
```

## 자주 하는 수정

모든 파일은 GitHub 웹사이트에서 파일을 열고 ✏️(Edit) 버튼으로 바로 고칠 수 있습니다. 저장(Commit)하면 1~2분 뒤 사이트에 반영됩니다.

### 새 소식 올리기
1. 사진을 `assets/img/news/` 폴더에 업로드합니다 (가로 1600px 이하 jpg 권장, 파일명은 영문).
2. `data/news.js` 를 열고 배열 **맨 위**에 항목을 하나 추가합니다.

```js
{
  id: "2026-fall-conference",            // 영문·숫자·하이픈, 다른 소식과 겹치지 않게
  tag: "Conference",                      // Award / Conference / Scholarship / Retreat
  title: "Oral Presentation at 2026 KSME Fall Conference",
  who: "홍길동 학생",                      // 없으면 이 줄 삭제
  body: ["본문 문단을 여기에 씁니다."],
  images: ["assets/img/news/2026-fall-1.jpg"]
},
```
맨 위 항목이 Home 화면의 **Latest News** 에 자동으로 표시됩니다.

### 구성원 추가·수정
`data/members.js` — 이름, 이메일, 사진 경로, 연구 분야, 한마디를 수정합니다.
`group` 에 `"graduate"` 또는 `"undergraduate"` 를 넣으면 Graduate / Undergraduate 로 나뉘어 표시되고, 비워두면 Students 로 묶입니다.

### 논문 추가
`data/publications.js` — `international`(국제 저널) 또는 `domestic`(국내 저널·학회) 목록 맨 위에 추가합니다. 번호는 자동으로 매겨집니다.

### 연구과제 추가
`data/projects.js` — 과제 하나당 `{ title, agency }` 한 줄. 여러 세부과제를 묶을 때는 `items: [...]` 를 붙입니다(RISE 사업 참고). 연구비·기간은 표시하지 않습니다.

## Home 연구 그림
- **연구 분야 카드(01–03)** 사진: `assets/img/areas/`
  - 카드 02의 구동모터 사진은 Bosch Media Service 보도자료 사진("Picture: Bosch" 표기 조건으로 무료 게재)입니다.
    기업과 공동연구 중인 제품의 상세 구조는 싣지 않고, 이미 공개된 일반 구조 사진에 출처를 표기합니다.
- 카드 아래 한 줄 연구 흐름(Applications → … → Optimized thermal solutions)은 `index.html` 의 `flow-mini` 목록입니다. 필요 없으면 그 `<ol>` 을 지우면 됩니다.
- 다른 연구자의 논문 그림이나 진행 중인 연구의 세부 그림은 싣지 않고, 연구실 그림이나 기업이 공개한 자료를 출처와 함께 쓰는 것을 원칙으로 합니다.

### 소식 사진
`images` 에 사진이 3장까지는 나란히, 4장 이상이면 첫 사진이 크게·나머지(최대 3장)가 아래에 작게 표시됩니다. 첫 사진은 가로 사진을 권장합니다(Home의 Latest News 사진으로도 쓰임).

## 배포 (GitHub Pages)

- 저장소: https://github.com/aitel0901/aitel-website (Public, `main` 브랜치 최상위가 곧 사이트)
- 사이트 주소: **https://aitel.yu.ac.kr** (2026.11.09 연결 완료, HTTPS 적용)
- `aitel0901.github.io/aitel-website/` 로 들어와도 위 주소로 자동 이동합니다.
- 저장소의 파일을 고쳐 저장(Commit)하면 1~2분 뒤 자동으로 다시 배포됩니다.

### 주의: `CNAME` 파일을 지우지 마세요
저장소 최상위의 `CNAME` 파일(내용: `aitel.yu.ac.kr`)과 **Settings → Pages → Custom domain** 설정이 도메인 연결을 유지합니다.
이 설정을 비우면 aitel.yu.ac.kr 에 GitHub 404 페이지("There isn't a GitHub Pages site here")가 뜹니다.
그럴 땐 Custom domain 에 `aitel.yu.ac.kr` 을 다시 넣고 Save → **Enforce HTTPS** 체크.

## 도메인 연결 (영남대 DNS 설정, 2026.11.09 AI인프라팀 반영)

| 호스트 | 유형 | 이전 값 | 현재 값 |
|---|---|---|---|
| aitel.yu.ac.kr | CNAME | ghs.googlehosted.com | **aitel0901.github.io** |

(선택·권장) GitHub 도메인 소유 확인용 TXT 레코드 — GitHub 오른쪽 위 프로필 → **Settings → Pages → Add a domain** 에 `aitel.yu.ac.kr` 를 넣으면 안내되는 값을 그대로 전달:

| 호스트 | 유형 | 값 |
|---|---|---|
| _github-pages-challenge-aitel0901.aitel.yu.ac.kr | TXT | (GitHub이 발급한 값) |

전환이 끝났으므로 Google Sites의 *설정 → 맞춤 도메인* 에서 aitel.yu.ac.kr 연결을 해제해도 됩니다(선택).
