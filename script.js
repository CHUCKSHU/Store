const cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name').trim().toLowerCase();
    const price = parseFloat(button.getAttribute('data-price'));

    // Check if already in cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    console.log("Cart:", cart);
    alert(`${name} added to cart!`);

    updateCartUI(); // Update UI when item is added

  });
});

  //CART LOGIC
function updateCartUI() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const placeOrderBtn = document.getElementById('place-order');

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '';
    placeOrderBtn.style.display = 'none';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
    `;
    cartContainer.appendChild(itemEl);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: ₹${total}`;
  placeOrderBtn.style.display = 'inline-block';
}

// Call this function every time cart is updated


// FORM handling code
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const address = document.getElementById('customer-address').value.trim();

  if (!name || !phone || !address) {
    alert("Please fill in all fields.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orderDetails = `New Order:\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n`;

  cart.forEach(item => {
    orderDetails += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  orderDetails += `\nTotal: ₹${total}`;

  // 🔔 For now, just show it in an alert
  //alert(orderDetails);

  //Whatsapp msg!!
  const encodedMessage = encodeURIComponent(orderDetails);
const phoneNumber = "918690395256"; // Replace with your friend's dad's number (with country code)
const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

window.open(whatsappLink, "_blank");

  // Optional: Clear the form + cart
  document.getElementById('order-form').reset();
  cart.length = 0;
  updateCartUI();
});

