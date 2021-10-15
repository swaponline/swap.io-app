import client from '@/http/client'

const networksService = {
  fetchAssets({ from, size, cache = true }) {
    return client
      .get('/popular-assets/', { params: { from, size }, cache })
      .then(assets => assets.map(({ _source }) => _source))
  },

  searchAssets(query) {
    return client.get(`/search/assets?q=${query}`).then(assets => assets.map(({ _source }) => _source))
  }
}

export default networksService
