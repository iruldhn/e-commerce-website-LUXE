/* =============================================
   LUXE — cart.js (Cart Page Specific Scripts)
   ============================================= */

// === State ===
const TAX_RATE = 0.10;
const SHIPPING_THRESHOLD = 150;

const coupons = {
  'LUXE20': { type: 'percent', value: 20, label: '20%' },
  'SAVE50': { type: 'fixed',   value: 50, label: '$50' },
  'VIP15':  { type: 'percent', value: 15, label: '15%' },
};

let appliedCoupon = null;

// === DOM Refs ===
const cartItemsEl    = document.getElementById('cartItems');
const cartEmpty      = document.getElementById('cartEmpty');
const cartActions    = document.getElementById('cartActions');
const couponWrap     = document.getElementById('couponWrap');
const cartBadge      = document.getElementById('cartBadge');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryDiscount = document.getElementById('summaryDiscount');
const summaryShipping = document.getElementById('summaryShipping');
const summaryTax      = document.getElementById('summaryTax');
const summaryTotal    = document.getElementById('summaryTotal');
const itemCountEl     = document.getElementById('itemCount');
const discountLine    = document.getElementById('discountLine');

// === Utility ===
function fmt(n) {
  return '$' + n.toFixed(2);
}

// === Recalculate Totals ===
function recalculate() {
  const items = document.querySelectorAll('.cart-item:not(.removing)');
  let subtotal = 0;
  let count = 0;

  items.forEach(item => {
    const price = parseFloat(item.dataset.price) || 0;
    const qty   = parseInt(item.querySelector('.qty-input')?.value) || 1;
    const sub   = price * qty;

    // Update subtotal cell
    const subCell = item.querySelector('.cart-item-subtotal');
    if (subCell) subCell.textContent = fmt(sub);

    subtotal += sub;
    count    += qty;
  });

  // Discount
  let discount = 0;
  if (appliedCoupon) {
    const c = coupons[appliedCoupon];
    if (c.type === 'percent') discount = subtotal * (c.value / 100);
    if (c.type === 'fixed')   discount = Math.min(c.value, subtotal);
  }

  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= SHIPPING_THRESHOLD ? 0 : 15;
  const tax      = afterDiscount * TAX_RATE;
  const total    = afterDiscount + shipping + tax;

  // Update DOM
  if (summarySubtotal) summarySubtotal.textContent = fmt(subtotal);
  if (itemCountEl)     itemCountEl.textContent = items.length;

  if (discount > 0) {
    discountLine.style.display = 'flex';
    if (summaryDiscount) summaryDiscount.textContent = '−' + fmt(discount);
  } else {
    discountLine.style.display = 'none';
  }

  if (summaryShipping) {
    if (shipping === 0) {
      summaryShipping.textContent = 'Free';
      summaryShipping.className = 'shipping-free';
    } else {
      summaryShipping.textContent = fmt(shipping);
      summaryShipping.className = '';
    }
  }

  if (summaryTax)   summaryTax.textContent   = fmt(tax);
  if (summaryTotal) summaryTotal.textContent  = fmt(total);
  if (cartBadge)    cartBadge.textContent     = count;

  // Show/hide empty state
  if (items.length === 0) {
    cartEmpty.style.display  = 'block';
    cartActions.style.display = 'none';
    couponWrap.style.display  = 'none';
  } else {
    cartEmpty.style.display  = 'none';
    cartActions.style.display = 'flex';
    couponWrap.style.display  = 'block';
  }
}

// === Qty Controls ===
function bindQtyControls() {
  document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-box').querySelector('.qty-input');
      const val = parseInt(input.value) || 1;
      if (val > 1) {
        input.value = val - 1;
        recalculate();
        flashSubtotal(btn.closest('.cart-item'));
      }
    });
  });

  document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-box').querySelector('.qty-input');
      const val = parseInt(input.value) || 1;
      if (val < 99) {
        input.value = val + 1;
        recalculate();
        flashSubtotal(btn.closest('.cart-item'));
      }
    });
  });

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
      let v = parseInt(input.value);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 99) v = 99;
      input.value = v;
      recalculate();
    });
  });
}

function flashSubtotal(item) {
  if (!item) return;
  const sub = item.querySelector('.cart-item-subtotal');
  if (!sub) return;
  sub.style.color = 'var(--c-gold-light)';
  sub.style.transform = 'scale(1.08)';
  sub.style.transition = 'all 0.25s ease';
  setTimeout(() => {
    sub.style.color = '';
    sub.style.transform = '';
  }, 400);
}

