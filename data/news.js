/*
 * News · 새 소식
 * ------------------------------------------------------------------
 * 새 소식을 추가하려면 배열 맨 위에 항목을 하나 복사해서 붙여넣고 내용을 바꾸세요.
 * 맨 위 항목이 Home 화면의 "Latest News"에 자동으로 표시됩니다.
 *
 *  id      : 영문 소문자/숫자/하이픈 (주소창 #앵커로 쓰임, 겹치지 않게)
 *  tag     : "Award" | "Conference" | "Scholarship" | "Retreat" (새 태그도 가능)
 *  title   : 제목 (태그 [ ] 는 쓰지 않아도 자동으로 붙음)
 *  who     : (선택) 대상 학생 등
 *  body    : 본문 (여러 문단은 배열로)
 *  images  : 사진 경로 목록 (assets/img/news/ 폴더에 사진을 넣고 파일명 적기)
 *  logo    : true 이면 이미지를 로고처럼 작게(잘리지 않게) 표시
 *  link    : (선택) 원본/자세히 보기 링크
 *  date    : (선택) "2026.07" 같은 날짜. 비워두면 표시 안 함
 *  cover   : (선택) 사진이 없을 때 사진 자리에 크게 보일 행사명 등
 *  coverSub: (선택) cover 아래 작은 글씨 (장소·날짜 등)
 *            → 나중에 사진이 생기면 images 에 넣으면 사진이 대신 보입니다.
 */
window.AITEL = window.AITEL || {};
window.AITEL.news = [
  {
    id: "2026-asme-interpack",
    tag: "Conference",
    title: "Presentations at ASME InterPACK 2026",
    who: "박진현 학생, 이하은 교수",
    date: "2026.10.26–29",
    body: ["ASME InterPACK 2026(미국 샌디에이고)에 참석하여 박진현 학생과 이하은 교수가 연구 발표를 진행하였습니다."],
    images: ["assets/img/news/2026-interpack-1.jpg", "assets/img/news/2026-interpack-2.jpg"],
    link: "https://event.asme.org/InterPACK",
    linkLabel: "학회 홈페이지"
  },
  {
    id: "2026-electronics-cooling-workshop",
    tag: "Conference",
    title: "Presentations at the 4th Electronics Cooling & Thermal Management Workshop",
    who: "정민영 · 박진현 학생, 이하은 교수",
    date: "2026.10.23",
    body: [
      "제4회 전자장비냉각 및 열관리 통합 Workshop(더그랜드롯데 서울)에 정민영·박진현 학생과 이하은 교수가 참석하여 연구 발표를 진행하였습니다.",
      "박진현 학생은 PINO(Physics-Informed Neural Operator) 연구로 구두 발표와 포스터 발표를 하였습니다."
    ],
    images: ["assets/img/news/2026-ecw-1.jpg", "assets/img/news/2026-ecw-2.jpg", "assets/img/news/2026-ecw-3.jpg", "assets/img/news/2026-ecw-4.jpg"]
  },
  {
    id: "2026-summer-retreat",
    tag: "Retreat",
    title: "2026 Summer Retreat",
    body: ["2026 Happy Summer Retreat!"],
    images: ["assets/img/news/2026-summer-retreat.jpg"],
    link: "https://drive.google.com/file/d/1W5lzrYoHboAdijdAeskMy6rNsjC51V_Z/view?usp=sharing",
    linkLabel: "원본 사진 보기"
  },
  {
    id: "2026-ksfm-summer-poster",
    tag: "Conference",
    title: "Poster Presentation at 2026 KSFM Summer Conference",
    body: ["2026 유체기계학회 하계학술대회(평창)에 참석하여 박진현 학생이 포스터 발표(전기모터 열관리를 위한 양방향 전자기 - 열 연성해석)를 진행하였습니다."],
    images: ["assets/img/news/2026-ksfm-1.jpg", "assets/img/news/2026-ksfm-2.jpg"]
  },
  {
    id: "2026-ksme-dg-best-paper",
    tag: "Award",
    title: "Best Paper Award at 2026 KSME Daegu-Gyeongbuk Spring Conference",
    who: "박진현 & 정민영 학생",
    body: ["2026 대한기계학회 대구경북지회 춘계학술대회에서 포스터 발표(고온 라디언트 튜브 제작공법별 열응력 및 안전계수 비교)를 진행하여 우수 논문상을 수상하였습니다."],
    images: ["assets/img/news/2026-ksme-dg-award.jpg"]
  },
  {
    id: "2026-samsung-blue-lighthouse",
    tag: "Scholarship",
    title: "2026 Samsung Blue Lighthouse Scholarship for AI Core Talents",
    who: "박진현 학생",
    body: ["삼성그룹 기부금을 재원으로 한국장학재단이 운영하는 장학사업입니다(AI 핵심분야 선정). 졸업 시까지 생활비가 지속 지원됩니다."],
    images: ["assets/img/news/kosaf-logo.png"],
    logo: true
  },
  {
    id: "2026-egisf-scholarship",
    tag: "Scholarship",
    title: "2026 Engineering Education Foundation Scholarship",
    who: "정민영 학생",
    body: ["대한민국 엔지니어링 산업을 이끌 우수 인재를 위한 장학사업입니다 (엔지니어링·신재생에너지 분야 선정). 졸업 시까지 생활비가 지속 지원됩니다."],
    images: ["assets/img/news/2026-egisf-scholarship.jpg"]
  }
];
