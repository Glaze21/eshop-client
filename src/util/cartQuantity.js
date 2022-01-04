export default function getCartQuantity(cart) {
  let itemAmount = 0;

  cart.forEach((item) => {
    itemAmount += item.amount;
  });

  return itemAmount;
}
