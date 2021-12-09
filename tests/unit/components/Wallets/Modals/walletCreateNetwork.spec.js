import WalletCreateNetwork from '@/components/Wallets/Modals/WalletCreateNetwork.vue'

import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { VRadioGroup, VRadio, VChipGroup } from 'vuetify/lib'
import mockAssets from './mockAssets'

describe('WalletCreateNetwork', () => {
  let wrapper
  let vuetify

  const DEFAULT_PROPS = {
    assetGroup: { ...mockAssets[0] },
    network: null,
    asset: null
  }

  const findChangeButton = () => {
    return wrapper.findAll('button').wrappers.find(button => button.text() === 'Change')
  }
  const findNetworkGroup = () => wrapper.findComponent(VChipGroup)
  const findAssetsGroup = () => wrapper.findComponent(VRadioGroup)
  const findAssetsRadioItems = () => wrapper.findAllComponents(VRadio)

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(WalletCreateNetwork, {
      propsData: {
        ...DEFAULT_PROPS,
        ...propsData
      },
      provide: {
        mediaQueries: { mobile: false },
        ...provide
      },
      vuetify
    })
  }

  beforeEach(() => {
    vuetify = new Vuetify()
    createComponent()
  })

  it('emits back when click on Change button', () => {
    findChangeButton().trigger('click')

    expect(wrapper.emitted().back).toBeTruthy()
  })

  it('emits update:network', () => {
    const selectedNetwork = mockAssets[0].networks[0]
    findNetworkGroup().vm.$emit('change', selectedNetwork)

    const eventUpdateNetwork = wrapper.emitted('update:network')
    expect(eventUpdateNetwork).toBeTruthy()
    expect(eventUpdateNetwork[0][0]).toEqual(selectedNetwork)
  })

  it('emits update:asset', async () => {
    const selectedNetwork = mockAssets[0].networks[0]
    const selectedAsset = selectedNetwork.assets[0]
    await wrapper.setProps({ network: selectedNetwork })

    findAssetsGroup().vm.$emit('change', selectedAsset)

    const eventUpdateAsset = wrapper.emitted('update:asset')
    expect(eventUpdateAsset).toBeTruthy()
    expect(eventUpdateAsset[0][0]).toEqual(selectedAsset)
  })

  it('shows assets if the network is selected', async () => {
    const selectedNetwork = mockAssets[0].networks[0]
    await wrapper.setProps({ network: selectedNetwork })

    expect(findAssetsGroup().exists()).toBe(true)
    expect(findAssetsRadioItems().length).toBe(selectedNetwork.assets.length)
  })

  it('does not show assets if the network is not selected', async () => {
    await wrapper.setProps({ network: mockAssets[0].networks[0] })
    await wrapper.setProps({ network: null })

    expect(findAssetsGroup().exists()).toBe(false)
  })
})
