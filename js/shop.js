/* =============================================
   LUXE — shop.js (Shop Page Specific Scripts)
   ============================================= */

// === Sidebar Filter Toggle (Mobile) ===
const filterToggle = document.getElementById('filterToggle');
const shopSidebar = document.getElementById('shopSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  shopSidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  shopSidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (filterToggle) filterToggle.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// === Category Filter (Sidebar Radio-style) ===
const filterLabels = document.querySelectorAll('.filter-label');
const shopCards = document.querySelectorAll('.shop-card');
const resultCount = document.querySelector('.result-count strong');

filterLabels.forEach(label => {
  label.addEventListener('click', () => {
    // Update active state
    filterLabels.forEach(l => l.classList.remove('active'));
    label.classList.add('active');

    const filter = label.dataset.filter;

    let visible = 0;
    shopCards.forEach((card, i) => {
      const cat = card.dataset.category;
      const match = filter === 'all' || cat === filter;

      if (match) {
        card.classList.remove('hidden-card');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 40);
        visible++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => card.classList.add('hidden-card'), 320);
      }
    });

    // Update result count after a tick
    setTimeout(() => {
      const actualVisible = document.querySelectorAll('.shop-card:not(.hidden-card)').length;
      if (resultCount) resultCount.textContent = actualVisible;
    }, 350);

    // Update active filter tag
    updateActiveFilterTag(label.textContent.replace(/\d+/g, '').trim());

    // Close sidebar on mobile after filter
    if (window.innerWidth < 900) closeSidebar();
  });
});

function updateActiveFilterTag(name) {
  const firstTag = document.querySelector('.filter-tag');
  if (firstTag) {
    firstTag.innerHTML = `${name} <button class="tag-remove">×</button>`;
    bindTagRemove();
  }
}

function bindTagRemove() {
  document.querySelectorAll('.tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.filter-tag').remove();
    });
  });
}
bindTagRemove();

// Clear all filters
const clearAllBtn = document.querySelector('.clear-all');
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    // Reset to 'all'
    filterLabels.forEach(l => l.classList.remove('active'));
    const allLabel = document.querySelector('.filter-label[data-filter="all"]');
    if (allLabel) allLabel.classList.add('active');

    shopCards.forEach((card, i) => {
      card.classList.remove('hidden-card');
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 30);
    });
    if (resultCount) resultCount.textContent = shopCards.length;

    // Clear active filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => tag.remove());
  });
}

// === Price Range Slider ===
const priceRange = document.getElementById('priceRange');
const priceVal = document.getElementById('priceVal');

if (priceRange && priceVal) {
  function updateRangeTrack() {
    const val = priceRange.value;
    const max = priceRange.max;
    const pct = (val / max) * 100;
    priceRange.style.background = `linear-gradient(to right, var(--c-gold) 0%, var(--c-gold) ${pct}%, var(--c-border) ${pct}%)`;
    priceVal.textContent = `$${val}`;
  }

  priceRange.addEventListener('input', () => {
    updateRangeTrack();

    // Filter cards by price
    const max = parseInt(priceRange.value);
    shopCards.forEach(card => {
      const price = parseInt(card.dataset.price) || 0;
      if (price <= max) {
        card.classList.remove('hidden-card');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => card.classList.add('hidden-card'), 300);
      }
    });
  });

  updateRangeTrack(); // init
}

// === Sort Select ===
const sortSelect = document.getElementById('sortSelect');
const shopGrid = document.getElementById('shopGrid');

