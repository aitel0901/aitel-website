# AITEL 웹사이트 — Claude Code 작업 메모

영남대 자동차공학과 AI Thermal & Energy Lab.(PI: 이하은 교수) 홈페이지.
기존 Google Sites를 정적 사이트로 다시 만들어 GitHub Pages로 옮겼다 (2026.11).
사용자(교수님)와는 한국어로 대화한다. 파일 구조와 자주 하는 수정은 `README.md` 참고.

- 사이트: https://aitel.yu.ac.kr (HTTPS 적용)
- 저장소: https://github.com/aitel0901/aitel-website (Public, `main` 최상위 = 사이트, 빌드 없음)
- GitHub 계정: `aitel0901`. 커밋 작성자도 이 계정(noreply 이메일).

## 구조 요약
- 순수 HTML/CSS/바닐라 JS. 빌드 도구 없음. 모든 경로는 상대경로이고 `<body data-root="../">` 로 루트를 알려준다.
- 목록형 내용은 `data/*.js` (`window.AITEL.news / members / publications / projects`) → `assets/js/main.js` 가 렌더링.
- PI·Research 주제·Contact 내용은 각 `index.html` 에 직접 있다.
- 머리글·바닥글이 모든 페이지(404 포함)에 복사돼 있으므로, 메뉴·로고를 바꿀 땐 8개 HTML 파일을 모두 고친다.
- `.nojekyll` 이 있어 저장소 파일이 그대로 공개된다 (이 파일 포함). **공개되면 안 되는 내용은 저장소에 쓰지 않는다.**

## 교수님이 정한 원칙 (계속 지킬 것)
- Home은 단순하게. 화려한 섹션을 늘리지 않는다.
- 메인 문구: `Physics-informed AI<br>for thermal &amp; energy&nbsp;systems.` — "energy systems" 가 줄바꿈되지 않게 `&nbsp;` 유지.
- 연구실 로고 = 그라데이션 글자 "AITEL" (`<span class="wordmark">AITEL</span>`). 이미지 로고(`logo.png`)는 쓰지 않음. 파비콘은 그라데이션 "A".
- 그림·사진
  - AI가 만든 듯한 이미지, 다른 연구자 논문의 그림은 쓰지 않는다. 연구실 자체 그림을 쓴다.
  - 기업 제품의 구조는 그 회사가 공개한 보도자료 사진만 쓰고 출처를 표기한다 (예: Home 카드 02 "Picture: Bosch").
  - 진행 중인 연구의 세부 그림이나 미발표 내용(사진 속 발표 슬라이드 포함)은 싣지 않는다. 블러 처리보다는 **아예 빼는 것**을 선호한다.
- On-going Projects: 연구비·기간·역할은 표시하지 않는다. 과제명과 기관만, 묶음 사업은 `items` 로 하위 목록.
- 언어 탭: Contact의 Recruitment는 **한국어 기본**(EN 탭), Home의 Join AITEL 띠는 **영어 기본**(한국어 탭).
  구현: `data-lang-tabs` / `data-lang-btn` / `data-lang-pane`, 기본값은 `data-lang-default`.
- Publication 저자 표기: `__이름__` = 교수님(굵게+밑줄), `**이름**` = 연구실 구성원(굵게).

## 소식(News) 사진
- 원본은 연구실 NAS: `Z:\NAS_SSD\100_AITEL\98 사진\<날짜_행사명>\` (교수님 PC에서만 접근 가능).
- 휴대폰 사진은 EXIF 회전을 적용한 뒤 가로 1600px 이하 JPG로 줄여 `assets/img/news/` 에 영문 파일명으로 저장.
- `data/news.js` 맨 위 항목의 첫 사진이 Home "Latest News" 대표 사진. 잘림 위치는 `focus: "50% 30%"` 처럼 조정.
- 사진 3장까지는 나란히, 4장 이상이면 첫 장을 크게 표시.

## 작업 순서
1. 수정 → 로컬 미리보기: `.claude/launch.json` (PowerShell 서버 `.claude/serve.ps1`, http://localhost:8787).
   이 PC에는 Python이 설치돼 있지 않다.
2. 데스크톱 화면과 모바일 폭(375px)을 모두 확인한다.
3. `git commit` → `git push` (main). 1~2분 뒤 자동 배포.
   상태 확인: `gh api repos/aitel0901/aitel-website/pages --jq .status` → `built`.
4. 배포 후 https://aitel.yu.ac.kr 에서 확인한다 (캐시 때문에 Ctrl+F5).

Windows 참고: Git(`C:\Program Files\Git\cmd`)과 GitHub CLI(`C:\Program Files\GitHub CLI`)는 winget으로 설치했다.
도구 프로세스의 PATH에 없을 수 있으니 필요하면 앞에 붙인다. 저장소 설정: `core.longpaths true`, `core.autocrlf false`.

## 도메인 (건드리지 말 것)
- 학교 DNS: `aitel.yu.ac.kr` CNAME → `aitel0901.github.io` (2026.11.09 영남대 AI인프라팀에서 변경).
- 저장소의 `CNAME` 파일과 Pages의 Custom domain 설정이 연결을 유지한다. **지우면 404가 뜬다.**
  복구: `gh api -X PUT repos/aitel0901/aitel-website/pages -f cname=aitel.yu.ac.kr` → 인증서 발급 후 `-F https_enforced=true`.

## 교수님 확인이 필요한 항목 (묻지 않고 바꾸지 말 것)
- 일부 논문의 저자 순서와 교수님 이름 위치는 추정값이다: J12/C14, J08/C09, J10, 그리고 J12의 J. Park 표기.
- 신진연구자상(대한기계학회 대구경북지회) 수상 연도를 2026으로 적어 두었다.
- InterPACK 소식의 참석자 줄에 함께 찍은 학생(해린)을 추가할지.
- 전자장비냉각 워크샵과 InterPACK 포스터 사진은 블러 없이 그대로 두었다.
- Google Sites의 맞춤 도메인 해제(선택).
- 예전 커밋 기록에는 과거에 지운 내용이 남아 있다. 완전히 지우려면 저장소 히스토리를 정리해야 한다.
