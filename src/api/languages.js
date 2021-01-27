export default lang => {
  // будет готов сервер, будем с сервера брать
  return new Promise((resolve, reject) => {
    import(/* webpackChunkName: "lang-[request]" */ `../assets/languages/${lang}`)
      .then(message => {
        return resolve({ languages: ['en', 'ru'], message })
      })
      .catch(err => reject(err))
  })
}
