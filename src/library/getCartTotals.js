const getCartTotals = (cart) =>
  cart?.reduce(
    (acc, curr) => parseFloat(acc + curr?.total * parseFloat(curr.price)),
    0,
  );

export default getCartTotals;
