export default function getCurrencySign(curr) {
  switch (curr) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "RUB":
      return "₽";
    case "AUD":
      return "$";
    case "JPY":
      return "¥";

    default:
      return "";
  }
}
