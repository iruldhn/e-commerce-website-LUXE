/* =============================================
   LUXE — about.js (About Page Specific Scripts)
   ============================================= */

// === Hero Ken Burns Effect ===
const aboutHero = document.querySelector('.about-hero');
if (aboutHero) {
  setTimeout(() => aboutHero.classList.add('loaded'), 100);
}

// === Animated Number Counter ===
function animateCounter(el, target, duration = 2000) {
  const start     = performance.now();
  const startVal  = 0;

  function step(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Observe stat numbers and trigger on scroll into view
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target) || 0;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));
}

// === Scroll Reveal — Value Cards ===
const valueCards = document.querySelectorAll('.value-card');
if (valueCards.length) {
  valueCards.forEach((card, i) => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(28px)';
    card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  });

  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        valueObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  valueCards.forEach(card => valueObserver.observe(card));
}

// === Scroll Reveal — Timeline Items ===
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
  timelineItems.forEach((item, i) => {
    const isLeft    = item.classList.contains('left');
    item.style.opacity    = '0';
    item.style.transform  = `translateX(${isLeft ? '-30px' : '30px'})`;
    item.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
  });

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateX(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  timelineItems.forEach(item => timelineObserver.observe(item));
}

// === Scroll Reveal — Team Cards ===
const teamCards = document.querySelectorAll('.team-card');
if (teamCards.length) {
  teamCards.forEach((card, i) => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(32px)';
    card.style.transition = `opacity 0.65s ease ${i * 0.15}s, transform 0.65s ease ${i * 0.15}s`;
  });

  const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        teamObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  teamCards.forEach(card => teamObserver.observe(card));
}

// === Scroll Reveal — About Intro ===
const introImg  = document.querySelector('.about-intro-img');
const introText = document.querySelector('.about-intro-text');

if (introImg && introText) {
  [introImg, introText].forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = `translateX(${i === 0 ? '-40px' : '40px'})`;
    el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
  });

  const introObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateX(0)';
        introObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [introImg, introText].forEach(el => introObserver.observe(el));
}

// === Scroll Reveal — App Section ===
const appText  = document.querySelector('.app-text');
const appVideo = document.querySelector('.app-video-wrap');

if (appText && appVideo) {
  [appText, appVideo].forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = `translateY(${i === 0 ? '24px' : '-24px'})`;
    el.style.transition = `opacity 0.75s ease ${i * 0.2}s, transform 0.75s ease ${i * 0.2}s`;
  });

  const appObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        appObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  [appText, appVideo].forEach(el => appObserver.observe(el));
}

// === Newsletter (shared logic) ===
const nlInput = document.querySelector('#newsletter input');
const nlBtn   = document.querySelector('#newsletter .btn-primary');
if (nlBtn && nlInput) {
  nlBtn.addEventListener('click', () => {
    const email = nlInput.value.trim();
    if (!email || !email.includes('@')) {
      nlInput.style.outline = '1px solid #c0392b';
      setTimeout(() => nlInput.style.outline = '', 1500);
      return;
    }
    nlBtn.textContent  = '✓ Subscribed!';
    nlBtn.style.background = '#2ecc71';
    nlInput.value = '';
    setTimeout(() => {
      nlBtn.textContent  = 'Subscribe';
      nlBtn.style.background = '';
    }, 3000);
  });
}