if (sortSelect && shopGrid) {
  sortSelect.addEventListener('change', () => {
    const val = sortSelect.value;
    const cards = Array.from(shopCards);

    let sorted;
    switch (val) {
      case 'price-asc':
        sorted = cards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        break;
      case 'price-desc':
        sorted = cards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        break;
      case 'rating':
        sorted = cards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        break;
      case 'newest':
        sorted = cards.sort((a, b) => {
          const aNew = a.querySelector('.shop-badge')?.textContent === 'New' ? 1 : 0;
          const bNew = b.querySelector('.shop-badge')?.textContent === 'New' ? 1 : 0;
          return bNew - aNew;
        });
        break;
      default:
        sorted = cards; // featured = original order
    }

    // Fade out, reorder, fade in
    shopGrid.style.opacity = '0';
    shopGrid.style.transform = 'translateY(8px)';
    setTimeout(() => {
      sorted.forEach(card => shopGrid.appendChild(card));
      shopGrid.style.opacity = '1';
      shopGrid.style.transform = 'translateY(0)';
      shopGrid.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    }, 280);
  });
}

// === Grid / List View Toggle ===
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

if (gridViewBtn && listViewBtn && shopGrid) {
  gridViewBtn.addEventListener('click', () => {
    shopGrid.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    localStorage.setItem('luxeShopView', 'grid');
  });

  listViewBtn.addEventListener('click', () => {
    shopGrid.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    localStorage.setItem('luxeShopView', 'list');
  });

  // Restore saved view preference
  const savedView = localStorage.getItem('luxeShopView');
  if (savedView === 'list') {
    shopGrid.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
  }
}

// === Color Swatches ===
document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

// === Size Buttons (Sidebar) ===
document.querySelectorAll('.sidebar-block .size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
  });
});

// === Apply Filters Button ===
const applyBtn = document.querySelector('.apply-filters-btn');
if (applyBtn) {
  applyBtn.addEventListener('click', () => {
    applyBtn.textContent = '✓ Applied!';
    applyBtn.style.background = '#2ecc71';
    setTimeout(() => {
      applyBtn.textContent = 'Apply Filters';
      applyBtn.style.background = '';
    }, 1800);
    if (window.innerWidth < 900) closeSidebar();
  });
}

// === Quick View Modal ===
const modal = document.getElementById('quickviewModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalBrand = document.getElementById('modalBrand');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');

// Product data map (index matches data-id)
const productData = {
  1:  { img: 'img/products/f1.jpg', brand: 'Maison Luxe',  title: 'Tailored Linen Shirt',      price: '$148' },
  2:  { img: 'img/products/f2.jpg', brand: 'Atelier Co.',  title: 'Cashmere Polo',              price: '$220' },
  3:  { img: 'img/products/f3.jpg', brand: 'Maison Luxe',  title: 'Pure Silk Blouse',           price: '$198' },
  4:  { img: 'img/products/f4.jpg', brand: 'Artisan',      title: 'Full-Grain Leather Belt',    price: '$89'  },
  5:  { img: 'img/products/f5.jpg', brand: 'Atelier Co.',  title: 'Slim Wool Trousers',         price: '$265' },
  6:  { img: 'img/products/f6.jpg', brand: 'Maison Luxe',  title: 'Draped Midi Dress',          price: '$189' },
  7:  { img: 'img/products/f7.jpg', brand: 'Artisan',      title: 'Cashmere Scarf',             price: '$120' },
  8:  { img: 'img/products/f8.jpg', brand: 'Atelier Co.',  title: 'Structured Blazer',          price: '$395' },
  9:  { img: 'img/products/n1.jpg', brand: 'Maison Luxe',  title: 'Crepe Evening Gown',         price: '$420' },
  10: { img: 'img/products/n2.jpg', brand: 'Atelier Co.',  title: 'Heritage Oxford Shirt',      price: '$165' },
  11: { img: 'img/products/n3.jpg', brand: 'Artisan',      title: 'Woven Leather Tote',         price: '$310' },
  12: { img: 'img/products/n4.jpg', brand: 'Maison Luxe',  title: 'Asymmetric Knit Top',        price: '$138' },
  13: { img: 'img/products/n5.jpg', brand: 'Atelier Co.',  title: 'Merino Cardigan',            price: '$245' },
  14: { img: 'img/products/n6.jpg', brand: 'Artisan',      title: 'Suede Chelsea Boots',        price: '$480' },
  15: { img: 'img/products/n7.jpg', brand: 'Maison Luxe',  title: 'Classic Wrap Coat',          price: '$320' },
  16: { img: 'img/products/n8.jpg', brand: 'Atelier Co.',  title: 'Relaxed Linen Trousers',     price: '$175' },
};

