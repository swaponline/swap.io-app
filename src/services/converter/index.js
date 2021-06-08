export const currencies = ['USD', 'BTC', 'ETH']

/* eslint-disable no-unused-vars */
export function convertAmountToOtherCurrency(amount, currency, targetCurrency) {
  // TODO now is mocked
  const precision = 100
  return Math.round(amount * 10.4 * precision) / precision
}
