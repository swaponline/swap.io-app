export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    // eslint-disable-next-line no-param-reassign
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
export const generateColor = () => {
  const colorsDefault = ['ff', '00']
  const color = Math.floor(Math.random() * 255).toString(16)
  colorsDefault.push(color)
  shuffle(colorsDefault)
  return '#000000'.slice(0, -colorsDefault.join('').length) + colorsDefault.join('')
}
export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
export const getGradient = color => {
  return `${randomInteger(0, 360)}deg, ${generateColor()} 0%, ${color} ${randomInteger(
    30,
    70
  )}%, ${generateColor()} 100%`
}
