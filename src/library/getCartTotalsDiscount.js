const getCartTotalsDiscount = (cart) =>
  cart?.reduce(
    (acc, curr) =>
      acc +
      curr?.total * (parseFloat(curr?.initialPrice) - parseFloat(curr?.price)),
    0,
  );

export default getCartTotalsDiscount;
