(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function onView(els, fn, opts) {
    if (!("IntersectionObserver" in window)) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { fn(en.target); io.unobserve(en.target); } });
    }, opts || { rootMargin: "0px 0px -12% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- 深浅色 ----------
  var toggle = $("[data-theme-toggle]");
  if (toggle) toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- header 分隔线 + 阅读进度 ----------
  var header = $(".site-header");
  var bar = $(".progress span");
  var isArticle = document.body.classList.contains("article");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (bar && isArticle) {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- 复制 ----------
  function copyText(text, el, label) {
    var hint = el.querySelector(".copy-hint");
    var done = function () {
      el.classList.add("copied");
      var old = hint ? hint.textContent : el.textContent;
      if (hint) hint.textContent = "已复制 ✓"; else el.textContent = "已复制 ✓";
      setTimeout(function () {
        el.classList.remove("copied");
        if (hint) hint.textContent = old; else el.textContent = label || old;
      }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }
  $$("[data-copy]").forEach(function (el) {
    el.addEventListener("click", function () { copyText(el.getAttribute("data-copy"), el); });
  });

  // ---------- 首页：时钟和 T+ ----------
  var clock = $("[data-clock]");
  if (clock) {
    var fmt;
    try { fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }); } catch (e) {}
    var tick = function () { if (fmt) clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }
  var tplus = $("[data-tplus]");
  if (tplus) {
    var since = Date.parse(tplus.getAttribute("data-since") + "T00:00:00+08:00");
    if (!isNaN(since)) tplus.textContent = Math.floor((Date.now() - since) / 864e5).toLocaleString("en-US");
  }

  // ---------- 首页：星空 ----------
  var canvas = $(".stars");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d"), stars = [], W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1), running = true;
    var resize = function () {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(W * H / 6500);
      stars = [];
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + .2, a: Math.random(), s: Math.random() * .015 + .003, v: Math.random() * .08 + .01 });
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i];
        if (!reduce) { st.a += st.s; st.x -= st.v; if (st.x < 0) st.x = W; }
        var o = .25 + Math.abs(Math.sin(st.a)) * .6;
        ctx.globalAlpha = o; ctx.fillStyle = i % 17 === 0 ? "#ffb547" : "#ffffff";
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
      }
      if (!reduce && running) requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", function () { resize(); if (reduce) draw(); });
    if ("IntersectionObserver" in window && !reduce) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; draw(); } else if (!vis) running = false;
      }).observe(canvas);
    }
  }

  // ---------- 首页：终端逐行打字 ----------
  var term = $("[data-term]");
  if (term) {
    var lines = $$("li", term);
    if (reduce) lines.forEach(function (li) { li.classList.add("shown"); });
    else {
      var texts = lines.map(function (li) { return li.textContent; });
      var i = 0;
      var next = function () {
        if (i >= lines.length) return;
        var li = lines[i], text = texts[i];
        li.classList.add("shown");
        if (li.classList.contains("t-cmd") && text) {
          li.textContent = ""; li.classList.add("t-cursor");
          var k = 0;
          var type = function () {
            li.textContent = text.slice(0, ++k);
            if (k < text.length) setTimeout(type, 26 + Math.random() * 40);
            else { li.classList.remove("t-cursor"); i++; setTimeout(next, 260); }
          };
          setTimeout(type, 200);
        } else { i++; setTimeout(next, li.classList.contains("t-cursor") ? 0 : 110); }
      };
      onView([term], function () { setTimeout(next, 400); }, { threshold: .2 });
    }
  }

  // ---------- 首页：曲线、数字、出现动画 ----------
  onView($$(".trajectory"), function (el) { el.classList.add("in"); }, { rootMargin: "0px 0px -20% 0px" });

  $$("[data-count]").forEach(function (el) {
    var raw = el.getAttribute("data-count");
    var m = raw.match(/^(\D*)([\d,.]+)(.*)$/);
    if (!m || reduce) return;
    var pre = m[1], num = parseFloat(m[2].replace(/,/g, "")), suf = m[3];
    el.textContent = pre + "0" + suf;
    onView([el], function () {
      var t0 = performance.now(), dur = 1400;
      var step = function (t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = pre + Math.round(num * e) + suf;
        if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
      };
      requestAnimationFrame(step);
    });
  });

  if (!reduce) {
    var rev = $$(".home .block-head, .home .ships, .home .readouts, .home .principles li, .home .crew li, .home .talks, .home .log li, .home .pit > *, .histo");
    rev.forEach(function (el) { el.classList.add("reveal"); });
    onView(rev, function (el) { el.classList.add("in"); });
  }

  $$(".ship").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // ---------- 文章：代码复制、标题锚点、目录高亮 ----------
  var prose = $(".prose");
  if (prose) {
    $$("pre", prose).forEach(function (pre) {
      if (pre.closest(".lntd:first-child")) return;
      var host = pre.closest(".highlight") || pre;
      if (host.parentNode.classList.contains("code-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "code-wrap";
      host.parentNode.insertBefore(wrap, host);
      wrap.appendChild(host);
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "copy-code"; btn.textContent = "copy";
      btn.addEventListener("click", function () { copyText(pre.innerText, btn, "copy"); });
      wrap.appendChild(btn);
    });
    $$("h1[id], h2[id], h3[id]", prose).forEach(function (h) {
      var a = document.createElement("a");
      a.className = "heading-anchor"; a.href = "#" + h.id; a.textContent = "#";
      a.setAttribute("aria-label", "链接到这一节");
      h.appendChild(a);
    });
    var tocLinks = $$(".toc a");
    if (tocLinks.length && "IntersectionObserver" in window) {
      var map = {};
      tocLinks.forEach(function (a) { map[decodeURIComponent(a.hash.slice(1))] = a; });
      var tio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting || !map[en.target.id]) return;
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        });
      }, { rootMargin: "-80px 0px -70% 0px" });
      $$("h1[id], h2[id], h3[id], h4[id]", prose).forEach(function (h) { tio.observe(h); });
    }
  }

  // ---------- Human / Agent 模式 ----------
  var agentView = $("#agent-view"), agentBody = $("#agent-body"), llms = null;
  var llmsURL = ($("link[rel=alternate][type='text/plain']") || {}).href || "/llms.txt";
  function paint(text) {
    agentBody.textContent = "";
    text.split("\n").forEach(function (line, i) {
      var span = document.createElement("span");
      if (/^#/.test(line)) span.className = "h";
      else if (/^>/.test(line)) span.className = "q";
      span.textContent = line + "\n";
      agentBody.appendChild(span);
    });
  }
  function setMode(mode) {
    var agent = mode === "agent";
    $$(".mode-btn").forEach(function (b) {
      var on = b.getAttribute("data-mode") === mode;
      b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on);
    });
    if (!agentView) return;
    agentView.hidden = !agent;
    document.body.classList.toggle("agent-mode", agent);
    if (agent && !llms) {
      fetch(llmsURL).then(function (r) { return r.text(); }).then(function (t) { llms = t; paint(t); },
        function () { agentBody.textContent = "加载失败了。直接打开 " + llmsURL + " 看吧。"; });
    }
    if (agent) { if (location.hash !== "#agent") history.replaceState(null, "", "#agent"); }
    else if (location.hash === "#agent") history.replaceState(null, "", location.pathname + location.search);
  }
  $$("[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { setMode(b.getAttribute("data-mode")); });
  });
  var agentCopy = $("[data-agent-copy]");
  if (agentCopy) agentCopy.addEventListener("click", function () {
    if (llms) copyText(llms, agentCopy, "复制给你的 Agent");
  });
  if (location.hash === "#agent") setMode("agent");
  window.addEventListener("hashchange", function () { setMode(location.hash === "#agent" ? "agent" : "human"); });

  // ---------- Disqus：点击才加载，本地预览不加载 ----------
  $$("[data-disqus]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) { btn.textContent = "本地预览不加载 Disqus"; return; }
      var url = btn.getAttribute("data-url");
      window.disqus_config = function () { this.page.url = url; };
      var sc = document.createElement("script");
      sc.src = "https://" + btn.getAttribute("data-disqus") + ".disqus.com/embed.js";
      sc.setAttribute("data-timestamp", String(+new Date()));
      sc.async = true;
      sc.onerror = function () { btn.hidden = false; btn.textContent = "Disqus 加载失败，可能需要换个网络"; };
      document.head.appendChild(sc);
      btn.hidden = true;
    });
  });

  // ---------- 搜索：标题 + 标签，索引在 /index.json ----------
  var dlg = $("#search"), input = $("#search-input"), list = $("#search-results");
  if (!dlg || !input || !list || typeof dlg.showModal !== "function") {
    $$("[data-search-open]").forEach(function (b) { b.hidden = true; });
    return;
  }
  var index = null, sel = 0;
  function load() {
    if (index) return Promise.resolve(index);
    return fetch(input.getAttribute("data-index")).then(function (r) { return r.json(); }).then(function (d) { index = d; return d; });
  }
  function highlight(text, q) {
    var frag = document.createDocumentFragment();
    var i = q ? text.toLowerCase().indexOf(q) : -1;
    if (i < 0) { frag.appendChild(document.createTextNode(text)); return frag; }
    frag.appendChild(document.createTextNode(text.slice(0, i)));
    var m = document.createElement("mark"); m.textContent = text.slice(i, i + q.length);
    frag.appendChild(m);
    frag.appendChild(document.createTextNode(text.slice(i + q.length)));
    return frag;
  }
  function render() {
    var q = input.value.trim().toLowerCase();
    list.textContent = "";
    if (!index) return;
    var terms = q.split(/\s+/).filter(Boolean);
    var hits = (terms.length ? index.filter(function (p) {
      var hay = (p.t + " " + p.g).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) >= 0; });
    }) : index).slice(0, 40);
    sel = 0;
    if (!hits.length) {
      var li = document.createElement("li"); li.className = "empty";
      li.textContent = "0 results. 换个词试试，或者去全部文章里翻翻。";
      list.appendChild(li); return;
    }
    hits.forEach(function (p, i) {
      var li = document.createElement("li");
      var a = document.createElement("a"); a.href = p.u;
      if (i === 0) a.className = "sel";
      var s = document.createElement("span"); s.appendChild(highlight(p.t, terms[0] || ""));
      var t = document.createElement("time"); t.textContent = p.d;
      a.appendChild(s); a.appendChild(t); li.appendChild(a); list.appendChild(li);
      a.addEventListener("mouseenter", function () { var c = $("a.sel", list); if (c) c.classList.remove("sel"); a.classList.add("sel"); sel = i; });
    });
  }
  function move(d) {
    var links = $$("a", list);
    if (!links.length) return;
    links[sel].classList.remove("sel");
    sel = (sel + d + links.length) % links.length;
    links[sel].classList.add("sel");
    links[sel].scrollIntoView({ block: "nearest" });
  }
  function open() {
    if (dlg.open) return;
    dlg.showModal(); input.select();
    load().then(render, function () {
      list.textContent = "";
      var li = document.createElement("li"); li.className = "empty"; li.textContent = "索引加载失败了，刷新一下试试。";
      list.appendChild(li);
    });
  }
  $$("[data-search-open]").forEach(function (b) { b.addEventListener("click", open); });
  input.addEventListener("input", render);
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") { e.preventDefault(); var a = $$("a", list)[sel]; if (a) location.href = a.href; }
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if ((e.key === "/" && !typing) || (e.key === "k" && (e.metaKey || e.ctrlKey))) { e.preventDefault(); open(); }
    if (e.key === "Escape" && agentView && !agentView.hidden && !dlg.open) setMode("human");
  });
})();
