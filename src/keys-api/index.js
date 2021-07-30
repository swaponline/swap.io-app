/* eslint-disable */

import messageHandler from './messageHandler'
import WindowHandler from './WindowHandler'
import { WINDOW_KEYS } from './windowKey'

let apiProcessor = null

class SwapKeysApi {
  _cachedNetworks = []

  constructor() {}

  async getProfile() {
    const apiRequest = new WindowHandler()
  }

  getProfiles(options) {
    const {
      callback
    } = options || {}

    return new Promise((resolve) => {
      const frame = new WindowHandler({
        nameFrame: 'getProfiles',
        additionalUrl: '/get-profiles',
        key: WINDOW_KEYS.GET_PROFILES,
        callback: ({ message }) => {
          const {
            profiles
          } = message
          frame.close()
          if (callback) callback(profiles)
          resolve(profiles)
        },
        silent: true,
      })
    })
  }

  createProfileAnswers = {
    IFRAME_INITED: 'iframeInited',
    THEME_SELECTED: 'themeSelected',
    PROFILE_CREATED: 'profileCreated'
  }
  createProfile(options) {
    const {
      callback
    } = options || {}

    const frame = new WindowHandler({
      nameFrame: 'createProfile',
      additionalUrl: '/choose-style',
      key: WINDOW_KEYS.CREATE_PROFILE,
      callback
    })

    return frame
  }

  restoreProfileAnswers = {
    IFRAME_INITED: 'iframeInited',
    RECOVER_CANCELED: 'recoverCancelled',
    PROFILE_RECOVERED: 'profileRecovered'
  }
  restoreProfile(options) {
    const {
      callback
    } = options || {}

    const frame = new WindowHandler({
      nameFrame: 'recoverProfile',
      additionalUrl: '/secret-phrase',
      key: WINDOW_KEYS.RECOVER_PROFILE, 
      callback
    })
    return frame
  }

  async getNetworks(options) {
    const {
      callback,
    } = options || {}

    return new Promise((resolve) => {
      if (this._cachedNetworks.length) {
        if (callback) callback(this._cachedNetworks)
        resolve(this._cachedNetworks)
      } else {
        const frame = new WindowHandler({
          nameFrame: 'getNetworks',
          additionalUrl: '/get-networks',
          key: WINDOW_KEYS.GET_NETWORKS,
          callback: ({ message }) => {
            const {
              networks
            } = message
            frame.close()
            this._cachedNetworks = networks
            if (callback) callback(networks)
            resolve(networks)
          },
          silent: true,
        })
      }
    })
  }

  findNetwork(options) {
    const {
      callback,
      name
    } = options || {}

    return new Promise(async (resolve) => {
      const networks = await this.getNetworks({})

      const filteredNetworkds = networks.filter((network) => {
        return (network.name.toLowerCase().substr(0,name.length) === name.toLowerCase())
      })
      if (callback) callback(filteredNetworkds)
      resolve(filteredNetworkds)
    })
  }

  async createWallets(options) {
    const {
      callback,
      profileId,
      wallets = []
    } = options || {}

    return new Promise(async (resolve, reject) => {
      if (!profileId) {
        reject(`profileId required`)
        return
      }
      if (!wallets.length) {
        reject(`wallets required`)
        return
      } else {
        // check wallets options
        let hasBadWalletOptions = false
        wallets.forEach((walletData, walletIndex) => {
          const {
            networkId,
            coin,
            walletNumber = 0
          } = walletData || {}
          if (!networkId) {
            hasBadWalletOptions = `networkId required for wallet #${walletIndex}`
            return
          }
          if (!coin) {
            hasBadWalletOptions = `coin required for wallet #${walletIndex}`
            return
          }
        })
        if (hasBadWalletOptions) {
          reject(hasBadWalletOptions)
          return
        }
      }
      
/*
      const apiFrame = new WindowHandler({
        nameFrame: 'createWallets',
        additionalUrl: '/create-wallets',
        key: WINDOW_KEYS.CREATE_WALLETS,
        callback: ({ message }) => {
          
        }
      })
      */
    })
  }

  async createWallet(options) {
    const {
      callback,
      profileId,
      networkId,
      coin,
      walletNumber = 0
    } = options || {}

    return new Promise(async (resolve, reject) => {
      if (!profileId) {
        reject(`profileId required`)
        return
      }
      if (!networkId) {
        reject(`networkId required`)
        return
      }
      if (!coin) {
        reject(`coin slug required`)
        return
      }

      const apiFrame = new WindowHandler({
        nameFrame: 'createWallet',
        additionalUrl: '/create-wallet',
        key: WINDOW_KEYS.CREATE_WALLET,
        callback: ({ message }) => {
          const { type } = message
          if (type === `iframeInited`) {
            apiFrame.sendMessage({
              type: 'CreateWallet',
              walletData: {
                profileId,
                networkId,
                coin,
                walletNumber,
              }
            })
            apiFrame.popupFrame()
          }
          if (type === `WalletCreated`) {
            const answer = {
              status: 'generated',
              wallet: message.wallet
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === `CancelCreateWallet`) {
            const answer = {
              status: `cancelled`
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
            
          }
          console.log('Create wallet frame answers', message)
        },
        silent: true,
      })
      window.createWalletFrame = apiFrame
    })
  }

}

if (!apiProcessor) {
  apiProcessor = new SwapKeysApi()
  messageHandler()
}
export default apiProcessor
