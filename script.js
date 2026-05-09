/* =============================================
   LUXE — Maison de Mode | Script
   ============================================= */

// === Page Loader ===
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    // Trigger hero animations after loader
    document.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
  }, 2000);
});

// === Mobile Nav ===
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const overlay = document.getElementById('navOverlay');

function openNav() {
  nav.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  nav.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (bar) bar.addEventListener('click', openNav);
if (close) close.addEventListener('click', closeNav);
if (overlay) overlay.addEventListener('click', closeNav);

// Close nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('active')) closeNav();
});

// === Header scroll effect ===
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// === Back to Top ===
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
}, { passive: true });

if (toTop) {
  toTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Scroll Reveal ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Observe product cards, arrival cards, section headers
document.querySelectorAll('.product-card, .arrival-card, .cat-card, .section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

const revealObserverSimple = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80);
      revealObserverSimple.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .arrival-card, .cat-card, .section-header').forEach(el => {
  revealObserverSimple.observe(el);
});

// === Product Tab Filter ===
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // Update active tab
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter products
    productCards.forEach(card => {
      const cat = card.dataset.category;
      if (tab === 'all' || cat === tab) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => card.style.display = 'none', 350);
      }
    });
  });
});

// === Add to Cart ===
const cartToast = document.getElementById('cartToast');
let toastTimer;

function showToast() {
  if (!cartToast) return;
  clearTimeout(toastTimer);
  cartToast.classList.add('show');
  toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Animate button
    btn.style.transform = 'scale(0.85)';
    btn.style.background = 'var(--c-gold)';
    btn.style.color = 'var(--c-bg)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);

    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const current = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = current + 1;
      cartCount.style.transform = 'scale(1.4)';
      setTimeout(() => cartCount.style.transform = '', 300);
    }

    showToast();
  });
});

// === Wishlist Toggle ===
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
      icon.classList.replace('far', 'fas');
      btn.style.background = 'rgba(201,169,110,0.15)';
      btn.style.borderColor = 'var(--c-gold)';
      btn.style.color = 'var(--c-gold)';
    } else {
      icon.classList.replace('fas', 'far');
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }
  });
});

// === Testimonial Slider ===
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');

let current = 0;
const total = dots.length;

function goToSlide(index) {
  current = (index + total) % total;
  if (track) track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(current - 1));
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Auto-advance
let autoSlide = setInterval(() => goToSlide(current + 1), 5000);
const slider = document.getElementById('testimonialSlider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
  });
}

// === Newsletter Form ===
const nlInput = document.querySelector('#newsletter input');
const nlBtn = document.querySelector('#newsletter .btn-primary');

if (nlBtn && nlInput) {
  nlBtn.addEventListener('click', () => {
    const email = nlInput.value.trim();
    if (!email || !email.includes('@')) {
      nlInput.style.borderColor = '#c0392b';
      nlInput.style.outline = '1px solid #c0392b';
      setTimeout(() => {
        nlInput.style.borderColor = '';
        nlInput.style.outline = '';
      }, 1500);
      return;
    }
    nlBtn.textContent = '✓ Subscribed!';
    nlBtn.style.background = '#2ecc71';
    nlInput.value = '';
    setTimeout(() => {
      nlBtn.textContent = 'Subscribe';
      nlBtn.style.background = '';
    }, 3000);
  });
}

// === Staggered card reveal on scroll ===
const productGrid = document.getElementById('productsGrid');
if (productGrid) {
  const gridObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.product-card').forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      gridObserver.disconnect();
    }
  }, { threshold: 0.05 });
  gridObserver.observe(productGrid);
}