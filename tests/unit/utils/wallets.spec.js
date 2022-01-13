import { groupWalletsBy } from '@/utils/wallets'
import { mockWallets, btcGroup, bitcoinRenBTCWallet, bitcoinWBTCWallet } from '../__mocks__/wallets.mock'

describe('groupWalletsBy', () => {
  it('groups wallets by asset', () => {
    const groupedWallets = groupWalletsBy(mockWallets, 'asset')

    expect(groupedWallets.length).toEqual(3)
    expect(groupedWallets[0]).toEqual(btcGroup)
  })

  it('groups wallets by networkId', () => {
    const groupedWallets = groupWalletsBy(btcGroup.wallets, 'networkId')
    const ethereumGroup = {
      networkId: 'ethereum',
      value: 202.2137,
      wallets: [bitcoinWBTCWallet, bitcoinRenBTCWallet]
    }

    expect(groupedWallets.length).toEqual(3)
    expect(groupedWallets[1]).toEqual(ethereumGroup)
  })
})
