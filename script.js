let cart = [];

function addToCart(productName, price, quantityId) {
    const quantity = parseInt(document.getElementById(quantityId).value);
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity,
            subtotal: price * quantity
        });
    }

    renderCart();
}

function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    let totalAmount = 0;

    cart.forEach((item, index) => {
        totalAmount += item.subtotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${item.subtotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;

        cartItemsElement.insertAdjacentHTML('beforeend', row);
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    const receiptSection = document.getElementById('receipt-section');
    const receiptContent = document.getElementById('receipt-content');

    receiptSection.style.display = 'block';
    receiptContent.innerHTML = '';

    let receipt = '<h3>Supermarket Receipt</h3>';
    receipt += '<ul>';

    let total = 0;
    cart.forEach(item => {
        receipt += `<li>${item.quantity} x ${item.name} @ ₹${item.price.toFixed(2)} = ₹${item.subtotal.toFixed(2)}</li>`;
        total += item.subtotal;
    });

    receipt += `</ul><h4>Total: ₹${total.toFixed(2)}</h4>`;
    receiptContent.innerHTML = receipt;
}

function printReceipt() {
    const receiptContent = document.getElementById('receipt-content').innerHTML;
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Print Receipt</title></head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
