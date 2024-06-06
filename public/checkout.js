document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
    document.getElementsByName('delivery').forEach(radio => {
        radio.addEventListener('change', updateTotal);
    });
});

function renderCheckout() {
    const checkoutList = document.getElementById('checkout-list');
    const checkoutTotal = document.getElementById('checkout-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    checkoutList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-details">
                <h3>${item.name}</h3>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        checkoutList.appendChild(checkoutItem);
        total += item.price * item.quantity;
    });

    checkoutTotal.dataset.baseTotal = total;
    updateTotal();
}

function updateTotal() {
    const deliveryOptions = document.getElementsByName('delivery');
    let total = parseFloat(document.getElementById('checkout-total').dataset.baseTotal);
    let deliveryFee = 0;

    deliveryOptions.forEach(option => {
        if (option.checked && option.value === 'delivery') {
            deliveryFee = 10.0;
        }
    });

    total += deliveryFee;
    document.getElementById('checkout-total').innerHTML = `Total: R$ ${total.toFixed(2)}`;
    if (deliveryFee > 0) {
        document.getElementById('checkout-total').innerHTML += ` (incluindo taxa de entrega: R$10,00)`;
    }
}

function pagamento() {
    alert('Compra finalizada');
    window.location.href = 'index.html';
    localStorage.removeItem('cart');
    renderCart();
}