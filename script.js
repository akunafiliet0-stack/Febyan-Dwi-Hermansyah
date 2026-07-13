// script.js
// ============================================================
// DATA PRODUK
// ============================================================
const PRODUCTS_DATA = [
    { id: 1, name: 'Vans Old Skool - Checkerboard (Leather)', price: 69.99, unit: 'PAIR', minOrder: '10 Pair', stock: 120, sold: 85, rating: 4.8, reviews: 42, badge: 'Best Seller', spec: 'Material: Premium Leather | Color: Checkerboard | Outsole: Rubber', desc: 'Sepatu Vans Old Skool model checkerboard dengan bahan leather premium. Nyaman untuk pemakaian harian, tampil stylish untuk gaya streetwear.', icon: '👟', image: 'Vans Old Skool - Checkerboard (Leather).jpg', hidden: false },
    { id: 2, name: 'Vans Authentic - Black/White Classic', price: 59.50, unit: 'PAIR', minOrder: '10 Pair', stock: 85, sold: 62, rating: 4.9, reviews: 38, badge: 'Classic Core', spec: 'Upper: Canvas | Colorway: Black/White | Sole: Vulcanized Rubber', desc: 'Vans Authentic dengan warna klasik Black/White. Ringan, fleksibel, dan pas untuk segala kombinasi outfit.', icon: '🖤', image: 'Vans Authentic - BlackWhite Classic.jpg', hidden: false },
    { id: 3, name: 'Vans Slip-On - Striped Canvas', price: 54.00, unit: 'PAIR', minOrder: '10 Pair', stock: 60, sold: 43, rating: 4.7, reviews: 29, badge: 'Easy On/Off', spec: 'Upper: Canvas | Fit: Slip-On | Cushion: Comfort Insole', desc: 'Vans Slip-On dengan motif striped canvas. Desain praktis tanpa tali, cocok buat aktivitas santai & travelling.', icon: '🌀', image: 'Vans Slip-On - Striped Canvas.jpg', hidden: false },
    { id: 4, name: 'Vans Sk8-Hi - Suede Brown', price: 84.25, unit: 'PAIR', minOrder: '10 Pair', stock: 200, sold: 210, rating: 4.5, reviews: 51, badge: 'High Top Comfort', spec: 'Material: Suede | Collar: Padded | Laces: Classic', desc: 'Vans Sk8-Hi berbahan suede warna cokelat. High top mendukung kaki lebih stabil dan tetap stylish.', icon: '🟤', image: 'Vans Sk8-Hi - Suede Brown.jpg', hidden: false },
    { id: 5, name: 'Vans Old Skool - Denim Blue', price: 74.00, unit: 'PAIR', minOrder: '10 Pair', stock: 95, sold: 78, rating: 4.6, reviews: 33, badge: 'Denim Edition', spec: 'Upper: Denim | Stitching: Reinforced | Sole: Rubber Cupsole', desc: 'Old Skool denim blue dengan jahitan reinforced. Cocok buat tampilan casual yang lebih berkarakter.', icon: '🔷', image: 'Vans Old Skool - Denim Blue.jpg', hidden: false },
    { id: 6, name: 'Vans Era - Marshmallow Off-White', price: 63.90, unit: 'PAIR', minOrder: '10 Pair', stock: 40, sold: 28, rating: 4.9, reviews: 27, badge: 'Clean Aesthetic', spec: 'Upper: Canvas | Color: Off-White | Lining: Soft Textile', desc: 'Vans Era dengan warna off-white yang clean. Mudah dipadu dan nyaman untuk berbagai kegiatan.', icon: '🤍', image: 'Vans Era - Marshmallow Off-White.jpg', hidden: false },
    { id: 7, name: 'Vans Knu Skool - Beige Mono', price: 99.00, unit: 'PAIR', minOrder: '10 Pair', stock: 75, sold: 55, rating: 4.4, reviews: 22, badge: 'Chunky Style', spec: 'Upper: Suede/Canvas Blend | Cushion: Enhanced | Sole: Waffle Rubber', desc: 'Knu Skool dengan tampilan chunky gaya modern. Empuk dan mendukung langkah lebih nyaman.', icon: '🟫', image: 'Vans Knu Skool - Beige Mono.jpg', hidden: false },
    { id: 8, name: 'Vans Authentic - Tropical Leaf Print', price: 66.50, unit: 'PAIR', minOrder: '10 Pair', stock: 50, sold: 37, rating: 4.8, reviews: 19, badge: 'Limited Print', spec: 'Upper: Canvas Print | Eyelets: Metal | Sole: Rubber', desc: 'Authentic dengan motif tropical leaf print yang cerah. Bikin outfit lebih hidup tanpa menghilangkan kenyamanan.', icon: '🌿', image: 'Vans Authentic - Tropical Leaf Print.jpg', hidden: false },
    { id: 9, name: 'Vans Slip-On - Olive Green', price: 52.75, unit: 'PAIR', minOrder: '10 Pair', stock: 110, sold: 92, rating: 4.3, reviews: 16, badge: 'Everyday Flex', spec: 'Color: Olive | Upper: Canvas | Heel: Supportive Rubber', desc: 'Slip-On olive green untuk tampilan earthy yang stylish. Pas untuk daily wear dan outdoor santai.', icon: '🟢', image: 'Vans Slip-On - Olive Green.jpg', hidden: false },
    { id: 10, name: 'Vans Sk8-Hi - Black/Red Color Pop', price: 88.00, unit: 'PAIR', minOrder: '10 Pair', stock: 300, sold: 156, rating: 4.2, reviews: 14, badge: 'Color Pop', spec: 'Upper: Suede | Accent: Red Stitching | Sole: Rubber', desc: 'Sk8-Hi dengan aksen merah yang kontras. Tetap tegas, rapi, dan siap dipakai untuk street style.', icon: '🔴', image: 'Vans Sk8-Hi - BlackRed Color Pop.jpg', hidden: false }
];

// ============================================================
// STATE
// ============================================================
let products = JSON.parse(JSON.stringify(PRODUCTS_DATA));
let cart = [];
let currentPage = 'home';
let currentPageProducts = 1;
const ITEMS_PER_PAGE = 6;
let currentCurrency = 'USD';
let currentLanguage = 'id';
let isLoggedIn = false;
let userRole = 'buyer'; // 'buyer' | 'admin'
let priceChartInstance = null;

// Variabel Penampung Transaksi WA
let pendingWhatsAppMessage = "";

// Kurs mata uang (statis)
const EXCHANGE_RATES = {
    USD: 1,
    IDR: 16000,
    EUR: 0.92
};
const CURRENCY_SYMBOLS = {
    USD: '$',
    IDR: 'Rp',
    EUR: '€'
};

