/**
 * Плюрализация числительных (образование множественного)
 * @param {number} count - Количество
 * @param {string} one - Единиственное число, например: (1) "друг"
 * @param {string} few - Множественное число, несколько, от 2 до 4, например: (3) "друга"
 * @param {string} many - Множественное число, 5 и более или 0, например: (11) "друзей", (0) "друзей"
 */
export function pluralizeNumeral(count, one, few, many) {
  const tens = typeof count !== 'number' || !parseInt(count, 10) ? 0 : parseInt(count, 10) % 100
  const isTeen = tens > 10 && tens < 20
  const units = tens % 10
  const isOneUnit = units === 1

  if (!isTeen && isOneUnit) return one
  if (!isTeen && units >= 2 && units <= 4) return few
  return many
}

export default pluralizeNumeral
