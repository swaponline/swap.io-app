export const fiatCurrencies = ['USD', 'EUR']
export const cryptoCurrencies = ['BTC', 'ETH']
export const currencies = [...fiatCurrencies, ...cryptoCurrencies]

/* eslint-disable no-unused-vars */
export function convertAmountToOtherCurrency(amount, currency, targetCurrency) {
  // TODO now is mocked
  const precision = 100
  return Math.round(amount * 10.4 * precision) / precision
}