// === Remove Item ===
function bindRemoveButtons() {
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      if (!item) return;

      item.classList.add('removing');
      item.style.transition = 'opacity 0.35s ease, transform 0.35s ease, max-height 0.4s ease, padding 0.4s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateX(24px)';

      setTimeout(() => {
        item.style.maxHeight = item.offsetHeight + 'px';
        item.style.overflow = 'hidden';
        setTimeout(() => {
          item.style.maxHeight = '0';
          item.style.paddingTop = '0';
          item.style.paddingBottom = '0';
          item.style.borderBottomWidth = '0';
          setTimeout(() => {
            item.remove();
            recalculate();
          }, 420);
        }, 50);
      }, 350);
    });
  });
}

// === Save for Later ===
document.querySelectorAll('.cart-item-wishlist').forEach(btn => {
  btn.addEventListener('click', () => {
    const icon = btn.querySelector('i');
    icon.classList.replace('far', 'fas');
    btn.style.color = 'var(--c-gold)';
    btn.innerHTML = '<i class="fas fa-heart"></i> Saved!';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-heart"></i> Saved for later';
    }, 2000);
  });
});

// === Update Cart Button ===
const updateBtn = document.getElementById('updateCart');
if (updateBtn) {
  updateBtn.addEventListener('click', () => {
    recalculate();
    updateBtn.textContent = '✓ Bag Updated';
    updateBtn.classList.add('updated');
    setTimeout(() => {
      updateBtn.textContent = 'Update Bag';
      updateBtn.classList.remove('updated');
    }, 2000);
  });
}

// === Coupon System ===
const couponInput   = document.getElementById('couponInput');
const couponApply   = document.getElementById('couponApply');
const couponSuccess = document.getElementById('couponSuccess');
const couponRemove  = document.getElementById('couponRemove');
const appliedCode   = document.getElementById('appliedCode');
const discountText  = document.getElementById('discountText');

if (couponApply && couponInput) {
  couponApply.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) {
      shakeCoupon();
      return;
    }

    if (coupons[code]) {
      appliedCoupon = code;
      const c = coupons[code];

      // Show success
      if (appliedCode) appliedCode.textContent = code;
      if (discountText) discountText.textContent = c.label;
      if (couponSuccess) couponSuccess.style.display = 'flex';

      couponInput.value = '';
      couponInput.disabled = true;
      couponApply.textContent = 'Applied ✓';
      couponApply.style.background = '#2ecc71';
      couponApply.disabled = true;

      recalculate();
    } else {
      shakeCoupon();
      couponInput.style.borderColor = '#e74c3c';
      setTimeout(() => couponInput.style.borderColor = '', 1500);
    }
  });

  couponInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') couponApply.click();
  });
}

if (couponRemove) {
  couponRemove.addEventListener('click', () => {
    appliedCoupon = null;
    if (couponSuccess) couponSuccess.style.display = 'none';
    if (couponInput) {
      couponInput.disabled = false;
      couponInput.value = '';
    }
    if (couponApply) {
      couponApply.textContent = 'Apply';
      couponApply.style.background = '';
      couponApply.disabled = false;
    }
    recalculate();
  });
}

function shakeCoupon() {
  const wrap = document.querySelector('.coupon-input-wrap');
  if (!wrap) return;
  wrap.style.animation = 'shake 0.4s ease';
  setTimeout(() => wrap.style.animation = '', 400);
}

// Inject shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

// === Checkout Button ===
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.cart-item:not(.removing)');
    if (items.length === 0) return;

    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.8';

    // Simulate redirect delay
    setTimeout(() => {
      checkoutBtn.innerHTML = '✓ Redirecting...';
      checkoutBtn.style.background = '#2ecc71';
      // window.location.href = 'checkout.html'; // Uncomment when checkout page is ready
      setTimeout(() => {
        checkoutBtn.innerHTML = 'Proceed to Checkout <i class="fas fa-arrow-right"></i>';
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '';
        checkoutBtn.style.background = '';
      }, 2000);
    }, 1400);
  });
}

// === Related Products — Add to Cart ===
document.querySelectorAll('.add-to-cart-related').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.transform = 'scale(0.82)';
    btn.style.background = 'var(--c-gold)';
    btn.style.color = 'var(--c-bg)';
    btn.style.borderColor = 'var(--c-gold)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 200);

    if (cartBadge) {
      const cur = parseInt(cartBadge.textContent) || 0;
      cartBadge.textContent = cur + 1;
      cartBadge.style.transform = 'scale(1.4)';
      setTimeout(() => cartBadge.style.transform = '', 300);
    }

    const toast = document.getElementById('cartToast');
    if (toast) {
      clearTimeout(window._toastTimer);
      toast.classList.add('show');
      window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }
  });
});

// === Wishlist on Related Cards ===
document.querySelectorAll('.cart-related .wishlist-btn').forEach(btn => {
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

// === Init ===
bindQtyControls();
bindRemoveButtons();
recalculate();