// ===== DOM REFS =====
const grid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const filterRating = document.getElementById('filterRating');
const sortSelect = document.getElementById('sortSelect');
const currencySelect = document.getElementById('currencySelect');
const catalogResult = document.getElementById('catalogResult');
const pagination = document.getElementById('pagination');
const cartItems = document.getElementById('cartItems');
const cartTotalValue = document.getElementById('cartTotalValue');
const clearCartBtn = document.getElementById('clearCartBtn');
const selectedCommodityInput = document.getElementById('selectedCommodity');
const orderQuantityInput = document.getElementById('orderQuantity');
const quantityUnitInput = document.getElementById('quantityUnit');
const summaryItemCount = document.getElementById('summaryItemCount');
const summaryTotalValue = document.getElementById('summaryTotalValue');
const summaryPaymentMethod = document.getElementById('summaryPaymentMethod');
const adminTableBody = document.getElementById('adminTableBody');
const adminStatus = document.getElementById('adminStatus');
const adminResetBtn = document.getElementById('adminResetStockBtn');
const adminTotalProducts = document.getElementById('adminTotalProducts');
const adminTotalStock = document.getElementById('adminTotalStock');
const adminLowStock = document.getElementById('adminLowStock');
const toastContainer = document.getElementById('toastContainer');
const breadcrumbText = document.getElementById('breadcrumbText');

const pageTriggers = document.querySelectorAll('[data-page]');
const navMenuLinks = document.querySelectorAll('.nav-link[data-page]');
const mobileToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const loginModal = document.getElementById('loginModal');
const loginModalClose = document.getElementById('loginModalClose');
const loginForm = document.getElementById('loginForm');
const loginNavLink = document.getElementById('loginNavLink');
const adminNavLink = document.getElementById('adminNavLink');
const loginRole = document.getElementById('loginRole');
const adminPasswordGroup = document.getElementById('adminPasswordGroup');
const rfqModal = document.getElementById('rfqModal');
const rfqModalClose = document.getElementById('rfqModalClose');
const rfqForm = document.getElementById('rfqForm');
const rfqProductId = document.getElementById('rfqProductId');
const langToggle = document.getElementById('langToggle');
const paymentMethodSelect = document.getElementById('paymentMethod');

// DOM Refs Modals Flow Checkout
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');

// ===== STORAGE =====
function saveStockToLocalStorage() {
    const data = products.map(p => ({
        id: p.id,
        stock: p.stock,
        sold: p.sold,
        price: p.price,
        hidden: p.hidden
    }));
    try { localStorage.setItem('nax_product_data', JSON.stringify(data)); } catch (e) {}
}

function loadStockFromLocalStorage() {
    try {
        const raw = localStorage.getItem('nax_product_data');
        if (raw) {
            const data = JSON.parse(raw);
            data.forEach(item => {
                const p = products.find(prod => prod.id === item.id);
                if (p) {
                    if (item.stock !== undefined) p.stock = item.stock;
                    if (item.sold !== undefined) p.sold = item.sold;
                    if (item.price !== undefined) p.price = item.price;
                    if (item.hidden !== undefined) p.hidden = item.hidden;
                }
            });
        }
    } catch (e) {}
}

function saveCartToLocalStorage() {
    try { localStorage.setItem('nax_cart', JSON.stringify(cart)); } catch (e) {}
}

function loadCartFromLocalStorage() {
    try {
        const raw = localStorage.getItem('nax_cart');
        if (raw) cart = JSON.parse(raw);
    } catch (e) {}
}

function saveAuthToLocalStorage() {
    try {
        localStorage.setItem('nax_auth', JSON.stringify({ isLoggedIn, userRole }));
    } catch (e) {}
}

