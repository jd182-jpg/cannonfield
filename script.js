/* Cannon Field — interactions */
(function () {
  'use strict';

  /* ---- nav: scrolled state + mobile toggle ---- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    var t = document.getElementById('toTop');
    if (window.scrollY > 600) t.classList.add('show');
    else t.classList.remove('show');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var toTop = document.getElementById('toTop');
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- count-up stats ---- */
  function formatNum(n) { return n.toLocaleString('en-US'); }
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.floor(eased * target)) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatNum(target) + suffix;
    }
    requestAnimationFrame(step);
  }
  var counts = document.querySelectorAll('.stat__num[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counts.forEach(function (el) { cio.observe(el); });
  }

  /* ---- active nav link on scroll ---- */
  var sections = ['footprint', 'process', 'affiliates', 'why', 'contact'];
  var navAnchors = {};
  links && links.querySelectorAll('a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') navAnchors[href.slice(1)] = a;
  });
  function markActive() {
    var pos = window.scrollY + 120, current = '';
    sections.forEach(function (id) {
      var s = document.getElementById(id);
      if (s && s.offsetTop <= pos) current = id;
    });
    Object.keys(navAnchors).forEach(function (id) {
      navAnchors[id].classList.toggle('is-current', id === current && !navAnchors[id].classList.contains('nav__cta'));
    });
  }
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();

  /* ---- tile-grid US map ---- */
  // [abbr, row, col]
  var TILES = [
    ['AK',1,1],['ME',1,11],
    ['VT',2,10],['NH',2,11],
    ['WA',3,1],['ID',3,2],['MT',3,3],['ND',3,4],['MN',3,5],['WI',3,7],['MI',3,8],['NY',3,9],['MA',3,10],
    ['OR',4,1],['NV',4,2],['WY',4,3],['SD',4,4],['IA',4,5],['IL',4,6],['IN',4,7],['OH',4,8],['PA',4,9],['NJ',4,10],['CT',4,11],
    ['CA',5,1],['UT',5,2],['CO',5,3],['NE',5,4],['MO',5,5],['KY',5,6],['WV',5,7],['VA',5,8],['MD',5,9],['DE',5,10],['RI',5,11],
    ['AZ',6,2],['NM',6,3],['KS',6,4],['AR',6,5],['TN',6,6],['NC',6,7],['SC',6,8],['DC',6,9],
    ['OK',7,4],['LA',7,5],['MS',7,6],['AL',7,7],['GA',7,8],
    ['HI',8,1],['TX',8,4],['FL',8,9]
  ];
  var OWNED = {CA:1,NV:1,AZ:1,UT:1,CO:1,WY:1,MT:1,ND:1,NM:1,TX:1,OK:1,KS:1,AR:1,LA:1,MS:1,AL:1,TN:1,KY:1,WV:1,VA:1,SC:1};
  var map = document.getElementById('usmap');
  if (map) {
    TILES.forEach(function (t) {
      var b = document.createElement('b');
      b.textContent = t[0];
      b.style.gridRow = t[1];
      b.style.gridColumn = t[2];
      if (OWNED[t[0]]) { b.className = 'on'; b.title = t[0] + ': Cannon Field interests'; }
      map.appendChild(b);
    });
  }
})();
