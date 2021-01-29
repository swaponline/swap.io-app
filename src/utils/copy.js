export default data => {
  return new Promise((resolve, reject) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(data).then(resolve)
    } else {
      reject(new Error('No function'))
    }
  })
}
