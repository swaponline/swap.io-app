import { getStorage, setStorage } from '@/utils/storage'
import { cloneDeep } from '@/utils/common'
import { createNanoEvents } from 'nanoevents'

import { profilesService, events as profilesEvents } from '@/services/profiles'
import { BASE_MEDIA_URL } from '@/constants/http'
import { WALLETS_KEY, events } from './types'

function createWalletsService() {
  const emitter = createNanoEvents()
  let wallets = getStorage(WALLETS_KEY) || []
  let currentWallets = []

  function updateCurrentWallets() {
    const currentProfileId = profilesService.getCurrentProfileId()
    currentWallets = wallets.filter(wallet => wallet.profileId === currentProfileId)
    emitter.emit(events.UPDATE_CURRENT_WALLETS, cloneDeep(currentWallets))
  }

  updateCurrentWallets()

  return {
    getWalletIndex({ profileId, address, coin }) {
      return wallets.findIndex(
        wallet => wallet.profileId === profileId && wallet.address === address && wallet.coin === coin
      )
    },

    createWallet(newWallet) {
      this.setWallets([...wallets, newWallet])
    },

    updateWalletName({ address, coin, name }) {
      const currentProfileId = profilesService.getCurrentProfileId()
      const walletIndex = this.getWalletIndex({ profileId: currentProfileId, address, coin })
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
      this.updateCurrentWallets()
    },

    getCurrentWallets() {
      return cloneDeep(currentWallets)
    },

    updateCurrentWallets,

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
  walletsService.updateCurrentWallets()
})

export { walletsService, events }