function openModal(id) {
  const data = productData[id];
  if (!data || !modal) return;

  if (modalImg)   modalImg.src = data.img;
  if (modalBrand) modalBrand.textContent = data.brand;
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalPrice) modalPrice.textContent = data.price;

  // Reset qty
  const qtyVal = document.getElementById('qtyVal');
  if (qtyVal) qtyVal.textContent = '1';

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.quickview-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = parseInt(btn.dataset.id);
    openModal(id);
  });
});

if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
if (modalClose)   modalClose.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal();
});

// === Modal Size Buttons ===
document.querySelectorAll('.modal-sizes .size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.modal-sizes .size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// === Modal Quantity ===
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus  = document.getElementById('qtyPlus');
const qtyValEl = document.getElementById('qtyVal');

if (qtyMinus && qtyPlus && qtyValEl) {
  qtyMinus.addEventListener('click', () => {
    const v = parseInt(qtyValEl.textContent);
    if (v > 1) qtyValEl.textContent = v - 1;
  });
  qtyPlus.addEventListener('click', () => {
    const v = parseInt(qtyValEl.textContent);
    if (v < 99) qtyValEl.textContent = v + 1;
  });
}

// === Modal Add to Cart ===
const modalAddCart = document.querySelector('.modal-add-cart');
if (modalAddCart) {
  modalAddCart.addEventListener('click', () => {
    const qty = parseInt(qtyValEl?.textContent) || 1;

    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const current = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = current + qty;
      cartCount.style.transform = 'scale(1.4)';
      setTimeout(() => cartCount.style.transform = '', 300);
    }

    // Show toast
    const cartToast = document.getElementById('cartToast');
    if (cartToast) {
      clearTimeout(window._toastTimer);
      cartToast.classList.add('show');
      window._toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
    }

    closeModal();
  });
}

// === Modal Wishlist ===
const modalWishlist = document.querySelector('.modal-wishlist');
if (modalWishlist) {
  modalWishlist.addEventListener('click', () => {
    const icon = modalWishlist.querySelector('i');
    if (icon.classList.contains('far')) {
      icon.classList.replace('far', 'fas');
      modalWishlist.style.borderColor = 'var(--c-gold)';
      modalWishlist.style.color = 'var(--c-gold)';
    } else {
      icon.classList.replace('fas', 'far');
      modalWishlist.style.borderColor = '';
      modalWishlist.style.color = '';
    }
  });
}

// === Wishlist Toggle (Cards) ===
document.querySelectorAll('.shop-card .wishlist-btn').forEach(btn => {
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

// === Add to Cart (Cards) ===
document.querySelectorAll('.shop-card .add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    btn.style.transform = 'scale(0.82)';
    btn.style.background = 'var(--c-gold)';
    btn.style.color = 'var(--c-bg)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const current = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = current + 1;
      cartCount.style.transform = 'scale(1.4)';
      setTimeout(() => cartCount.style.transform = '', 300);
    }

    const cartToast = document.getElementById('cartToast');
    if (cartToast) {
      clearTimeout(window._toastTimer);
      cartToast.classList.add('show');
      window._toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
    }
  });
});

// === Pagination ===
const pageBtns = document.querySelectorAll('.page-btn:not(.page-next)');
pageBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('page-next')) return;
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Smooth scroll to top of grid
    const grid = document.getElementById('shopGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// === Scroll Reveal for Cards ===
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

shopCards.forEach(card => cardObserver.observe(card));