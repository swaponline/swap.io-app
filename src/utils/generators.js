export const generateColor = () => {
  const color = Math.floor(Math.random() * 16777216).toString(16)
  return '#000000'.slice(0, -color.length) + color
}
export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
export const getGradient = color => {
  return `linear-gradient(${randomInteger(0, 360)}deg, ${generateColor()} 0%, ${color} ${randomInteger(
    1,
    100
  )}%, ${generateColor()} 100%)`
}
