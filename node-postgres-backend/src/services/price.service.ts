export function calculateDiscount(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid discount");
  }

  return price - (price * discountPercentage) / 100;
}