function loadAuthFromLocalStorage() {
    try {
        const raw = localStorage.getItem('nax_auth');
        if (raw) {
            const data = JSON.parse(raw);
            isLoggedIn = data.isLoggedIn || false;
            userRole = data.userRole || 'buyer';
        }
    } catch (e) {}
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

function hapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// ===== CURRENCY FORMATTING =====
function formatPrice(priceUSD) {
    const rate = EXCHANGE_RATES[currentCurrency] || 1;
    const symbol = CURRENCY_SYMBOLS[currentCurrency] || '$';
    const converted = priceUSD * rate;
    if (currentCurrency === 'IDR') {
        return symbol + Math.round(converted).toLocaleString('id-ID');
    }
    return symbol + converted.toFixed(2);
}

// ===== CART =====
function addToCart(productId) {
    const p = products.find(prod => prod.id === productId);
    if (!p) return;
    if (p.stock <= 0) {
        showToast('⛔ Stok habis!', 'error');
        return;
    }
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        if (existing.qty >= p.stock) {
            showToast(`⛔ Stok maksimal tercapai (${p.stock} ${p.unit})`, 'error');
            return;
        }
        existing.qty += 1;
    } else {
        cart.push({ productId, qty: 1 });
    }
    saveCartToLocalStorage();
    renderCart();
    hapticFeedback();
    showToast(`✅ ${p.name} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCartToLocalStorage();
    renderCart();
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCartToLocalStorage();
    renderCart();
    showToast('🗑️ Keranjang dikosongkan.', 'info');
}

function updateCartQty(productId, change) {
    const item = cart.find(i => i.productId === productId);
    if (!item) return;

    const p = products.find(prod => prod.id === productId);

    if (change === -1 && item.qty === 1) {
        if (confirm(`Hapus ${p.name} dari keranjang?`)) {
            removeFromCart(productId);
        }
        return;
    }

    if (change === 1 && item.qty >= p.stock) {
        showToast(`⛔ Hanya tersedia ${p.stock} ${p.unit} untuk produk ini.`, 'error');
        return;
    }

    item.qty += change;
    saveCartToLocalStorage();
    renderCart();
    hapticFeedback();
}

cartItems.addEventListener('click', function(e) {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;
    const id = parseInt(btn.getAttribute('data-id'));
    const isPlus = btn.classList.contains('plus');
    updateCartQty(id, isPlus ? 1 : -1);
});

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Belum ada produk dipilih.</p>';
        cartTotalValue.textContent = formatPrice(0);
        summaryItemCount.textContent = '0';
        summaryTotalValue.textContent = formatPrice(0);
        selectedCommodityInput.value = 'Tambahkan produk dari katalog';
        return;
    }
    
    let html = '';
    let total = 0;
    let itemCount = 0;
    let commodityNames = [];
    
    cart.forEach(item => {
        const p = products.find(prod => prod.id === item.productId);
        if (!p) return;
        
        let qty = item.qty;
        let discount = 0;
        let unitPrice = p.price;
        if (p.unit === 'MT' && qty > 5) {
            discount = 0.05;
        }
        
        const subtotal = unitPrice * (p.unit === 'MT' ? qty * 1000 : qty);
        const discountedSubtotal = subtotal * (1 - discount);
        
        total += discountedSubtotal;
        itemCount += qty;
        commodityNames.push(`${p.name} (${qty} ${p.unit})`);

        const displayPrice = formatPrice(unitPrice);
        const displaySubtotal = formatPrice(discountedSubtotal);
        const displayOriginal = formatPrice(subtotal);

        const disablePlus = qty >= p.stock ? 'disabled' : '';

        html += `
            <div class="cart-item">
                <span class="item-info">${p.name} <br> <small style="color:var(--text-muted);">@ ${displayPrice} / ${p.unit}</small></span>
                
                <div class="cart-qty-controls">
                    <button class="qty-btn minus" data-id="${p.id}" aria-label="Kurangi kuantitas">-</button>
                    <span class="qty-display">${qty}</span>
                    <button class="qty-btn plus" data-id="${p.id}" ${disablePlus} aria-label="Tambah kuantitas">+</button>
                </div>

                <span class="item-price">
                    ${discount > 0 ? `<span class="original">${displayOriginal}</span>` : ''}
                    ${displaySubtotal}
                    ${discount > 0 ? `<span class="discount">(-5% bulk)</span>` : ''}
                </span>
                
                <button class="item-remove" onclick="removeFromCart(${p.id})" aria-label="Hapus produk">&times;</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotalValue.textContent = formatPrice(total);
    summaryItemCount.textContent = itemCount;
    summaryTotalValue.textContent = formatPrice(total);
    selectedCommodityInput.value = commodityNames.join('; ') || 'Tambahkan produk dari katalog';
}

clearCartBtn.addEventListener('click', clearCart);

// ===== RFQ =====
function openRFQ(productId) {
    rfqProductId.value = productId;
    rfqModal.classList.add('open');
}

rfqModalClose.addEventListener('click', () => rfqModal.classList.remove('open'));
rfqModal.addEventListener('click', (e) => {
    if (e.target === rfqModal) rfqModal.classList.remove('open');
});

rfqForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const productId = parseInt(rfqProductId.value);
    const p = products.find(prod => prod.id === productId);
    if (!p) { showToast('Produk tidak ditemukan.', 'error'); return; }
    const company = document.getElementById('rfqCompany').value.trim();
    const email = document.getElementById('rfqEmail').value.trim();
    const targetPrice = document.getElementById('rfqTargetPrice').value || '-';
    const volume = document.getElementById('rfqVolume').value || '-';
    const incoterms = document.getElementById('rfqIncoterms').value;
    const notes = document.getElementById('rfqNotes').value.trim() || '-';

    if (!company || !email) {
        showToast('⚠️ Harap isi Nama Perusahaan dan Email.', 'error');
        return;
    }

    const msg = `*REQUEST FOR QUOTATION (RFQ) - NAX B2B*
----------------------------------------
*Produk:* ${p.name}
*Perusahaan:* ${company}
*Email:* ${email}
*Target Harga:* ${targetPrice} USD
*Volume:* ${volume} MT
*Incoterms:* ${incoterms}
*Catatan:* ${notes}
----------------------------------------
Mohon kirimkan penawaran resmi terbaik.`;

    window.open(`https://wa.me/6285860095139?text=${encodeURIComponent(msg)}`, '_blank');
    rfqModal.classList.remove('open');
    showToast('📩 RFQ terkirim via WhatsApp!', 'success');
    rfqForm.reset();
});

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const ratingFilter = filterRating.value;
    const sortKey = sortSelect.value;

    let filtered = products.filter(p => {
        if (p.hidden) return false;
        const matchName = p.name.toLowerCase().includes(searchTerm);
        let matchRating = true;
        if (ratingFilter === '4') matchRating = p.rating >= 4.0;
        else if (ratingFilter === '4.5') matchRating = p.rating >= 4.5;
        return matchName && matchRating;
    });

    switch (sortKey) {
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'sold-desc':
            filtered.sort((a, b) => b.sold - a.sold);
            break;
        case 'stock-desc':
            filtered.sort((a, b) => b.stock - a.stock);
            break;
        default:
            break;
    }

    catalogResult.textContent = `Menampilkan ${filtered.length} dari ${products.filter(p => !p.hidden).length} produk`;

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPageProducts > totalPages) currentPageProducts = 1;
    const start = (currentPageProducts - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    if (pageItems.length === 0) {
        grid.innerHTML = `<div class="no-products" style="grid-column:1/-1; text-align:center; padding:40px 20px; color:var(--text-muted);">
            <span style="font-size:40px; display:block; margin-bottom:12px;">🔍</span>
            <h3 style="font-family:'Playfair Display',serif; font-size:20px;">Tidak ada produk yang ditemukan</h3>
            <p>Coba ubah kata kunci atau filter pencarian Anda.</p>
        </div>`;
        pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = pageItems.map(p => {
        const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(p.rating));
        const stockStatus = p.stock <= 0 ? 'out' : p.stock < 10 ? 'low' : 'normal';
        const stockLabel = p.stock <= 0 ? 'Stok Habis' : p.stock < 10 ? 'Stok Terbatas' : `${p.stock} ${p.unit}`;
        const soldDisplay = p.sold >= 1000 ? `${Math.floor(p.sold/1000)}rb+` : p.sold >= 100 ? `${p.sold}+` : p.sold;
        const imagePath = p.image ? `images/${p.image}` : '';
        const displayPrice = formatPrice(p.price);

        return `
            <div class="product-card">
                <div class="product-img-container">
                    ${imagePath ? `<img src="${imagePath}" alt="${p.name}" style="width:100%; height:180px; object-fit:cover;" />` :
                    `<div class="image-placeholder prod-img-placeholder">
                        <div class="placeholder-overlay">
                            <span class="icon">${p.icon}</span>
                            <span class="placeholder-text">${p.name}</span>
                        </div>
                    </div>`}
                    <span class="prod-badge">${p.badge}</span>
                    <span class="prod-stock-badge ${stockStatus}">${stockLabel}</span>
                </div>
                <div class="product-info">
                    <h3 class="prod-title">${p.name}</h3>
                    <div class="prod-rating-sold">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">${p.rating.toFixed(1)}</span>
                        <span class="rating-text">(${p.reviews} ulasan)</span>
                        <span class="sold-text">· Terjual ${soldDisplay}</span>
                    </div>
                    <p class="prod-spec">${p.spec}</p>
                    <p class="prod-desc">${p.desc}</p>
                    <div class="prod-price-box">
                        <span class="price-label">Estimasi Harga FOB:</span>
                        <span class="price-value">${displayPrice} / ${p.unit}</span>
                        <span class="min-order">Minimal Order: ${p.minOrder}</span>
                    </div>
                    <div style="display:flex; gap:6px; margin-bottom:6px; flex-wrap:wrap;">
                        <button class="btn-tds" onclick="alert('📄 Unduh TDS/Sertifikat untuk ${p.name} (placeholder)')">📄 Unduh TDS/Sertifikat</button>
                    </div>
                    <div class="product-actions">
                        <button class="btn-action btn-add-cart" onclick="addToCart(${p.id})" ${p.stock <= 0 ? 'disabled' : ''}>
                            ${p.stock <= 0 ? '⛔ Stok Habis' : '🛒 Tambah ke Keranjang'}
                        </button>
                        <div style="display:flex; gap:6px;">
                            <a href="https://wa.me/6285860095139?text=Halo%20NAX,%20saya%20tertarik%20pesan%20${encodeURIComponent(p.name)}." target="_blank" class="btn-action btn-wa" style="flex:1;">💬 Pesan WA</a>
                            <button class="btn-action btn-rfq" onclick="openRFQ(${p.id})" style="flex:0.6;">📩 RFQ</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    let pagHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        pagHtml += `<button class="${i === currentPageProducts ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    pagination.innerHTML = pagHtml;
    pagination.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            currentPageProducts = parseInt(this.dataset.page);
            renderProducts();
        });
    });
}

