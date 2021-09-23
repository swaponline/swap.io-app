/* eslint-disable */

import messageHandler from './messageHandler'
import WindowHandler from './WindowHandler'
import { WINDOW_KEYS } from './windowKey'
import { API_END_POINT } from './apiEndPoint'
import { MESSAGE_TO_API } from './messageToApi'

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
        additionalUrl: API_END_POINT.GET_PROFILES,
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
      additionalUrl: API_END_POINT.CHOSE_STYLE,
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
      additionalUrl: API_END_POINT.SECRET_PHRASE,
      key: WINDOW_KEYS.RECOVER_PROFILE, 
      callback
    })
    return frame
  }

  getNetworks(options) {
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
          additionalUrl: API_END_POINT.GET_NETWORKS,
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

  createWallets(options) {
    const {
      callback,
      profileId,
      wallets = []
    } = options || {}

    return new Promise((resolve, reject) => {
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

      const apiFrame = new WindowHandler({
        nameFrame: 'createWallets',
        additionalUrl: API_END_POINT.CREATE_WALLETS,
        key: WINDOW_KEYS.CREATE_WALLETS,
        callback: ({ message }) => {
          const { type } = message
          if (type === `iframeInited`) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.CREATE_WALLETS,
              walletsData: {
                profileId,
                wallets
              }
            })
            apiFrame.popupFrame()
          }
          if (type === `WalletsCreated`) {
            const answer = {
              status: 'generated',
              wallets: message.wallets
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === `CancelCreateWallets`) {
            const answer = {
              status: `cancelled`
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
            
          }
        },
        silent: true,
      })
    })
  }

  createWallet(options) {
    const {
      callback,
      profileId,
      networkId,
      coin,
      walletNumber = 0
    } = options || {}

    return new Promise((resolve, reject) => {
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
        additionalUrl: API_END_POINT.CREATE_WALLET,
        key: WINDOW_KEYS.CREATE_WALLET,
        callback: ({ message }) => {
          const { type } = message
          if (type === `iframeInited`) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.CREATE_WALLET,
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
        },
        silent: true,
      })
    })
  }

  signMessage(options) {
    const {
      callback,
      profileId,
      message
    } = options
    return new Promise((resolve, reject) => {
      if (!profileId) {
        reject(`profileId required`)
        return
      }
      if (!message) {
        reject(`message required`)
        return
      }
      const apiFrame = new WindowHandler({
        nameFrame: 'signMessage',
        additionalUrl: API_END_POINT.SIGN_MESSAGE,
        key: WINDOW_KEYS.SIGN_MESSAGE,
        callback: (callbackMessage) => {
          const {
            message: {
              type
            }
          } = callbackMessage

          if (type === `iframeInited`) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.SIGN_MESSAGE,
              data: {
                profileId,
                message
              }
            })
            apiFrame.popupFrame()
          }
          if (type === `MessageSigned`) {
            const {
              message: {
                signedMessage
              }
            } = callbackMessage
            const answer = {
              status: 'signed',
              signedMessage,
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === `CancelMessageSign`) {
            const answer = {
              status: `cancelled`
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
        },
        silent: true,
      })
    })
  }

  signTransaction(options) {}
}

if (!apiProcessor) {
  apiProcessor = new SwapKeysApi()
  messageHandler()
}
export default apiProcessor
