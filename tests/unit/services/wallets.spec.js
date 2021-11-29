import * as storageService from '@/utils/storage'
import { createWalletsService } from '@/services/wallets'
import { profilesService } from '@/services/profiles'
import { WALLETS_KEY, events } from '@/services/wallets/types'
import { BASE_MEDIA_URL } from '@/constants/http'

const wallet1 = {
  profileId: '03b4793abe',
  networkId: 'ethereum',
  coin: 'WBTC',
  address: '0xe595b443cf4bf8a2b66cc77657a4f197b5a464ef',
  name: ''
}

const wallet2 = {
  profileId: '03b4793abe',
  networkId: 'ethereum',
  coin: 'renBTC',
  address: 'a4f197b5a464ef0xe595b443cf4bf8a2b66cc77657',
  name: ''
}

const walletTest = {
  profileId: 'test',
  networkId: 'test',
  coin: 'test',
  address: 'test',
  name: ''
}

describe('Wallets service', () => {
  let walletsService
  let wallets
  const { profileId } = wallet1

  beforeEach(() => {
    wallets = [{ ...wallet1 }, { ...wallet2 }]
    profilesService.getCurrentProfileId = jest.fn().mockReturnValue(profileId)
    storageService.getStorage = jest.fn().mockReturnValue(wallets)
    storageService.setStorage = jest.fn().mockImplementation((_, newWallets) => {
      wallets = newWallets
    })
    walletsService = createWalletsService()
  })

  afterEach(() => {
    wallets = []
    walletsService = null
  })

  it('returns the wallet index', () => {
    const walletIndex = walletsService.getWalletIndex(wallets[0])

    expect(walletIndex).toBe(0)
  })

  it('returns -1 when wallet does not exist', () => {
    const walletIndex = walletsService.getWalletIndex(walletTest)

    expect(walletIndex).toBe(-1)
  })

  it('updates the wallet name', () => {
    const newName = 'Test name'
    walletsService.setWallets = jest.spyOn(walletsService, 'setWallets')

    walletsService.updateWalletName({ ...wallet1, name: newName })

    expect(walletsService.setWallets).toBeCalledWith(
      expect.arrayContaining([expect.objectContaining({ ...wallet1, name: newName })])
    )
    const wallet1Index = walletsService.getWalletIndex(wallet1)
    expect(wallets[wallet1Index].name).toBe(newName)
  })

  it('adds a new wallet', () => {
    walletsService.setWallets = jest.spyOn(walletsService, 'setWallets')

    walletsService.addWallet(walletTest)

    expect(walletsService.setWallets).toBeCalledWith(expect.arrayContaining([walletTest]))
    expect(wallets).toEqual(expect.arrayContaining([walletTest]))
  })

  it('sets a new list of wallets', () => {
    const newWallets = [...wallets, walletTest]
    walletsService.refreshCurrentWallets = jest.fn()

    walletsService.setWallets(newWallets)

    expect(storageService.setStorage).toBeCalledWith(WALLETS_KEY, newWallets)
    expect(walletsService.refreshCurrentWallets).toBeCalled()
  })

  it('returns a list of wallets', () => {
    expect(walletsService.getWallets()).toEqual(wallets)
  })

  it('returns a list of wallets of the current user', () => {
    const currentWallets = walletsService.getCurrentWallets()

    currentWallets.forEach(wallet => {
      expect(wallet.profileId).toBe(profileId)
    })
  })

  it('subscribes to events', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    walletsService = createWalletsService()

    walletsService.subscribe(events.REFRESH_CURRENT_WALLETS, callback1)
    walletsService.subscribe(events.REFRESH_CURRENT_WALLETS, callback2)
    walletsService.refreshCurrentWallets()

    expect(callback1).toBeCalled()
    expect(callback2).toBeCalled()
  })

  it('refreshes the list of current wallets', () => {
    walletsService = createWalletsService()
    walletsService.addWallet(walletTest)

    profilesService.getCurrentProfileId = jest.fn().mockReturnValue(walletTest.profileId)
    walletsService.refreshCurrentWallets()

    walletsService.getCurrentWallets().forEach(wallet => {
      expect(wallet.profileId).toBe(walletTest.profileId)
    })
  })

  it('returns path to image', () => {
    expect(walletsService.getLogo('/test')).toBe(`${BASE_MEDIA_URL}/test`)
  })
})