// ===== ADMIN =====
function renderAdminPage() {
    let totalStock = 0;
    let lowStockCount = 0;
    const visibleCount = products.filter(p => !p.hidden).length;
    products.forEach(p => {
        totalStock += p.stock;
        if (p.stock < 10 && p.stock > 0) lowStockCount++;
    });
    adminTotalProducts.textContent = `${visibleCount}/${products.length}`;
    adminTotalStock.textContent = totalStock;
    adminLowStock.textContent = lowStockCount;

    adminTableBody.innerHTML = products.map((p, index) => {
        const visText = p.hidden ? 'Sembunyikan' : 'Tampilkan';
        const visClass = p.hidden ? 'hide' : 'show';
        return `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${p.name}</strong> ${p.hidden ? '<span style="color:var(--danger-red);font-size:10px;"> [Hidden]</span>' : ''}</td>
                <td>${p.stock} ${p.unit}</td>
                <td>${p.sold}</td>
                <td>
                    <input type="number" class="price-input" id="adminPriceInput_${p.id}" value="${p.price}" min="0" step="0.01" style="width:70px;" />
                    <button class="btn-price-update" onclick="updatePrice(${p.id})">Update</button>
                </td>
                <td>
                    <button class="btn-toggle-vis ${visClass}" onclick="toggleVisibility(${p.id})">${visText}</button>
                </td>
                <td>
                    <input type="number" class="stock-input" id="adminStockInput_${p.id}" value="${p.stock}" min="0" step="1" style="width:60px;" />
                    <button class="btn-stock-update" onclick="updateStock(${p.id})">Update</button>
                </td>
            </tr>
        `;
    }).join('');
    adminStatus.textContent = '✅ Semua perubahan tersimpan otomatis.';
}

function updateStock(id) {
    const input = document.getElementById(`adminStockInput_${id}`);
    if (!input) return;
    const newStock = parseInt(input.value);
    if (isNaN(newStock) || newStock < 0) {
        showToast('⚠️ Masukkan jumlah stok yang valid (angka ≥ 0).', 'error');
        return;
    }
    const p = products.find(prod => prod.id === id);
    if (p) {
        p.stock = newStock;
        saveStockToLocalStorage();
        renderProducts();
        renderAdminPage();
        showToast(`✅ Stok "${p.name}" diperbarui menjadi ${newStock} ${p.unit}`, 'success');
    }
}

function updatePrice(id) {
    const input = document.getElementById(`adminPriceInput_${id}`);
    if (!input) return;
    const newPrice = parseFloat(input.value);
    if (isNaN(newPrice) || newPrice < 0) {
        showToast('⚠️ Masukkan harga yang valid (angka ≥ 0).', 'error');
        return;
    }
    const p = products.find(prod => prod.id === id);
    if (p) {
        p.price = newPrice;
        saveStockToLocalStorage();
        renderProducts();
        renderAdminPage();
        showToast(`✅ Harga "${p.name}" diperbarui menjadi ${formatPrice(newPrice)}`, 'success');
    }
}

function toggleVisibility(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    p.hidden = !p.hidden;
    saveStockToLocalStorage();
    renderProducts();
    renderAdminPage();
    showToast(`${p.hidden ? '🙈' : '👁️'} "${p.name}" ${p.hidden ? 'disembunyikan' : 'ditampilkan'}`, 'success');
}

function resetAllStocks() {
    if (!confirm('⚠️ Reset semua stok ke nilai default? Data saat ini akan hilang.')) return;
    products = JSON.parse(JSON.stringify(PRODUCTS_DATA));
    saveStockToLocalStorage();
    renderProducts();
    renderAdminPage();
    showToast('↺ Semua stok telah direset ke default.', 'success');
}

adminResetBtn.addEventListener('click', resetAllStocks);

// ===== AUTH =====
function updateAuthUI() {
    if (isLoggedIn && userRole === 'admin') {
        adminNavLink.style.display = 'inline-block';
        loginNavLink.textContent = '👤 ' + (currentLanguage === 'id' ? 'Keluar' : 'Logout');
        loginNavLink.dataset.logout = 'true';
    } else if (isLoggedIn) {
        adminNavLink.style.display = 'none';
        loginNavLink.textContent = '👤 ' + (currentLanguage === 'id' ? 'Keluar' : 'Logout');
        loginNavLink.dataset.logout = 'true';
    } else {
        adminNavLink.style.display = 'none';
        loginNavLink.textContent = '🔑 ' + (currentLanguage === 'id' ? 'Login' : 'Login');
        loginNavLink.dataset.logout = 'false';
    }
}

loginNavLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (this.dataset.logout === 'true') {
        isLoggedIn = false;
        userRole = 'buyer';
        saveAuthToLocalStorage();
        updateAuthUI();
        showToast('👋 Anda telah keluar.', 'info');
        if (currentPage === 'admin') navigateTo('home');
        return;
    }
    loginModal.classList.add('open');
});

loginModalClose.addEventListener('click', () => loginModal.classList.remove('open'));
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.remove('open');
});

loginRole.addEventListener('change', function() {
    adminPasswordGroup.style.display = this.value === 'admin' ? 'block' : 'none';
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('loginName').value.trim();
    const role = loginRole.value;
    const password = document.getElementById('loginPassword').value;

    if (!name) {
        showToast('⚠️ Masukkan nama Anda.', 'error');
        return;
    }

    if (role === 'admin') {
        if (password !== 'nax2026') {
            showToast('⛔ Kode admin salah!', 'error');
            return;
        }
        userRole = 'admin';
        isLoggedIn = true;
        showToast(`✅ Selamat datang Admin ${name}!`, 'success');
    } else {
        userRole = 'buyer';
        isLoggedIn = true;
        showToast(`🛒 Selamat datang ${name}!`, 'success');
    }
    saveAuthToLocalStorage();
    updateAuthUI();
    loginModal.classList.remove('open');
    loginForm.reset();
    adminPasswordGroup.style.display = 'none';
});

