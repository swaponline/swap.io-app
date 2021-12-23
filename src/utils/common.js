import cloneDeepLodash from 'lodash.clonedeep'
import debounceLodash from 'lodash.debounce'
import isEqualLodash from 'lodash.isequal'
import mergeLodash from 'lodash.merge'
import Decimal from 'decimal.js-light'

export function minifyAddress(address) {
  return `${address.slice(0, 5)} ... ${address.slice(-5)}`
}

export function getCoords(elem) {
  const box = elem.getBoundingClientRect()

  const { body } = document
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { top, left }
}

export function getCenter(elem) {
  const coords = getCoords(elem)
  return { top: coords.top + elem.offsetHeight / 2, left: coords.left + elem.offsetWidth / 2 }
}

export function getDistance(pointA, pointB) {
  const cat1 = pointA.x - pointB.x
  const cat2 = pointA.y - pointB.y
  return Math.sqrt(cat1 * cat1 + cat2 * cat2)
}

export function setCSSCustomProperty(propertyName, value) {
  document.documentElement.style.setProperty(`--${propertyName}`, value)
}
export function convertToDecimalNotation(value, decimals) {
  return value * 10 ** (decimals * -1)
}
export function convertToScientificNotation(value, decimals) {
  return value * 10 ** decimals
}

export function cloneDeep(objects) {
  return cloneDeepLodash(objects)
}

export function debounce(func, wait = 0, options = {}) {
  return debounceLodash(func, wait, options)
}

export function isEqual(value, other) {
  return isEqualLodash(value, other)
}
export function deepMerge(object, other) {
  return mergeLodash(object, other)
}

export function sum(value1, value2) {
  return new Decimal(value1).plus(value2).toNumber()
}
