
const products = [
    { id: 1, name: "Smart Watch", price: 120, desc: "Premium quality waterproof smart watch.", img: "watch.webp", category: "featured" },
    { id: 2, name: "Wireless Headphones", price: 80, desc: "Crystal clear audio with noise cancellation.", img: "headphn.webp", category: "featured" },
    { id: 3, name: "Premium Shoes", price: 95, desc: "Top quality sneakers for daily comfort.", img: "shoes.jfif", category: "featured" },
    { id: 4, name: "Luxury Travel Bag", price: 150, desc: "Handcrafted genuine leather bag.", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "shop" },
    { id: 5, name: "Apple iMac 24\"", price: 1299, desc: "Supercharged by the M3 chip with a stunning 4.5K Retina display.", img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500", category: "shop" },
    { id: 6, name: "Leather Wallet", price: 40, desc: "Slim design genuine leather wallet.", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", category: "shop" },
    { id: 7, name: "Gaming Keyboard", price: 55, desc: "RGB mechanical keyboard for pro gamers.", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500", category: "shop" },
    { id: 8, name: "Professional Camera", price: 850, desc: "High resolution mirrorless camera.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", category: "shop" }
];

let cart = JSON.parse(localStorage.getItem("MY_SHOP_CART")) || [];


function initializeApp() {
    const shopList = document.getElementById("product-list");
    if (shopList) {
        shopList.innerHTML = products.map(p => `
            <div class="p-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <div class="price">$${p.price}</div>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join("");
    }
    updateCartUI();
}


function showPage(pageId) {
    const pages = document.querySelectorAll(".page");
    pages.forEach(p => p.style.display = "none");

    document.getElementById(pageId).style.display = "block";

    document.getElementById("navLinks").classList.remove("active");
    window.scrollTo(0, 0);
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("open");
    overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const icon = document.getElementById("theme-icon");
    icon.innerText = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
}


function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();

    const sidebar = document.getElementById("cart-sidebar");
    if (!sidebar.classList.contains("open")) toggleCart();
}

function updateCartUI() {
    localStorage.setItem("MY_SHOP_CART", JSON.stringify(cart));

    const container = document.getElementById("cart-items");
    const totalAmount = document.getElementById("total-amount");
    const cartCount = document.getElementById("cart-count");

    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        totalAmount.innerText = "0.00";
        cartCount.innerText = "0";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-details">
                    <h5>${item.name}</h5>
                    <p>$${item.price}</p>
                    <div class="qty-ctrl">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">🗑️</button>
            </div>
        `;
    }).join("");

    totalAmount.innerText = total.toFixed(2);
    cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
}

function changeQty(index, delta) {
    if (cart[index].qty + delta > 0) {
        cart[index].qty += delta;
    } else {
        removeItem(index);
    }
    updateCartUI();
}

function removeItem(index) {
    if (confirm("Remove this item?")) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

function clearCart() {
    if (cart.length > 0 && confirm("Clear entire cart?")) {
        cart = [];
        updateCartUI();
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);

function searchFunction() {
    let input = document.getElementById('myInput').value.toLowerCase();
    let cards = document.querySelectorAll('.p-card');

    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}
function filterCategory(category) {
    let cards = document.querySelectorAll('.p-card');

    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (category === 'all' || title.includes(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}