// ===== NAVIGATION =====
function navigateTo(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');

    navMenuLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    const pageNames = {
        home: 'Beranda',
        about: 'Sejarah & Visi',
        products: 'Katalog Produk',
        analytics: 'Data & Probabilitas',
        checkout: 'B2B Portal',
        admin: 'Panel Admin'
    };
    breadcrumbText.textContent = pageNames[page] || page;
    currentPage = page;

    if (page === 'products') renderProducts();
    if (page === 'checkout') renderCart();
    if (page === 'admin') {
        if (isLoggedIn && userRole === 'admin') {
            renderAdminPage();
        } else {
            showToast('🔒 Akses Admin memerlukan login.', 'error');
            navigateTo('home');
        }
    }
    if (page === 'analytics') {
        setTimeout(initPriceChart, 300);
    }

    navMenu.classList.remove('open');
}

pageTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page === 'admin' && !(isLoggedIn && userRole === 'admin')) {
            showToast('🔒 Silakan login sebagai Admin terlebih dahulu.', 'error');
            loginModal.classList.add('open');
            return;
        }
        navigateTo(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// ===== STICKY NAVBAR =====
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== CURRENCY =====
currencySelect.addEventListener('change', function() {
    currentCurrency = this.value;
    renderProducts();
    renderCart();
});

// ===== MULTI-BAHASA =====
const translations = {
    id: {
        brandName: 'INDONESIA',
        brandSub: 'Vans Community',
        navHome: 'Beranda',
        navAbout: 'Sejarah & Visi',
        navProducts: 'Katalog Produk',
        navAnalytics: 'Data & Probabilitas',
        navCheckout: 'Pembelian',
        navAdmin: '⚙️ Admin',
        navLogin: '🔑 Login',
        breadcrumbHome: 'Beranda',
        heroBadge: 'KOMUNITAS PECINTA SEPATU VANS INDONESIA',
        heroTitle: 'Menggabungkan Segala Komunitas Jalanan Untuk Mengekpresikan Diri Lewat Sepatu Vans',
        heroDesc: 'Indonesia Vans Community (IVC) adalah wadah bagi para kolektor, komunitas jalanan, dan penggemar Vans untuk berbagi informasi seputar rilisan terbaru, edisi kolaborasi, tips merawat sepatu, hingga event komunitas di seluruh Indonesia.',
        heroBtnExplore: 'Eksplorasi Produk',
        heroBtnRegulasi: 'Pelajari Regulasi',
        aboutSub: 'Profil Kami',
        aboutTitle: 'Sejarah, Visi dan Misi',
        aboutHead: 'PERJALANAN KAMI',
        aboutP1: 'Indonesia Vans Community (IVC) lahir dari kecintaan yang sama terhadap budaya skateboard, musik, dan gaya hidup santai khas California yang dibawa oleh Vans sejak pertama kali diperkenalkan pada tahun 1966. Berawal dari sekumpulan kecil skater dan kolektor sepatu di berbagai kota di Indonesia, komunitas ini tumbuh menjadi wadah bagi ribuan pecinta Vans dari berbagai latar belakang — mulai dari skater jalanan, seniman, hingga kolektor sneaker.',
        aboutP2: 'Seiring waktu, IVC berkembang tidak hanya sebagai tempat berbagi informasi seputar rilisan terbaru dan edisi kolaborasi, tetapi juga sebagai ruang untuk mempererat persaudaraan lewat berbagai kegiatan komunitas, mulai dari sesi skate bareng, meetup, hingga charity event.',
        aboutP3: 'Memasuki era digital, IVC turut bertransformasi dengan memperluas jangkauan komunitas melalui media sosial dan platform online, mempermudah anggota dari Sabang hingga Merauke untuk saling terhubung, berbagi informasi rilisan terbaru, hingga bertukar cerita seputar koleksi masing-masing.',
        stat1: 'Koperasi Mitra Tani Nusantara',
        stat2: 'Negara Tujuan Ekspor Aktif',
        stat3: 'Traceability & Dokumen Legal Cleared',
        stat4: 'Ketergantungan Tengkulak Pihak Ketiga',
        productsSub: 'Katalog Produk',
        productsTitle: 'Semua Orang bakal keren Kalau Pakai VANS',
        productsDesc: 'Produk Original',
        searchPlaceholder: 'Cari produk...',
        filterAll: '⭐ Semua Rating',
        filter4: '4+ Bintang',
        filter45: '4.5+ Bintang',
        sortNameAsc: 'Nama A-Z',
        sortNameDesc: 'Nama Z-A',
        sortPriceAsc: 'Harga Terendah',
        sortPriceDesc: 'Harga Tertinggi',
        sortRating: 'Rating Tertinggi',
        sortSold: 'Terjual Terbanyak',
        sortStock: 'Stok Terbanyak',
        analyticsBadge: 'Smart B2B Infrastructure',
        analyticsTitle: 'Keputusan Bisnis Berbasis Data & Prediksi Probabilitas Pasar',
        analyticsDesc: 'Kami tidak sekadar menjual komoditas; platform NAX dilengkapi dengan mesin komputasi statistik untuk membantu pembeli internasional menganalisis probabilitas tren harga, fluktuasi pasokan musiman, serta manajemen risiko rantai pasok secara real-time.',
        analyticsLi1: 'Prediksi Volume Pasokan: Perhitungan matematis berbasis tren cuaca dan historis panen.',
        analyticsLi2: 'Transparansi Fakta & Peristiwa: Log aktivitas pengadaan, sertifikasi uji lab, dan pelacakan kontainer terintegrasi.',
        analyticsLi3: 'Otomatisasi Administrasi Dokumen: Penerbitan Commercial Invoice, Packing List, dan COO secara instan.',
        chartTitle: '📈 Tren Harga Komoditas (Real-time)',
        checkoutTitle: 'Sistem Formulir Ekspor & Integrasi WhatsApp',
        checkoutDesc: 'Lengkapi data administrasi bisnis berikut. Sistem otomatis menyusun draf pesanan formal yang akan diteruskan langsung ke WhatsApp Enterprise Trade Specialist kami.',
        cartTitle: '🛒 Keranjang Belanja',
        cartEmpty: 'Belum ada produk dipilih.',
        cartTotal: 'Total Estimasi (FOB):',
        cartClear: 'Kosongkan Keranjang',
        formCompany: 'Nama Perusahaan / Institusi *',
        formBuyer: 'Nama Perwakilan Pembeli *',
        formEmail: 'Email Korporat *',
        formPhone: 'Nomor WhatsApp/Telepon Aktif *',
        formCountry: 'Negara Tujuan Pengapalan *',
        formIncoterms: 'Incoterms Pemilihan *',
        formPayment: 'Metode Pembayaran *',
        formCommodity: 'Komoditas yang Dipilih (dari keranjang) *',
        formQty: 'Volume Pesanan (untuk item pertama)',
        formUnit: 'Satuan Volume',
        formNotes: 'Catatan Tambahan Spesifikasi / Sertifikasi',
        checkoutSubmit: '🚀 Kirim Data & Proses Pembayaran',
        summaryTitle: 'B2B Gate-Pass Clearance',
        summaryInvoice: 'Draf Invoice Proforma Sementara:',
        summaryVendor: 'Platform Vendor:',
        summaryItems: 'Jumlah Item:',
        summaryPayment: 'Metode Pembayaran:',
        summaryTotal: 'Total Nilai Komoditas (FOB):',
        complianceTitle: '📋 Kelengkapan Administrasi Terintegrasi:',
        securityBadge: '🛡️ Transaksi aman dilindungi sistem Letter of Credit (L/C) perbankan internasional & Rekening Escrow Terverifikasi.',
        adminSub: 'Panel Administrasi',
        adminTitle: 'Manajemen Stok, Harga & Visibilitas Produk',
        adminDesc: 'Kelola stok, harga, dan tampilan produk. Perubahan akan langsung tersimpan dan terintegrasi dengan katalog.',
        adminStatProducts: 'Total Produk',
        adminStatStock: 'Total Stok',
        adminStatLow: 'Produk Stok Rendah (<10)',
        adminThCommodity: 'Komoditas',
        adminThStock: 'Stok',
        adminThSold: 'Terjual',
        adminThPrice: 'Harga (USD)',
        adminThVisibility: 'Visibilitas',
        adminThAction: 'Aksi',
        adminReset: '↺ Reset Semua Stok ke Default',
        contactHead: 'Nusantara Agri-Exchange Headquarters',
        contactEmail: 'Corporate Email:',
        contactPhone: 'International Hotline:',
        contactWA: 'WhatsApp Trade Specialist:',
        contactHours: 'Jam Operasional Perdagangan',
        contactMonFri: 'Senin - Jumat: 08:00 - 17:00 (WIB)',
        contactSat: 'Sabtu (Layanan Logistik & Pelabuhan): 08:00 - 13:00 (WIB)',
        contactNote: '*Untuk pembeli internasional dengan perbedaan zona waktu ekstrim, diprioritaskan via formulir enkripsi WhatsApp 24 jam.',
        footerCopy: '© 2026 PT Nusantara Agri-Exchange. Seluruh Hak Cipta Dilindungi. Sistem Administrasi Bisnis & Rantai Pasok Berkelanjutan.',
        footerTerms: 'Syarat & Ketentuan Perdagangan',
        footerPrivacy: 'Kebijakan Privasi Data GDPR',
        footerCustoms: 'Regulasi Bea Cukai & Ekspor',
        loginTitle: '🔐 Akses Sistem',
        loginDesc: 'Masuk sebagai Pembeli atau Admin untuk mengakses fitur penuh.',
        loginNameLabel: 'Nama / Username',
        loginRoleLabel: 'Login Sebagai',
        loginRoleBuyer: '🛒 Pembeli',
        loginRoleAdmin: '⚙️ Admin',
        loginPasswordLabel: 'Kode Akses Admin',
        loginSubmit: 'Masuk',
        loginHint: '* Admin: masukkan kode "nax2026" untuk akses penuh.',
        rfqTitle: '📩 Minta Penawaran (RFQ)',
        rfqDesc: 'Isi detail kebutuhan Anda, tim kami akan merespon dalam 1x24 jam.',
        rfqCompanyLabel: 'Nama Perusahaan *',
        rfqEmailLabel: 'Email Korporat *',
        rfqTargetPriceLabel: 'Target Harga (USD/MT atau USD/KG)',
        rfqVolumeLabel: 'Volume (MT)',
        rfqIncotermsLabel: 'Incoterms Pilihan',
        rfqNotesLabel: 'Catatan Tambahan',
        rfqSubmit: 'Kirim RFQ via WhatsApp'
    },
    en: {
        brandName: 'INDONESIA',
        brandSub: 'Vans Community',
        navHome: 'Home',
        navAbout: 'History & Vision',
        navProducts: 'Product Catalog',
        navAnalytics: 'Data & Probability',
        navCheckout: 'Checkout',
        navAdmin: '⚙️ Admin',
        navLogin: '🔑 Login',
        breadcrumbHome: 'Home',
        heroBadge: 'Product Streetwear & Lifestyle Original dari Vans',
        heroTitle: 'Connecting Nusantara\'s Comparative Advantage to Global Markets',
        heroDesc: 'Nusantara Agri-Exchange (NAX) modernizes the export supply chain for Indonesian Specialty Coffee and Premium Spices through automated business administration, data transparency, and integrated shipping.',
        heroBtnExplore: 'Explore Products',
        heroBtnRegulasi: 'Learn Regulations',
        aboutSub: 'Corporate Profile',
        aboutTitle: 'History, Roots & Our Commitment',
        aboutHead: 'Breaking Through International Trade Bureaucracy',
        aboutP1: 'Founded with the fundamental mission to optimize the Comparative Advantage of local agricultural commodities, Nusantara Agri-Exchange was born from the awareness of the huge gap between Indonesian premium commodity farmers and international buyers.',
        aboutP2: 'Initially, the export supply chain for coffee and spices was plagued by administrative inefficiencies, price manipulation by multiple layers of middlemen, and the complexity of meeting global customs standards. NAX integrates information technology to eliminate all these barriers, creating an agile, transparent, and economically fair logistics channel.',
        aboutP3: 'Today, we consolidate hundreds of farmer cooperatives from Sumatra to Maluku, ensuring every coffee bean and spice is processed through strict quality control, digitally documented, and ready to meet global circular economy standards.',
        stat1: 'Nusantara Farmer Cooperatives',
        stat2: 'Active Export Destinations',
        stat3: 'Traceability & Legal Docs Cleared',
        stat4: 'Zero Middleman Dependency',
        productsSub: 'Export Catalog',
        productsTitle: 'Nusantara Premium Commodities',
        productsDesc: 'Explore a collection of specialty coffees and selected spices with the highest export standards.',
        searchPlaceholder: 'Search products...',
        filterAll: '⭐ All Ratings',
        filter4: '4+ Stars',
        filter45: '4.5+ Stars',
        sortNameAsc: 'Name A-Z',
        sortNameDesc: 'Name Z-A',
        sortPriceAsc: 'Price Low-High',
        sortPriceDesc: 'Price High-Low',
        sortRating: 'Highest Rating',
        sortSold: 'Most Sold',
        sortStock: 'Most Stock',
        analyticsBadge: 'Smart B2B Infrastructure',
        analyticsTitle: 'Data-Driven Decisions & Market Probability Predictions',
        analyticsDesc: 'We don\'t just sell commodities; the NAX platform is equipped with a statistical computation engine to help international buyers analyze price trend probabilities, seasonal supply fluctuations, and real-time supply chain risk management.',
        analyticsLi1: 'Supply Volume Prediction: Mathematical calculations based on weather trends and harvest history.',
        analyticsLi2: 'Fact & Event Transparency: Procurement activity logs, lab test certifications, and integrated container tracking.',
        analyticsLi3: 'Administrative Document Automation: Instant issuance of Commercial Invoice, Packing List, and COO.',
        chartTitle: '📈 Commodity Price Trends (Real-time)',
        checkoutTitle: 'Export Form System & WhatsApp Integration',
        checkoutDesc: 'Complete the following business administration data. The system automatically compiles a formal order draft that will be forwarded directly to our WhatsApp Enterprise Trade Specialist.',
        cartTitle: '🛒 Shopping Cart',
        cartEmpty: 'No products selected yet.',
        cartTotal: 'Estimated Total (FOB):',
        cartClear: 'Clear Cart',
        formCompany: 'Company / Institution Name *',
        formBuyer: 'Buyer Representative Name *',
        formEmail: 'Corporate Email *',
        formPhone: 'Active WhatsApp/Phone Number *',
        formCountry: 'Destination Country *',
        formIncoterms: 'Incoterms Selection *',
        formPayment: 'Payment Method *',
        formCommodity: 'Selected Commodities (from cart) *',
        formQty: 'Order Volume (for first item)',
        formUnit: 'Volume Unit',
        formNotes: 'Additional Specifications / Certifications Notes',
        checkoutSubmit: '🚀 Process Payment & Data',
        summaryTitle: 'B2B Gate-Pass Clearance',
        summaryInvoice: 'Proforma Invoice Draft:',
        summaryVendor: 'Platform Vendor:',
        summaryItems: 'Total Items:',
        summaryPayment: 'Payment Method:',
        summaryTotal: 'Total Commodity Value (FOB):',
        complianceTitle: '📋 Integrated Administrative Completeness:',
        securityBadge: '🛡️ Secure transactions protected by international Letter of Credit (L/C) banking system & Verified Escrow Account.',
        adminSub: 'Admin Panel',
        adminTitle: 'Product Stock, Price & Visibility Management',
        adminDesc: 'Manage stock, prices, and product visibility. Changes are automatically saved and integrated with the catalog.',
        adminStatProducts: 'Total Products',
        adminStatStock: 'Total Stock',
        adminStatLow: 'Low Stock Products (<10)',
        adminThCommodity: 'Commodity',
        adminThStock: 'Stock',
        adminThSold: 'Sold',
        adminThPrice: 'Price (USD)',
        adminThVisibility: 'Visibility',
        adminThAction: 'Action',
        adminReset: '↺ Reset All Stock to Default',
        contactHead: 'Nusantara Agri-Exchange Headquarters',
        contactEmail: 'Corporate Email:',
        contactPhone: 'International Hotline:',
        contactWA: 'WhatsApp Trade Specialist:',
        contactHours: 'Trading Hours',
        contactMonFri: 'Monday - Friday: 08:00 - 17:00 (WIB)',
        contactSat: 'Saturday (Logistics & Port Services): 08:00 - 13:00 (WIB)',
        contactNote: '*For international buyers with extreme time zone differences, priority is given via 24-hour encrypted WhatsApp form.',
        footerCopy: '© 2026 PT Nusantara Agri-Exchange. All Rights Reserved. Sustainable Business Administration & Supply Chain System.',
        footerTerms: 'Trade Terms & Conditions',
        footerPrivacy: 'GDPR Data Privacy Policy',
        footerCustoms: 'Customs & Export Regulations',
        loginTitle: '🔐 System Access',
        loginDesc: 'Login as Buyer or Admin to access full features.',
        loginNameLabel: 'Name / Username',
        loginRoleLabel: 'Login As',
        loginRoleBuyer: '🛒 Buyer',
        loginRoleAdmin: '⚙️ Admin',
        loginPasswordLabel: 'Admin Access Code',
        loginSubmit: 'Login',
        loginHint: '* Admin: enter code "nax2026" for full access.',
        rfqTitle: '📩 Request for Quotation (RFQ)',
        rfqDesc: 'Fill in your requirements, our team will respond within 24 hours.',
        rfqCompanyLabel: 'Company Name *',
        rfqEmailLabel: 'Corporate Email *',
        rfqTargetPriceLabel: 'Target Price (USD/MT or USD/KG)',
        rfqVolumeLabel: 'Volume (MT)',
        rfqIncotermsLabel: 'Incoterms Choice',
        rfqNotesLabel: 'Additional Notes',
        rfqSubmit: 'Submit RFQ via WhatsApp'
    }
};

function applyLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) {
            if (el.tagName === 'INPUT' && el.dataset.i18nPlaceholder !== undefined) {
                el.placeholder = t[key];
            } else if (el.tagName === 'INPUT' && el.type !== 'text' && el.type !== 'search') {
                // skip
            } else {
                el.textContent = t[key];
            }
        }
    });
    // placeholder khusus
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) {
            el.placeholder = t[key];
        }
    });
    
    // Update breadcrumb
    const pageNames = {
        home: t.breadcrumbHome || 'Beranda',
        about: t.navAbout || 'Sejarah & Visi',
        products: t.navProducts || 'Katalog Product',
        analytics: t.navAnalytics || 'Data & Probabilitas',
        checkout: t.navCheckout || 'B2B Portal',
        admin: t.navAdmin || '⚙️ Admin'
    };
    breadcrumbText.textContent = pageNames[currentPage] || t.breadcrumbHome || 'Beranda';
    updateAuthUI();
}

