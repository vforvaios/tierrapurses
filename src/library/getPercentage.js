const getPercentage = (initial, final) =>
  parseFloat(100 - (parseFloat(final) / parseFloat(initial)) * 100).toFixed(2);

export default getPercentage;
