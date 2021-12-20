import ListWallet from '@/components/Wallets/ListWallet'
import TotalWalletSum from '@/components/Wallets/ListWallet/TotalWalletSum.vue'
import WalletSearch from '@/components/Wallets/ListWallet/Search.vue'
import ListGroup from '@/components/Wallets/ListWallet/Group.vue'
import ListItem from '@/components/Wallets/ListWallet/Item.vue'

import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { mockWallets, mockWalletsSum, bitcoinWallets, binanceWallet } from '../../../__mocks__/wallets.mock'

describe('List wallets', () => {
  let wrapper

  const DEFAULT_PROPS = {
    wallets: mockWallets,
    activeWallet: mockWallets[0]
  }

  const findListWrapper = () => wrapper.find('[data-test-id=list-wrapper]')

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(ListWallet, {
      propsData: {
        ...DEFAULT_PROPS,
        ...propsData
      },
      provide: {
        mediaQueries: { mobile: false },
        ...provide
      }
    })
  }

  beforeEach(() => {
    createComponent()
  })

  it('sums up the balance of wallets', () => {
    const sumComponent = wrapper.findComponent(TotalWalletSum)
    expect(sumComponent.props().totalValue).toBe(mockWalletsSum)
  })

  it('shows search input', async () => {
    const listWrapper = findListWrapper()
    listWrapper.element.scrollTop = 1

    await listWrapper.trigger('scroll')
    await nextTick()

    expect(wrapper.findComponent(WalletSearch).exists()).toBe(true)
  })

  it('searches wallets', async () => {
    const searchString = 'Main'
    const listWrapper = findListWrapper()
    listWrapper.element.scrollTop = 1
    await listWrapper.trigger('scroll')
    await nextTick()

    const walletSearch = wrapper.findComponent(WalletSearch)
    walletSearch.vm.$emit(WalletSearch.model?.event || 'input', searchString)
    await nextTick()

    const listItems = wrapper.findAllComponents(ListItem)
    expect(listItems.wrappers.length).toBe(1)
    expect(listItems.wrappers[0].props().name).toBe(searchString)
  })

  it('groups wallets', () => {
    const listItems = wrapper.findAllComponents(ListItem)
    const listGroups = wrapper.findAllComponents(ListGroup)

    expect(listItems.length).toBe(1)
    expect(listGroups.length).toBe(2)
  })

  it('groups wallets by asset', () => {
    const listGroups = wrapper.findAllComponents(ListGroup)
    const bitcoinGroup = listGroups.wrappers[0]

    expect(bitcoinGroup.props().asset).toEqual(bitcoinWallets[0].asset)
    expect(bitcoinGroup.props().wallets).toEqual(bitcoinWallets)
  })

  it('the wallet does not have a group', () => {
    const listItem = wrapper.findAllComponents(ListItem).wrappers[0]

    expect(listItem.props().coin).toBe(binanceWallet.coin)
    expect(listItem.props().networkId).toBe(binanceWallet.networkId)
    expect(listItem.props().address).toBe(binanceWallet.address)
  })
})
