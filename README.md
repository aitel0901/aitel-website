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
`data/projects.js` — 한 줄에 과제 하나씩 추가합니다(연구비 단위: 만원).

## Home 연구 그림
- **연구 분야 카드(01–03)** 사진: `assets/img/areas/`
- **Research Framework**(Applications → Phenomena → AI-Centered Design Framework → Validation → Optimized Thermal Solutions) 그림:
  `assets/img/framework/` — 연구실 발표자료·논문 그림과 기업 공개 보도자료 사진입니다.
  - 01 Applications: 구동계 사진은 Bosch Media Service 보도자료 사진("Picture: Bosch" 표기 조건으로 무료 게재)입니다.
    기업과 공동연구 중인 제품의 상세 구조는 싣지 않고, 이미 공개된 일반 구조 사진에 출처를 표기합니다.
  - 03 AI-Centered Design Framework, 05 Optimized Thermal Solutions: 발표자료 그림 대신 `index.html` 안의 키워드 도식(`dg-` 클래스)으로 표현합니다.
    진행 중인 연구(예: 마이크로채널 냉각기)의 세부 그림은 공개하지 않습니다.
  다른 연구자의 논문 그림은 피하고, 연구실 그림이나 기업이 공개한 자료를 출처와 함께 쓰는 것을 원칙으로 합니다.
  저-해상도 그림은 `fw-shot` 에 `fit` 클래스를 붙이면 화면 폭까지 늘어나지 않고 가운데에 표시됩니다.
  그림을 바꾸려면 같은 파일명으로 덮어쓰거나, `index.html` 의 해당 `fw-panel` 안 `fw-shot`(그림) / `fw-cap`(설명) / `fw-thumbs` 버튼을 같은 순서로 추가·수정하세요.
  그림을 누르면 크게 볼 수 있습니다. `https://aitel.yu.ac.kr/#fw-3` 처럼 주소 끝에 `#fw-번호`를 붙이면 해당 단계가 열린 상태로 공유됩니다.

## 배포 (GitHub Pages)

- 저장소: https://github.com/aitel0901/aitel-website (Public, `main` 브랜치 최상위가 곧 사이트)
- 미리보기 주소: https://aitel0901.github.io/aitel-website/
- 저장소의 파일을 고쳐 저장(Commit)하면 1~2분 뒤 자동으로 다시 배포됩니다.

### 학교 DNS가 바뀐 뒤 aitel.yu.ac.kr 연결
1. 저장소 **Settings → Pages → Custom domain** 에 `aitel.yu.ac.kr` 입력 → Save (저장소에 `CNAME` 파일이 자동으로 생깁니다).
2. DNS check가 통과하면 잠시 후 **Enforce HTTPS** 를 체크합니다.

DNS가 바뀌기 전에 미리 연결하면 미리보기 주소가 예전 Google Sites로 넘어가 버리므로, DNS 변경을 확인한 뒤 연결합니다.
(미리보기 주소에서는 없는 페이지용 `404.html` 의 디자인이 깨져 보일 수 있습니다. 도메인 연결 후에는 정상입니다.)

## 도메인 연결 (영남대 정보통신 담당 부서에 요청)

현재 `aitel.yu.ac.kr` 은 Google Sites(`ghs.googlehosted.com`)를 가리키고 있습니다. 아래처럼 변경을 요청합니다.

| 호스트 | 유형 | 현재 값 | 변경할 값 |
|---|---|---|---|
| aitel.yu.ac.kr | CNAME | ghs.googlehosted.com | **aitel0901.github.io** |

(선택·권장) GitHub 도메인 소유 확인용 TXT 레코드 — GitHub 오른쪽 위 프로필 → **Settings → Pages → Add a domain** 에 `aitel.yu.ac.kr` 를 넣으면 안내되는 값을 그대로 전달:

| 호스트 | 유형 | 값 |
|---|---|---|
| _github-pages-challenge-aitel0901.aitel.yu.ac.kr | TXT | (GitHub이 발급한 값) |

DNS 변경 후 반영까지 보통 수 분~수 시간 걸립니다. 반영 전까지는 기존 Google Sites가 계속 보입니다.
전환이 끝나면 Google Sites의 *설정 → 맞춤 도메인* 에서 aitel.yu.ac.kr 연결을 해제해도 됩니다(선택).
