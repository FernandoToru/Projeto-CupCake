document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

function updateCartDisplay() {
    const cartList = document.querySelector('.cart-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Carrinho vazio</p>';
    } else {
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: R$ ${product.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${product.id})">Remover</button>
            `;
            cartList.appendChild(cartItem);
        });
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    alert('Compra finalizada');
    localStorage.removeItem('cart');
    updateCartDisplay();
}
