/* eslint-disable */

import messageHandler from './messageHandler'
import WindowHandler from './WindowHandler'
import { WINDOW_KEYS } from './windowKey'
import { API_END_POINT } from './apiEndPoint'
import { MESSAGE_TO_API } from './messageToApi'
import { MESSAGE_FROM_API } from './messageFromApi'
import { API_ANSWER_STATUS } from './apiAnswerStatus'

let apiProcessor = null

class SwapKeysApi {
  _cachedNetworks = []

  constructor() {}

  async getProfile() {
    const apiRequest = new WindowHandler()
  }

  getProfiles(options) {
    const { callback } = options || {}

    return new Promise(resolve => {
      const frame = new WindowHandler({
        nameFrame: 'getProfiles',
        additionalUrl: API_END_POINT.GET_PROFILES,
        key: WINDOW_KEYS.GET_PROFILES,
        callback: ({ message }) => {
          const { profiles } = message
          frame.close()
          if (callback) callback(profiles)
          resolve(profiles)
        },
        silent: true
      })
    })
  }

  createProfileAnswers = {
    IFRAME_LOADED: 'iframeLoaded',
    IFRAME_RENDERED: 'iframeRendered',
    THEME_SELECTED: 'themeSelected',
    PROFILE_CREATED: 'profileCreated',
    CREATION_CANCELLED: 'creationCancelled'
  }
  createProfile(options) {
    const { callback } = options || {}

    const frame = new WindowHandler({
      nameFrame: 'createProfile',
      additionalUrl: API_END_POINT.CREATE_PROFILE,
      key: WINDOW_KEYS.CREATE_PROFILE,
      callback
    })

    return frame
  }

  restoreProfileAnswers = {
    IFRAME_LOADED: 'iframeLoaded',
    IFRAME_RENDERED: 'iframeRendered',
    RECOVER_CANCELED: 'recoverCancelled',
    PROFILE_RECOVERED: 'profileRecovered'
  }
  restoreProfile(options) {
    const { callback } = options || {}

    const frame = new WindowHandler({
      nameFrame: 'recoverProfile',
      additionalUrl: API_END_POINT.RECOVER_PROFILE,
      key: WINDOW_KEYS.RECOVER_PROFILE,
      callback
    })
    return frame
  }

  getNetworks(options) {
    const { callback } = options || {}

    return new Promise(resolve => {
      if (this._cachedNetworks.length) {
        if (callback) callback(this._cachedNetworks)
        resolve(this._cachedNetworks)
      } else {
        const frame = new WindowHandler({
          nameFrame: 'getNetworks',
          additionalUrl: API_END_POINT.GET_NETWORKS,
          key: WINDOW_KEYS.GET_NETWORKS,
          callback: ({ message }) => {
            const { networks } = message
            frame.close()
            this._cachedNetworks = networks
            if (callback) callback(networks)
            resolve(networks)
          },
          silent: true
        })
      }
    })
  }

  findNetwork(options) {
    const { callback, name } = options || {}

    return new Promise(async resolve => {
      const networks = await this.getNetworks({})

      const filteredNetworkds = networks.filter(network => {
        return network.name.toLowerCase().substr(0, name.length) === name.toLowerCase()
      })
      if (callback) callback(filteredNetworkds)
      resolve(filteredNetworkds)
    })
  }

  createWallets(options) {
    const { callback, profileId, wallets = [] } = options || {}

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
          const { networkId, coin, walletNumber = 0 } = walletData || {}
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
          if (type === MESSAGE_FROM_API.IFRAME_LOADED) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.CREATE_WALLETS,
              walletsData: {
                profileId,
                wallets
              }
            })
            apiFrame.popupFrame()
          }
          if (type === MESSAGE_FROM_API.WALLETS_CREATED) {
            const answer = {
              status: API_ANSWER_STATUS.WALLETS_GENERATED,
              wallets: message.wallets
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === MESSAGE_FROM_API.WALLETS_CREATE_CANCELED) {
            const answer = {
              status: API_ANSWER_STATUS.CANCELED
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
        },
        silent: true
      })
    })
  }

  createWallet(options) {
    const { callback, profileId, networkId, coin, walletNumber = 0 } = options || {}

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
          if (type === MESSAGE_FROM_API.IFRAME_LOADED) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.CREATE_WALLET,
              walletData: {
                profileId,
                networkId,
                coin,
                walletNumber
              }
            })
            apiFrame.popupFrame()
          }
          if (type === MESSAGE_FROM_API.WALLET_CREATED) {
            const answer = {
              status: API_ANSWER_STATUS.WALLET_GENERATED,
              wallet: message.wallet
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === MESSAGE_FROM_API.WALLET_CREATE_CANCELED) {
            const answer = {
              status: API_ANSWER_STATUS.CANCELED
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
        },
        silent: true
      })
    })
  }

  validateMessage(options) {
    const { signedMessage, callback } = options
    return new Promise((resolve, reject) => {
      if (!signedMessage) {
        reject(`signedMessage required`)
      }

      const apiFrame = new WindowHandler({
        nameFrame: 'validateMessage',
        additionalUrl: API_END_POINT.VALIDATE_MESSAGE,
        key: WINDOW_KEYS.VALIDATE_MESSAGE,
        silent: true,
        callback: callbackMessage => {
          const {
            message: { type }
          } = callbackMessage

          if (type === MESSAGE_FROM_API.IFRAME_LOADED) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.VALIDATE_MESSAGE,
              data: signedMessage
            })
          }
          if (type === MESSAGE_FROM_API.MESSAGE_VALIDATED) {
            const {
              message: { isValid }
            } = callbackMessage
            const answer = {
              signedMessage,
              isValid
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
        }
      })
    })
  }

  // await keysApi.signMessage({ profileId: '023e01483c', networkId: 'ethereum', message: 'test message' })
  signMessage(options) {
    const { callback, profileId, networkId, message } = options
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
        callback: callbackMessage => {
          const {
            message: { type }
          } = callbackMessage

          if (type === MESSAGE_FROM_API.IFRAME_LOADED) {
            apiFrame.sendMessage({
              type: MESSAGE_TO_API.SIGN_MESSAGE,
              data: {
                profileId,
                networkId,
                message
              }
            })
            apiFrame.popupFrame()
          }
          if (type === MESSAGE_FROM_API.MESSAGE_SIGNED) {
            const {
              message: { signedMessage }
            } = callbackMessage
            const answer = {
              status: API_ANSWER_STATUS.MESSAGE_SIGNED,
              signedMessage
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
          if (type === MESSAGE_FROM_API.MESSAGE_SIGN_CANCELED) {
            const answer = {
              status: API_ANSWER_STATUS.CANCELED
            }
            resolve(answer)
            if (callback) callback(answer)
            apiFrame.close()
          }
        },
        silent: true
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
