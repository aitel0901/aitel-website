/* AITEL — site scripts (no dependencies) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var ROOT = document.body.getAttribute("data-root") || "";
  var DATA = window.AITEL || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function src(p) { return /^(https?:)?\/\//.test(p) ? p : ROOT + p; }
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Header ---------- */
  var header = $(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var toggle = $(".nav-toggle"), nav = $(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
    });
  }
  var yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var els = $all(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Lightbox ---------- */
  var lb;
  function openLightbox(href, alt) {
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "이미지 크게 보기");
      lb.innerHTML = '<img alt=""><button type="button" aria-label="닫기">×</button>';
      document.body.appendChild(lb);
      lb.addEventListener("click", closeLightbox);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
    }
    var img = lb.querySelector("img"); img.src = href; img.alt = alt || "";
    lb.classList.add("is-open"); document.body.style.overflow = "hidden";
    lb.querySelector("button").focus();
  }
  function closeLightbox() { if (lb) { lb.classList.remove("is-open"); document.body.style.overflow = ""; } }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-zoom]");
    if (!a) return;
    e.preventDefault();
    var img = a.querySelector("img");
    openLightbox(a.getAttribute("href"), img ? img.alt : "");
  });

  /* ---------- News ---------- */
  function newsHref(item) { return ROOT + "news/#" + item.id; }
  // 사진이 없는 소식은 행사명 표지로 대신 표시
  function newsCover(n) {
    return '<div class="news-cover"><span>' + esc(n.tag) + '</span><b>' + esc(n.cover || n.title) + '</b>' +
      (n.coverSub ? '<small>' + esc(n.coverSub) + '</small>' : "") + '</div>';
  }

  function renderLatest() {
    var el = $("#latest-news"); if (!el || !DATA.news || !DATA.news.length) return;
    var n = DATA.news[0];
    var more = DATA.news.slice(1, 3).map(function (m) {
      return '<li><span class="tag" data-kind="' + esc(m.tag) + '">' + esc(m.tag) + '</span><span>' + esc(m.title) + (m.who ? " (" + esc(m.who) + ")" : "") + '</span></li>';
    }).join("");
    el.innerHTML =
      '<a class="latest reveal" href="' + newsHref(n) + '">' +
        '<div class="latest-media">' + (n.images && n.images[0] ? '<img src="' + esc(src(n.images[0])) + '" alt="' + esc(n.title) + '" loading="lazy">' : newsCover(n)) + '</div>' +
        '<div class="latest-body">' +
          '<span class="latest-label"><span class="dot"></span>NEW · Latest News</span>' +
          '<span><span class="tag" data-kind="' + esc(n.tag) + '">' + esc(n.tag) + '</span></span>' +
          '<h3>' + esc(n.title) + '</h3>' +
          (n.body && n.body[0] ? '<p>' + esc(n.body[0]) + '</p>' : "") +
          (more ? '<ul class="latest-more" aria-label="이전 소식">' + more + '</ul>' : "") +
          '<span class="link-arrow">새 소식을 확인하세요 ' + ARROW + '</span>' +
        '</div>' +
      '</a>';
  }

  function renderNews() {
    var list = $("#news-list"), filters = $("#news-filters");
    if (!list || !DATA.news) return;
    list.innerHTML = DATA.news.map(function (n) {
      var imgs = (n.images || []);
      var media = imgs.map(function (p, i) {
        return n.logo
          ? '<div><img src="' + esc(src(p)) + '" alt="' + esc(n.title) + '" loading="lazy"></div>'
          : '<a href="' + esc(src(p)) + '" data-zoom><img src="' + esc(src(p)) + '" alt="' + esc(n.title) + (imgs.length > 1 ? " (" + (i + 1) + ")" : "") + '" loading="lazy"></a>';
      }).join("");
      var body = (n.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      return '<article class="news-item reveal" id="' + esc(n.id) + '" data-tag="' + esc(n.tag) + '">' +
        '<div class="news-media' + (n.logo ? " logo" : "") + '">' + (imgs.length ? media : newsCover(n)) + '</div>' +
        '<div class="news-body">' +
          '<div><span class="tag" data-kind="' + esc(n.tag) + '">' + esc(n.tag) + '</span>' + (n.date ? ' <span class="badge year">' + esc(n.date) + '</span>' : "") + '</div>' +
          '<h2>' + esc(n.title) + '</h2>' +
          (n.who ? '<div class="who">' + esc(n.who) + '</div>' : "") +
          body +
          (n.link ? '<div class="more"><a class="link-arrow" href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.linkLabel || "자세히 보기") + ' ' + ARROW + '</a></div>' : "") +
        '</div>' +
      '</article>';
    }).join("");

    if (filters) {
      var counts = {}; DATA.news.forEach(function (n) { counts[n.tag] = (counts[n.tag] || 0) + 1; });
      var tags = Object.keys(counts);
      filters.innerHTML = ['<button type="button" class="filter" data-filter="*" aria-pressed="true">All<span class="c">' + DATA.news.length + '</span></button>']
        .concat(tags.map(function (t) { return '<button type="button" class="filter" data-filter="' + esc(t) + '" aria-pressed="false">' + esc(t) + '<span class="c">' + counts[t] + '</span></button>'; }))
        .join("");
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-filter]"); if (!b) return;
        var f = b.getAttribute("data-filter");
        $all("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        $all(".news-item", list).forEach(function (it) { it.hidden = !(f === "*" || it.getAttribute("data-tag") === f); });
      });
    }
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) { target.classList.add("is-visible"); setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 60); }
    }
  }

  /* ---------- Members ---------- */
  function renderMembers() {
    var el = $("#members"); if (!el || !DATA.members) return;
    var groups = [
      { key: "graduate", title: "Graduate Students" },
      { key: "undergraduate", title: "Undergraduate Students" },
      { key: "", title: "Students" }
    ];
    el.innerHTML = groups.map(function (g) {
      var ms = DATA.members.filter(function (m) { return (m.group || "") === g.key; });
      if (!ms.length) return "";
      return '<h2 class="group-title">' + g.title + ' <span class="count">' + ms.length + '</span></h2>' +
        '<div class="members">' + ms.map(function (m) {
          return '<article class="member reveal">' +
            '<div class="member-photo"><img src="' + esc(src(m.photo)) + '" alt="' + esc(m.nameKr + " " + m.nameEn) + '" loading="lazy"></div>' +
            '<div class="member-body">' +
              '<h3 class="member-name">' + esc(m.nameKr) + '<small>' + esc(m.nameEn) + '</small></h3>' +
              (m.email ? '<a class="member-mail" href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>' : "") +
              '<ul class="member-topics">' + (m.topics || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul>' +
              (m.quote ? '<p class="member-quote">' + esc(m.quote) + '</p>' : "") +
            '</div>' +
          '</article>';
        }).join("") + '</div>';
    }).join("");
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    var el = $("#projects"); if (!el || !DATA.projects) return;
    el.innerHTML = '<table><thead><tr><th scope="col">과제명</th><th scope="col">지원기관</th><th scope="col">기간</th><th scope="col" class="amount">연구비*</th><th scope="col">역할</th></tr></thead><tbody>' +
      DATA.projects.map(function (p) {
        var lead = /책임/.test(p.role);
        return '<tr>' +
          '<td class="p-title">' + esc(p.title) + (p.program ? '<span>' + esc(p.program) + '</span>' : "") + '</td>' +
          '<td data-label="지원기관">' + esc(p.agency) + '</td>' +
          '<td class="num" data-label="기간">' + esc(p.period) + '</td>' +
          '<td class="num amount" data-label="연구비(만원)">' + esc(p.amount) + '</td>' +
          '<td><span class="role' + (lead ? "" : " alt") + '">' + esc(p.role) + '</span></td>' +
        '</tr>';
      }).join("") + '</tbody></table>';
  }

  /* ---------- Publications ---------- */
  // __이름__ → 진한 글씨+밑줄(교수), **이름** → 진한 글씨(연구실 구성원)
  function fmtAuthors(a) {
    var s = esc(a)
      .replace(/__(.+?)__/g, "\u0001p\u0002$1\u0003")
      .replace(/\*\*(.+?)\*\*/g, "\u0001m\u0002$1\u0003");
    s = s.replace(/†/g, "<sup>†</sup>").replace(/\*/g, "<sup>*</sup>");
    return s.replace(/\u0001p\u0002/g, '<strong class="au-pi">').replace(/\u0001m\u0002/g, '<strong class="au-lab">').replace(/\u0003/g, "</strong>");
  }
  function renderPubs() {
    var host = $("#pubs"); if (!host || !DATA.publications) return;
    var sections = [
      { key: "international", roman: "I.", title: "International Journal" },
      { key: "domestic", roman: "II.", title: "Domestic Journal & Conference Papers and Presentations" }
    ];
    host.innerHTML = sections.map(function (s) {
      var items = DATA.publications[s.key] || [];
      return '<section class="pub-section" data-section="' + s.key + '">' +
        '<h2><span class="roman">' + s.roman + '</span>' + s.title + '<span class="count">' + items.length + '</span></h2>' +
        '<ol class="pub-list">' + items.map(function (p, i) {
          var hay = [p.authors, p.title, p.venue, p.detail, p.year].join(" ").toLowerCase();
          return '<li class="pub" data-hay="' + esc(hay) + '">' +
            '<span class="pub-idx">' + (s.key === "international" ? "J" : "C") + String(items.length - i).padStart(2, "0") + '</span>' +
            '<div>' +
              '<div class="pub-title">' + (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>' : esc(p.title)) + '</div>' +
              '<div class="pub-authors">' + fmtAuthors(p.authors) + '</div>' +
              ((p.venue || p.detail) ? '<div class="pub-venue">' + (p.venue ? '<em>' + esc(p.venue) + '</em>' : "") + (p.detail ? (p.venue ? ", " : "") + esc(p.detail) : "") + '</div>' : "") +
              ((p.status || p.metric) ? '<div class="pub-badges">' +
                (p.status ? '<span class="badge review">' + esc(p.status) + '</span>' : "") +
                (p.metric ? '<span class="badge if">' + esc(p.metric) + '</span>' : "") +
              '</div>' : "") +
            '</div>' +
          '</li>';
        }).join("") + '</ol>' +
        '<p class="pub-empty" hidden>검색 결과가 없습니다.</p>' +
      '</section>';
    }).join("");

    var input = $("#pub-search");
    if (input) input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      $all(".pub-section", host).forEach(function (sec) {
        var shown = 0;
        $all(".pub", sec).forEach(function (li) { var ok = !q || li.getAttribute("data-hay").indexOf(q) !== -1; li.hidden = !ok; if (ok) shown++; });
        sec.querySelector(".count").textContent = q ? shown + " / " + $all(".pub", sec).length : $all(".pub", sec).length;
        sec.querySelector(".pub-empty").hidden = shown !== 0;
      });
    });
  }

  /* ---------- Research framework tabs (home) ---------- */
  function setupFramework() {
    var tabs = $all(".fw-step"); if (!tabs.length) return;
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = tabs.length;
        if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); select((i + 1) % n, true); }
        if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); select((i - 1 + n) % n, true); }
        if (k === "Home") { e.preventDefault(); select(0, true); }
        if (k === "End") { e.preventDefault(); select(n - 1, true); }
      });
    });
    $all("[data-fw-go]").forEach(function (b) {
      b.addEventListener("click", function () { select(parseInt(b.getAttribute("data-fw-go"), 10)); });
    });
    // Deep link: index.html#fw-3 opens stage 3
    var m = location.hash.match(/^#fw-([1-9])$/);
    select(m && +m[1] <= tabs.length ? +m[1] - 1 : 0);
  }

  /* ---------- Figure switcher inside a framework stage ---------- */
  /* ---------- EN / 한국어 탭 (영어가 기본) ---------- */
  function setupLangTabs() {
    $all("[data-lang-tabs]").forEach(function (box) {
      var btns = $all("[data-lang-btn]", box), panes = $all("[data-lang-pane]", box);
      function show(lang) {
        btns.forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-lang-btn") === lang ? "true" : "false"); });
        panes.forEach(function (p) { p.hidden = p.getAttribute("data-lang-pane") !== lang; });
      }
      btns.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-lang-btn")); }); });
      show("en");
    });
  }

  function setupGalleries() {
    $all("[data-gallery]").forEach(function (fig) {
      var shots = $all(".fw-shot", fig), caps = $all(".fw-cap", fig), btns = $all(".fw-thumbs button", fig);
      btns.forEach(function (b, i) {
        b.addEventListener("click", function () {
          [shots, caps].forEach(function (list) { list.forEach(function (el, j) { el.classList.toggle("is-active", i === j); }); });
          btns.forEach(function (x, j) { x.setAttribute("aria-pressed", i === j ? "true" : "false"); });
        });
      });
    });
  }

  /* ---------- Thermal isotherm field (hero backgrounds) ----------
     A small 2-D temperature field (sum of Gaussian heat sources over a
     gentle gradient) traced with marching squares. Pure canvas, no images. */
  var STOPS = [[19, 98, 159], [47, 143, 207], [124, 196, 216], [242, 176, 70], [224, 85, 43]];
  function cmap(t) {
    t = Math.max(0, Math.min(1, t)) * (STOPS.length - 1);
    var i = Math.min(STOPS.length - 2, Math.floor(t)), f = t - i, a = STOPS[i], b = STOPS[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }

  function Thermal(canvas, opt) {
    opt = opt || {};
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1, cell = 10, cols = 0, rows = 0, vals = null;
    var levels = opt.levels || 15, alpha = opt.alpha || 1, fps = opt.fps || 30;
    var running = false, visible = true, last = 0, t0 = performance.now();
    var pointer = { x: 0, y: 0, a: 0, target: 0 };
    var srcs = opt.sources || [
      { x: .74, y: .36, a: 1.00, s: .22, ax: .05, ay: .07, fx: .13, fy: .09, p: 0 },
      { x: .90, y: .78, a: .80, s: .17, ax: .04, ay: .05, fx: .10, fy: .14, p: 1.7 },
      { x: .56, y: .86, a: .60, s: .15, ax: .06, ay: .04, fx: .08, fy: .12, p: 3.1 },
      { x: .97, y: .14, a: .55, s: .13, ax: .03, ay: .05, fx: .16, fy: .07, p: 4.4 },
      { x: .30, y: .62, a: -.30, s: .30, ax: .05, ay: .05, fx: .06, fy: .05, p: 2.2 }
    ];

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 700 ? 12 : 10;
      cols = Math.ceil(w / cell) + 1; rows = Math.ceil(h / cell) + 1;
      vals = new Float32Array(cols * rows);
      draw(performance.now());
    }

    function compute(time) {
      var t = (time - t0) / 1000, unit = Math.max(h, w * 0.55);
      var S = srcs.map(function (s) {
        return { x: (s.x + s.ax * Math.sin(t * s.fx * 2 * Math.PI / 6 + s.p)) * w, y: (s.y + s.ay * Math.cos(t * s.fy * 2 * Math.PI / 6 + s.p)) * h, a: s.a, k: 1 / (2 * Math.pow(s.s * unit, 2)) };
      });
      if (pointer.a > 0.001) S.push({ x: pointer.x, y: pointer.y, a: 0.45 * pointer.a, k: 1 / (2 * Math.pow(0.07 * unit, 2)) });
      for (var j = 0; j < rows; j++) {
        var y = j * cell;
        for (var i = 0; i < cols; i++) {
          var x = i * cell, v = 0.32 * (x / w) + 0.08 * (1 - y / h);
          for (var k = 0; k < S.length; k++) { var dx = x - S[k].x, dy = y - S[k].y; v += S[k].a * Math.exp(-(dx * dx + dy * dy) * S[k].k); }
          vals[j * cols + i] = v;
        }
      }
    }

    function draw(time) {
      if (!vals) return;
      compute(time);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      var lo = 0.12, hi = 1.12;
      for (var l = 0; l < levels; l++) {
        var L = lo + (hi - lo) * (l / (levels - 1)), c = cmap(l / (levels - 1));
        ctx.strokeStyle = "rgba(" + (c[0] | 0) + "," + (c[1] | 0) + "," + (c[2] | 0) + "," + ((0.22 + 0.5 * l / (levels - 1)) * alpha).toFixed(3) + ")";
        ctx.beginPath();
        for (var j = 0; j < rows - 1; j++) {
          var y0 = j * cell, y1 = y0 + cell;
          for (var i = 0; i < cols - 1; i++) {
            var a = vals[j * cols + i], b = vals[j * cols + i + 1], cc = vals[(j + 1) * cols + i + 1], d = vals[(j + 1) * cols + i];
            var idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (cc > L ? 2 : 0) | (d > L ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            var x0 = i * cell, x1 = x0 + cell;
            var T = [x0 + cell * (L - a) / (b - a), y0], R = [x1, y0 + cell * (L - b) / (cc - b)],
                B = [x0 + cell * (L - d) / (cc - d), y1], Lf = [x0, y0 + cell * (L - a) / (d - a)];
            switch (idx) {
              case 1: case 14: seg(Lf, B); break;
              case 2: case 13: seg(B, R); break;
              case 3: case 12: seg(Lf, R); break;
              case 4: case 11: seg(T, R); break;
              case 5: seg(Lf, T); seg(B, R); break;
              case 6: case 9: seg(T, B); break;
              case 7: case 8: seg(Lf, T); break;
              case 10: seg(T, R); seg(Lf, B); break;
            }
          }
        }
        ctx.stroke();
      }
    }
    function seg(p, q) { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); }

    function loop(now) {
      if (!running) return;
      requestAnimationFrame(loop);
      pointer.a += (pointer.target - pointer.a) * 0.06;
      if (now - last < 1000 / fps) return;
      last = now; draw(now);
    }
    function start() { if (running || reduceMotion || !visible || document.hidden) return; running = true; requestAnimationFrame(loop); }
    function stop() { running = false; }

    resize();
    var ro = "ResizeObserver" in window ? new ResizeObserver(function () { resize(); }) : null;
    if (ro) ro.observe(canvas); else window.addEventListener("resize", resize);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); else stop(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    if (opt.interactive && !reduceMotion) {
      var host = canvas.parentElement;
      host.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        var r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.target = 1;
      });
      host.addEventListener("pointerleave", function () { pointer.target = 0; });
    }
    start();
  }

  $all("canvas[data-thermal]").forEach(function (c) {
    var mode = c.getAttribute("data-thermal");
    if (mode === "hero") Thermal(c, { interactive: true, levels: 16, fps: 30 });
    else Thermal(c, {
      levels: 12, alpha: 0.9, fps: 20,
      sources: [
        { x: .82, y: .30, a: .95, s: .30, ax: .05, ay: .10, fx: .10, fy: .08, p: 0 },
        { x: .98, y: .90, a: .70, s: .22, ax: .03, ay: .06, fx: .12, fy: .10, p: 2 },
        { x: .60, y: 1.05, a: .45, s: .22, ax: .05, ay: .04, fx: .07, fy: .11, p: 4 },
        { x: .20, y: .40, a: -.25, s: .35, ax: .04, ay: .05, fx: .05, fy: .05, p: 1 }
      ]
    });
  });

  /* ---------- Boot ---------- */
  renderLatest();
  renderNews();
  renderMembers();
  renderProjects();
  renderPubs();
  setupFramework();
  setupGalleries();
  setupLangTabs();
  setupReveal();
})();
