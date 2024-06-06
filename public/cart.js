document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <button onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
                <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartList.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function increaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function decreaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    window.location.href = 'checkout.html';
    
}
function pagamento() {
    alert('Compra finalizada');
    localStorage.removeItem('cart');
    renderCart();
}
