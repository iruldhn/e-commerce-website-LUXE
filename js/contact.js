/* =============================================
   LUXE — contact.js (Contact Page Scripts)
   ============================================= */

// === Hero Ken Burns Effect ===
const contactHero = document.querySelector('.contact-hero');
if (contactHero) {
  setTimeout(() => contactHero.classList.add('loaded'), 100);
}

// === Scroll Reveal — Info Cards ===
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
});
const infoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      infoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
infoCards.forEach(card => infoObserver.observe(card));

// === Scroll Reveal — Form & Aside ===
const formWrap  = document.querySelector('.contact-form-wrap');
const aside     = document.querySelector('.contact-aside');
[formWrap, aside].forEach((el, i) => {
  if (!el) return;
  el.style.opacity   = '0';
  el.style.transform = `translateX(${i === 0 ? '-30px' : '30px'})`;
  el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
});
const mainObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateX(0)';
      mainObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
[formWrap, aside].forEach(el => el && mainObserver.observe(el));

// === Character Counter ===
const messageEl  = document.getElementById('message');
const charCountEl = document.getElementById('charCount');
const MAX_CHARS  = 500;

if (messageEl && charCountEl) {
  messageEl.addEventListener('input', () => {
    const len = messageEl.value.length;
    if (len > MAX_CHARS) messageEl.value = messageEl.value.slice(0, MAX_CHARS);
    charCountEl.textContent = Math.min(len, MAX_CHARS);
    charCountEl.style.color = len >= MAX_CHARS * 0.9 ? '#e74c3c' : 'var(--c-gold)';
  });
}

// === Form Validation & Submit ===
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

const rules = {
  firstName : { el: 'firstName', err: 'firstNameErr', msg: 'Please enter your first name.' },
  lastName  : { el: 'lastName',  err: 'lastNameErr',  msg: 'Please enter your last name.' },
  email     : { el: 'email',     err: 'emailErr',     msg: 'Please enter a valid email address.' },
  subject   : { el: 'subject',   err: 'subjectErr',   msg: 'Please select a topic.' },
  message   : { el: 'message',   err: 'messageErr',   msg: 'Please enter your message (min 10 characters).' },
  consent   : { el: 'consent',   err: 'consentErr',   msg: 'Please accept the privacy policy to proceed.' },
};

function setError(rule, msg) {
  const input = document.getElementById(rule.el);
  const errEl = document.getElementById(rule.err);
  if (input)  input.classList.add('error');
  if (errEl)  errEl.textContent = msg || rule.msg;
}

function clearError(rule) {
  const input = document.getElementById(rule.el);
  const errEl = document.getElementById(rule.err);
  if (input)  input.classList.remove('error');
  if (errEl)  errEl.textContent = '';
}

function validateAll() {
  let valid = true;

  // First name
  const fn = document.getElementById('firstName');
  if (!fn || fn.value.trim().length < 2) {
    setError(rules.firstName); valid = false;
  } else clearError(rules.firstName);

  // Last name
  const ln = document.getElementById('lastName');
  if (!ln || ln.value.trim().length < 2) {
    setError(rules.lastName); valid = false;
  } else clearError(rules.lastName);

  // Email
  const em = document.getElementById('email');
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!em || !emailRx.test(em.value.trim())) {
    setError(rules.email); valid = false;
  } else clearError(rules.email);

  // Subject
  const sub = document.getElementById('subject');
  if (!sub || !sub.value) {
    setError(rules.subject); valid = false;
  } else clearError(rules.subject);

  // Message
  const msg = document.getElementById('message');
  if (!msg || msg.value.trim().length < 10) {
    setError(rules.message); valid = false;
  } else clearError(rules.message);

  // Consent
  const con = document.getElementById('consent');
  if (!con || !con.checked) {
    setError(rules.consent); valid = false;
  } else clearError(rules.consent);

  return valid;
}

// Clear errors on input
Object.values(rules).forEach(rule => {
  const el = document.getElementById(rule.el);
  if (el) {
    const evt = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(evt, () => clearError(rule));
  }
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';
    submitBtn.querySelector('.btn-icon').style.display = 'none';
    submitBtn.querySelector('.btn-loader').style.display = 'inline';

    // Simulate API call
    setTimeout(() => {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.querySelector('.btn-icon').style.display = '';
      submitBtn.querySelector('.btn-loader').style.display = 'none';

      // Show success
      if (formSuccess) formSuccess.style.display = 'flex';
      form.reset();
      if (charCountEl) charCountEl.textContent = '0';

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Hide after 6s
      setTimeout(() => {
        if (formSuccess) formSuccess.style.display = 'none';
      }, 6000);
    }, 1800);
  });
}

// === FAQ Accordion ===
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

// Open first FAQ by default
if (faqItems.length > 0) faqItems[0].classList.add('open');

// === Advisor Cards Reveal ===
const advisorCards = document.querySelectorAll('.advisor-card');
advisorCards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateX(20px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`;
});
const advisorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateX(0)';
      advisorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
advisorCards.forEach(card => advisorObserver.observe(card));

// === Newsletter ===
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
    nlBtn.textContent      = '✓ Subscribed!';
    nlBtn.style.background = '#2ecc71';
    nlInput.value          = '';
    setTimeout(() => {
      nlBtn.textContent      = 'Subscribe';
      nlBtn.style.background = '';
    }, 3000);
  });
}