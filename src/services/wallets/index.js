import { getStorage, setStorage } from '@/utils/storage'
import { cloneDeep } from '@/utils/common'
import { createNanoEvents } from 'nanoevents'

import { profilesService, events as profilesEvents } from '@/services/profiles'
import { BASE_MEDIA_URL } from '@/constants/http'
import { WALLETS_KEY, events } from './types'

export function createWalletsService() {
  const emitter = createNanoEvents()
  let wallets = getStorage(WALLETS_KEY) || []
  let currentWallets = []

  function refreshCurrentWallets() {
    const currentProfileId = profilesService.getCurrentProfileId()
    currentWallets = wallets.filter(wallet => wallet.profileId === currentProfileId)
    emitter.emit(events.REFRESH_CURRENT_WALLETS, cloneDeep(currentWallets))
  }

  refreshCurrentWallets()

  return {
    getWalletIndex({ profileId, address, coin, networkId }) {
      return wallets.findIndex(
        wallet =>
          wallet.profileId === profileId &&
          wallet.address === address &&
          wallet.coin.toLowerCase() === coin.toLowerCase() &&
          wallet.networkId.toLowerCase() === networkId.toLowerCase()
      )
    },

    addWallet(newWallet) {
      this.setWallets([...wallets, newWallet])
    },

    updateWalletName({ address, coin, name, networkId }) {
      const currentProfileId = profilesService.getCurrentProfileId()
      const walletIndex = this.getWalletIndex({ profileId: currentProfileId, address, coin, networkId })
      const updatedWallet = { ...wallets[walletIndex], name }
      const updatedWallets = [...wallets.slice(0, walletIndex), updatedWallet, ...wallets.slice(walletIndex + 1)]

      this.setWallets(updatedWallets)
    },

    getWallets() {
      return cloneDeep(wallets)
    },

    setWallets(newWallets) {
      wallets = newWallets
      setStorage(WALLETS_KEY, newWallets)
      this.refreshCurrentWallets()
    },

    getCurrentWallets() {
      return cloneDeep(currentWallets)
    },

    refreshCurrentWallets,

    getLogo(path) {
      return `${BASE_MEDIA_URL}${path}`
    },

    subscribe(event, callback) {
      const unsubscribe = emitter.on(event, callback)
      return {
        unsubscribe
      }
    }
  }
}

const walletsService = createWalletsService()

profilesService.subscribe(profilesEvents.UPDATE_CURRENT_PROFILE_ID, () => {
  walletsService.refreshCurrentWallets()
})

export { walletsService, events }
