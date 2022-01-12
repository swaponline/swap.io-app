import ListWalletGroup from '@/components/Wallets/ListWallet/Group.vue'
import ItemIcon from '@/components/Wallets/ListWallet/ItemIcon.vue'
import { VListGroup, VListItemTitle } from 'vuetify/lib'

import { groupWalletsBy } from '@/utils/wallets'
import { minifyAddress } from '@/utils/common'
import { shallowMount } from '@vue/test-utils'
import { stubComponent } from '../../../__helpers__/stubComponent'
import { btcGroup, bitcoinWallet, bitcoinWBTCWallet } from '../../../__mocks__/wallets.mock'

const ListGroupStub = stubComponent(VListGroup, {
  template: '<div><slot name="activator"></slot><slot></slot></div>',
  props: { value: { type: Boolean } }
})

describe('List wallet group', () => {
  let wrapper

  const DEFAULT_PROPS = {
    wallets: btcGroup.wallets,
    asset: btcGroup.asset,
    value: btcGroup.value,
    active: true
  }

  const findGroupTitle = () => wrapper.findComponent(VListItemTitle)
  const findGroupTitleLogos = () => wrapper.findAll('[data-testid=group-network-logo]')
  const findGroupWallets = () => wrapper.findAll('[data-testid=group-wallet]')

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(ListWalletGroup, {
      propsData: {
        ...DEFAULT_PROPS,
        ...propsData
      },
      provide: {
        mediaQueries: { mobile: false },
        ...provide
      },
      stubs: {
        VListGroup: ListGroupStub
      }
    })
  }

  it('opens group if group is active', () => {
    createComponent()
    const group = wrapper.findComponent(VListGroup)

    expect(group.props().value).toBe(true)
  })

  it('does not open group if group is not active', () => {
    createComponent({ propsData: { active: false } })
    const group = wrapper.findComponent(VListGroup)

    expect(group.props().value).toBe(false)
  })

  it('shows value of wallet group', () => {
    createComponent()
    const groupTitle = findGroupTitle()

    expect(groupTitle.text()).toEqual(expect.stringContaining(btcGroup.value.toString()))
  })

  it('shows asset group symbol', () => {
    createComponent()
    const groupTitle = findGroupTitle()

    expect(groupTitle.text()).toEqual(expect.stringContaining(btcGroup.asset.symbol))
  })

  it('binds the logo path to the ItemIcon', () => {
    createComponent()
    const itemIcon = wrapper.findComponent(ItemIcon)

    expect(itemIcon.props().coinPath).toBe(btcGroup.asset.logo)
  })

  it('shows network logos in group title', () => {
    createComponent()
    const walletsGrouped = groupWalletsBy(btcGroup.wallets, 'network')
    const networkLogos = findGroupTitleLogos()

    expect(networkLogos.wrappers.length).toBe(walletsGrouped.length)
    walletsGrouped.forEach(({ network }) => {
      const networkLogo = networkLogos.wrappers.find(w => w.props().path === network.logo)
      expect(networkLogo).not.toBeUndefined()
      expect(networkLogo.props().name).toBe(network.name)
      expect(networkLogo.props().showTooltip).toBe(true)
    })
  })

  it('shows group wallets', () => {
    createComponent()
    const wallets = findGroupWallets()
    const btcWalletWrapper = wallets.wrappers[0]

    expect(wallets.length).toBe(btcGroup.wallets.length)

    expect(btcWalletWrapper.text()).toContain(bitcoinWallet.value)
    expect(btcWalletWrapper.text()).toContain(bitcoinWallet.name)
  })

  it('show minified address for a wallet without a name', () => {
    createComponent()
    const wallets = findGroupWallets()
    const wbtcWalletWrapper = wallets.wrappers[1]

    expect(wbtcWalletWrapper.text()).toContain(minifyAddress(bitcoinWBTCWallet.address))
  })

  it('binds props to a list-item', () => {
    createComponent()
    const wallets = findGroupWallets()
    const btcWalletWrapper = wallets.wrappers[0]

    expect(btcWalletWrapper.props().to).toEqual(
      expect.objectContaining({
        params: {
          address: bitcoinWallet.address,
          coin: bitcoinWallet.coin.toLowerCase(),
          networkId: bitcoinWallet.networkId
        }
      })
    )
  })
})
