(function () {
  // 카카오톡 채널 주소 (확정 후 입력)
  var KAKAO_URL = '';

  // Mobile menu
  var header = document.querySelector('.header');
  var menuBtn = document.querySelector('.menu-btn');
  menuBtn.addEventListener('click', function () {
    var open = header.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.mnav a').forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', false);
    });
  });

  // Kakao links
  document.querySelectorAll('[data-kakao]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (KAKAO_URL) { a.href = KAKAO_URL; a.target = '_blank'; return; }
      e.preventDefault();
      alert('카카오톡 채널 주소가 아직 연결되지 않았습니다.');
    });
  });

  // Recommendation tabs
  var tabs = document.querySelectorAll('.rec__tabs button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.querySelectorAll('.rec__panel').forEach(function (p) {
        p.hidden = p.dataset.panel !== t.dataset.tab;
      });
    });
  });

  // Location filter
  var filters = document.querySelectorAll('.loc__filter button');
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      filters.forEach(function (x) { x.classList.toggle('is-on', x === b); });
      document.querySelectorAll('.loc__row[data-status]').forEach(function (r) {
        r.hidden = b.dataset.filter !== 'all' && r.dataset.status !== b.dataset.filter;
      });
    });
  });

  // CTA buttons with a topic prefill the inquiry field
  var form = document.getElementById('consultForm');
  document.querySelectorAll('[data-topic]').forEach(function (a) {
    a.addEventListener('click', function () {
      form.msg.value = '[' + a.dataset.topic + '] 상담을 희망합니다.\n';
    });
  });

  // Form validation (전송 API 연결 전)
  var msg = form.querySelector('.form__msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'phone'].forEach(function (n) {
      var el = form[n];
      var bad = !el.value.trim() || (n === 'phone' && !/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(el.value.trim()));
      el.classList.toggle('is-err', bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.className = 'form__msg err'; msg.textContent = '이름과 연락처를 정확히 입력해 주세요.'; return; }
    if (!form.agree.checked) { msg.className = 'form__msg err'; msg.textContent = '개인정보 수집·이용에 동의해 주세요.'; return; }
    msg.className = 'form__msg ok';
    msg.textContent = '상담 신청이 접수되었습니다. 담당 컨설턴트가 곧 연락드리겠습니다.';
    form.reset();
  });

  // Reveal on scroll
  var targets = document.querySelectorAll('.sec-head, .pain, .acc__item, .rec__panel, .phase, .case, .loc, .faq details, .ins, .trust__item');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }
})();