langToggle.addEventListener('click', function() {
    const newLang = currentLanguage === 'id' ? 'en' : 'id';
    applyLanguage(newLang);
    showToast(`🌐 ${newLang === 'id' ? 'Bahasa Indonesia' : 'English'}`, 'info');
});

// ===== CHART.JS =====
function initPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    
    // Jika grafik sudah ada, kita hancurkan dulu supaya tidak menumpuk
    if (priceChartInstance) {
        priceChartInstance.destroy();
    }
    
    // Mengambil data untuk label dan harga
    const labels = products.filter(p => !p.hidden).map(p => p.name.length > 15 ? p.name.slice(0, 13) + '...' : p.name);
    const prices = products.filter(p => !p.hidden).map(p => p.price);
    const colors = ['#c49a45', '#4a2f1b', '#2c1a0c', '#ebd6a8', '#8a7a6a', '#b89a7a', '#6e5f4a', '#d4b896', '#a08060', '#5a4a3a'];

    priceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Harga (USD)',
                data: prices,
                backgroundColor: colors,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // <-- INI KUNCI AGAR TIDAK KELUAR DARI LAYAR
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true },
                x: { ticks: { maxRotation: 45, minRotation: 45 } } // Agar teks tidak bertumpuk di HP
            }
        }
    });
}

