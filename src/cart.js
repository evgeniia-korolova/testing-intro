function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  if (quantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, newQuantity) {
  const itemInCart = cart.find((item) => item.id === id);

  if (!itemInCart) {
    return [...cart];
  }

  if (newQuantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  if (newQuantity > itemInCart.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  return cart.map((item) =>
    item.id === id ? { ...item, quantity: newQuantity } : item
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }

  const delivery = subtotal >= 50000 ? 0 : 30000;

  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
