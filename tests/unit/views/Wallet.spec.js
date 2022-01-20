import Wallet from '@/views/Wallet.vue'
import ListWallet from '@/components/Wallets/ListWallet/index.vue'
import WalletContent from '@/components/Wallets/WalletContent.vue'
import WalletsCreate from '@/components/Wallets/WalletsCreate.vue'
import MainActions from '@/components/Wallets/MainActions.vue'
import AllModals from '@/components/Wallets/Modals/AllModals.vue'

import { walletsService, events as walletsEvents } from '@/services/wallets'
import { shallowMount } from '@vue/test-utils'
import { mockWallets } from '../__mocks__/wallets.mock'

const routerReplace = jest.fn()
const spySubscribe = jest.spyOn(walletsService, 'subscribe')

describe('Wallet view', () => {
  let wrapper

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(Wallet, {
      propsData: {
        ...propsData
      },
      provide: {
        mediaQueries: { mobile: false, desktop: true },
        ...provide
      },
      mocks: {
        $route: {
          meta: { back: null }
        },
        $router: {
          replace: routerReplace
        }
      }
    })
  }

  beforeEach(() => {
    walletsService.getCurrentWallets = jest.fn().mockReturnValue(mockWallets)
  })

  it('contains all modal windows', () => {
    createComponent()

    expect(wrapper.findComponent(AllModals).exists()).toBe(true)
  })

  it('shows wallet creation component when there are no wallets', () => {
    walletsService.getCurrentWallets = jest.fn().mockReturnValue([])
    createComponent()

    expect(wrapper.findComponent(WalletsCreate).exists()).toBe(true)
    expect(wrapper.findComponent(ListWallet).exists()).toBe(false)
    expect(wrapper.findComponent(WalletContent).exists()).toBe(false)
    expect(wrapper.findComponent(MainActions).exists()).toBe(false)
  })

  it('shows wallets and contents when list of wallets is not empty', () => {
    createComponent()

    expect(wrapper.findComponent(ListWallet).exists()).toBe(true)
    expect(wrapper.findComponent(WalletContent).exists()).toBe(true)
    expect(wrapper.findComponent(MainActions).exists()).toBe(true)
    expect(wrapper.findComponent(WalletsCreate).exists()).toBe(false)
  })

  it('binds wallets to wallet list', () => {
    createComponent()

    const listWalletWrapper = wrapper.findComponent(ListWallet)
    expect(listWalletWrapper.props().wallets).toEqual(mockWallets)
  })

  it('binds active wallet to wallet list', () => {
    const activeWallet = mockWallets[0]
    const propsData = {
      address: activeWallet.address,
      coin: activeWallet.coin,
      networkId: activeWallet.networkId
    }
    createComponent({ propsData })

    const listWalletWrapper = wrapper.findComponent(ListWallet)
    expect(listWalletWrapper.props().activeWallet).toEqual(activeWallet)
  })

  it('binds active wallet to wallet content', () => {
    const activeWallet = mockWallets[0]
    const propsData = {
      address: activeWallet.address,
      coin: activeWallet.coin,
      networkId: activeWallet.networkId
    }
    createComponent({ propsData })

    const walletContentWrapper = wrapper.findComponent(WalletContent)
    expect(walletContentWrapper.props().wallet).toEqual(activeWallet)
  })

  it('sets the active wallet when wallet list is not empty and desktop', () => {
    createComponent()

    expect(routerReplace).toBeCalledWith({
      name: 'Wallets',
      params: {
        address: '1gaN21RQHLSWxapkSLX1xFK9fwTKDgWJR',
        coin: 'btc',
        networkId: 'bitcoin'
      }
    })
  })

  it('redirects to the wallet list page on a mobile if the active wallet is not in the list', () => {
    walletsService.getCurrentWallets = jest.fn().mockReturnValue([])
    const activeWallet = mockWallets[0]
    const propsData = {
      address: activeWallet.address,
      coin: activeWallet.coin,
      networkId: activeWallet.networkId
    }
    createComponent({ propsData, provide: { mediaQueries: { mobile: true, desktop: false } } })

    expect(routerReplace).toBeCalledWith({ name: 'Wallets' })
  })

  it('subscribes to update wallets', () => {
    createComponent()

    expect(spySubscribe).toBeCalledWith(walletsEvents.REFRESH_CURRENT_WALLETS, expect.anything())
  })
})