// ===== PAYMENT METHOD SYNC =====
paymentMethodSelect.addEventListener('change', function() {
    summaryPaymentMethod.textContent = this.value || '-';
});

// ===== CHECKOUT FORM & PAYMENT GATEWAY FLOW =====
let countdownInterval;

document.getElementById('b2bOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const company = document.getElementById('companyName').value.trim();
    const buyer = document.getElementById('buyerName').value.trim();
    const email = document.getElementById('buyerEmail').value.trim();
    const phone = document.getElementById('buyerPhone').value.trim();
    const country = document.getElementById('destinationCountry').value.trim();
    const incoterms = document.getElementById('incoterms').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('additionalNotes').value.trim() || '-';

    if (!company || !buyer || !email || !phone || !country) {
        showToast('⚠️ Harap lengkapi semua data yang diperlukan.', 'error');
        return;
    }
    if (cart.length === 0) {
        showToast('⚠️ Keranjang kosong. Tambahkan produk terlebih dahulu.', 'error');
        return;
    }

    let orderDetails = '';
    let totalAll = 0;
    let stockError = false;
    cart.forEach(item => {
        const p = products.find(prod => prod.id === item.productId);
        if (!p) return;
        if (p.stock < item.qty) {
            showToast(`⚠️ Stok "${p.name}" tidak mencukupi! Tersisa ${p.stock} ${p.unit}.`, 'error');
            stockError = true;
            return;
        }
        let qty = item.qty;
        let discount = 0;
        if (p.unit === 'MT' && qty > 5) discount = 0.05;
        const subtotal = p.price * (p.unit === 'MT' ? qty * 1000 : qty);
        const discounted = subtotal * (1 - discount);
        totalAll += discounted;
        orderDetails += `- ${p.name} : ${qty} ${p.unit} ${discount > 0 ? '(diskon 5% bulk)' : ''} ($${discounted.toFixed(2)})\n`;
    });
    if (stockError) return;

    // Siapkan pesan WhatsApp secara global
    pendingWhatsAppMessage = `*SURAT MINAT PEMBELIAN (PO) - B2B NAX*
----------------------------------------
*Informasi Pembeli:*
🏢 Perusahaan: ${company}
👤 Perwakilan: ${buyer}
📧 Email: ${email}
📞 Kontak WA: ${phone}

*Logistik & Pengiriman:*
📍 Tujuan: ${country}
🚢 Incoterms: ${incoterms}

*Metode Pembayaran:*
💳 ${paymentMethod}

*Rincian Pesanan:*
${orderDetails}
💰 Total Estimasi: $${totalAll.toFixed(2)}

*Catatan Khusus:*
📝 ${notes}
----------------------------------------
Mohon segera diterbitkan Proforma Invoice Resmi untuk verifikasi pembayaran.`;

    // 1. Tampilkan Efek Loading ke Payment Gateway
    loadingText.textContent = 'Menghubungkan ke Gateway Pembayaran...';
    loadingOverlay.classList.add('open');

    // 2. Siapkan data UI Simulasi Modal Payment
    document.getElementById('payModalTotal').textContent = formatPrice(totalAll);
    document.getElementById('payModalMethod').textContent = paymentMethod.split(' (')[0]; // Memperpendek nama metode
    document.getElementById('payModalTxId').textContent = Math.floor(100000 + Math.random() * 900000); // Generate Random ID

    // Delay 1.5 detik lalu buka Modal Payment
    setTimeout(() => {
        loadingOverlay.classList.remove('open');
        paymentModal.classList.add('open');
    }, 1500); 
});

