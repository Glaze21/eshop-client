export default function getPriceAmount(priceArr, activeCurrency) {
  return priceArr.find((e) => e.currency === activeCurrency).amount;
}
