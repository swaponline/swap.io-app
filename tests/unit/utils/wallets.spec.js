import { groupWalletsBy } from '@/utils/wallets'
import { mockWallets, btcGroup, bitcoinRenBTCWallet, bitcoinWBTCWallet } from '../__mocks__/wallets.mock'

const ethGroup = {
  networkId: 'ethereum',
  value: 202.2137,
  wallets: [bitcoinWBTCWallet, bitcoinRenBTCWallet]
}

describe('groupWalletsBy', () => {
  const findWallet = (wallet, wallets) => {
    return wallets.find(({ networkId, address, coin }) => {
      return wallet.networkId === networkId && wallet.address === address && wallet.coin === coin
    })
  }
  it('groups wallets by asset', () => {
    const groupedWallets = groupWalletsBy(mockWallets, 'asset')
    const btcGroupInGroupedWallets = groupedWallets.find(({ asset }) => asset.name === btcGroup.asset.name)

    expect(groupedWallets.length).toEqual(3)
    expect(btcGroupInGroupedWallets.asset).toEqual(btcGroup.asset)
    expect(btcGroupInGroupedWallets.value).toBe(btcGroup.value)
    expect(btcGroupInGroupedWallets.wallets.length).toBe(btcGroup.wallets.length)

    btcGroup.wallets.forEach(wallet => {
      const walletInGroup = findWallet(wallet, btcGroupInGroupedWallets.wallets)

      expect(walletInGroup).toBeTruthy()
    })
  })

  it('groups wallets by networkId', () => {
    const groupedWallets = groupWalletsBy(btcGroup.wallets, 'networkId')
    const ethGroupInGroupedWallets = groupedWallets.find(({ networkId }) => networkId === ethGroup.networkId)

    expect(groupedWallets.length).toEqual(3)
    expect(ethGroupInGroupedWallets.networkId).toBe(ethGroup.networkId)
    expect(ethGroupInGroupedWallets.value).toBe(ethGroup.value)
    expect(ethGroupInGroupedWallets.wallets.length).toBe(ethGroup.wallets.length)

    ethGroup.wallets.forEach(wallet => {
      const walletInGroup = findWallet(wallet, ethGroupInGroupedWallets.wallets)

      expect(walletInGroup).toBeTruthy()
    })
  })
})