// Aksi "Bayar Sekarang" di Modal Simulasi
document.getElementById('btnConfirmPayment').addEventListener('click', function() {
    paymentModal.classList.remove('open');

    // Tampilkan Loading Verifikasi
    loadingText.textContent = 'Memverifikasi Pembayaran Anda...';
    loadingOverlay.classList.add('open');

    // Delay 2 detik lalu proses eksekusi
    setTimeout(() => {
        loadingOverlay.classList.remove('open');

        // Kurangi stok 
        cart.forEach(item => {
            const p = products.find(prod => prod.id === item.productId);
            if (p) {
                p.stock = Math.max(0, p.stock - item.qty);
                p.sold += item.qty;
            }
        });
        saveStockToLocalStorage();

        // Kosongkan keranjang & render ulang UI
        cart = [];
        saveCartToLocalStorage();
        renderCart();
        renderProducts();
        renderAdminPage();

        // Tampilkan Modal Sukses
        successModal.classList.add('open');
        
        // Mulai Countdown Redirect ke WhatsApp
        let count = 3;
        const countdownEl = document.getElementById('waRedirectCountdown');
        countdownEl.textContent = count;

        countdownInterval = setInterval(() => {
            count--;
            countdownEl.textContent = count;
            if (count <= 0) {
                clearInterval(countdownInterval);
                window.open(`https://wa.me/6285860095139?text=${encodeURIComponent(pendingWhatsAppMessage)}`, '_blank');
            }
        }, 1000);
        
        // Reset form
        document.getElementById('b2bOrderForm').reset();
        document.getElementById('selectedCommodity').value = 'Tambahkan produk dari katalog';
        summaryPaymentMethod.textContent = '-';

    }, 2000);
});

// Aksi "Batalkan Transaksi"
document.getElementById('btnCancelPayment').addEventListener('click', function() {
    paymentModal.classList.remove('open');
    showToast('⚠️ Transaksi dibatalkan oleh pengguna.', 'error');
});

// Tombol manual ke WhatsApp di Success Modal (jika pop-up auto terblokir)
document.getElementById('btnManualWaRedirect').addEventListener('click', function() {
    clearInterval(countdownInterval);
    document.getElementById('waRedirectCountdown').textContent = "0";
    window.open(`https://wa.me/6285860095139?text=${encodeURIComponent(pendingWhatsAppMessage)}`, '_blank');
});

// Menutup modal sukses & kembali ke Beranda
document.getElementById('successModalClose').addEventListener('click', () => {
    successModal.classList.remove('open');
    clearInterval(countdownInterval);
    navigateTo('home');
});

// ===== INIT =====
function init() {
    loadAuthFromLocalStorage();
    loadStockFromLocalStorage();
    loadCartFromLocalStorage();
    updateAuthUI();
    applyLanguage('id');
    renderProducts();
    renderCart();
    renderAdminPage();
    navigateTo('home');

    // Set default payment method summary
    summaryPaymentMethod.textContent = paymentMethodSelect.value || '-';

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) navMenu.classList.remove('open');
    });

    searchInput.addEventListener('input', () => { currentPageProducts = 1; renderProducts(); });
    filterRating.addEventListener('change', () => { currentPageProducts = 1; renderProducts(); });
    sortSelect.addEventListener('change', () => { currentPageProducts = 1; renderProducts(); });

    console.log('🚀 Nusantara Agri-Exchange siap!');
}
// Kode ini untuk menjaga agar grafik tetap rapi saat layar HP berubah
window.addEventListener('resize', function() {
    if (priceChartInstance) {
        priceChartInstance.resize();
    }
});

document.addEventListener('DOMContentLoaded', init);
