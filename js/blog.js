/* =============================================
   LUXE — blog.js (Blog Page Specific Scripts)
   ============================================= */

// === Hero Ken Burns Effect ===
const blogHero = document.querySelector('.blog-hero');
if (blogHero) {
  setTimeout(() => blogHero.classList.add('loaded'), 100);
}

// === Category Filter ===
const filterBtns  = document.querySelectorAll('.blog-filter-btn');
const blogCards   = document.querySelectorAll('.blog-card');
const featuredCard = document.querySelector('.featured-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;

    // Active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter featured post
    if (featuredCard) {
      const featCat = featuredCard.dataset.cat;
      if (cat === 'all' || featCat === cat) {
        featuredCard.closest('.blog-featured').style.display = '';
      } else {
        featuredCard.closest('.blog-featured').style.display = 'none';
      }
    }

    // Filter blog cards
    blogCards.forEach((card, i) => {
      const cardCat = card.dataset.cat;
      const match   = cat === 'all' || cardCat === cat;

      if (match) {
        card.classList.remove('hidden-card');
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => card.classList.add('hidden-card'), 320);
      }
    });
  });
});

// === Scroll Reveal — Blog Cards ===
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

blogCards.forEach(card => cardObserver.observe(card));

// === Scroll Reveal — Featured Card ===
const featuredEl = document.querySelector('.featured-card');
if (featuredEl) {
  featuredEl.style.opacity   = '0';
  featuredEl.style.transform = 'translateY(30px)';
  featuredEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

  const featObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        featObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  featObserver.observe(featuredEl);
}

// === Sidebar Search ===
const searchInput = document.querySelector('.blog-search-wrap input');
const searchBtn   = document.querySelector('.blog-search-wrap button');

function doSearch() {
  const query = searchInput?.value.trim().toLowerCase();
  if (!query) return;

  let found = 0;
  blogCards.forEach(card => {
    const title   = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
    const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
    const match   = title.includes(query) || excerpt.includes(query);

    if (match) {
      card.classList.remove('hidden-card');
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
      found++;
    } else {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => card.classList.add('hidden-card'), 300);
    }
  });

  // Deactivate filter buttons during search
  filterBtns.forEach(b => b.classList.remove('active'));
}

if (searchBtn)  searchBtn.addEventListener('click', doSearch);
if (searchInput) {
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch();
    // Reset on clear
    if (e.key === 'Escape' || searchInput.value === '') {
      blogCards.forEach(card => {
        card.classList.remove('hidden-card');
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
      });
      const allBtn = document.querySelector('.blog-filter-btn[data-cat="all"]');
      if (allBtn) allBtn.classList.add('active');
    }
  });
}

// === Sticky Filter Bar offset (accounts for header) ===
// Dynamically adjust sticky top if header height changes
function updateStickyOffset() {
  const header    = document.getElementById('header');
  const filterBar = document.querySelector('.blog-filter-bar');
  if (header && filterBar) {
    filterBar.style.top = header.offsetHeight + 'px';
  }
}
updateStickyOffset();
window.addEventListener('resize', updateStickyOffset);
window.addEventListener('scroll', updateStickyOffset, { passive: true });

// === Pagination ===
const pageBtns = document.querySelectorAll('.blog-pagination .page-btn:not(.page-next)');
pageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Scroll to top of blog posts
    const blogSection = document.querySelector('.blog-section');
    if (blogSection) blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// === Widget Category Links filter the posts ===
document.querySelectorAll('.widget-cats a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const catText = link.textContent.replace(/\d+/g, '').trim().toLowerCase();

    // Find matching filter button and click it
    const matchBtn = [...filterBtns].find(b => b.dataset.cat === catText);
    if (matchBtn) {
      matchBtn.click();
      // Scroll filter bar into view
      document.querySelector('.blog-filter-bar')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// === Widget Tags filter the posts ===
document.querySelectorAll('.widget-tags a').forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    const query = tag.textContent.trim().toLowerCase();
    if (searchInput) {
      searchInput.value = query;
      doSearch();
      document.querySelector('.blog-search-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

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