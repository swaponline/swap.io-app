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
    findNetworkGroup().vm.$emit('change', mockAssets[0].networks[0])

    expect(wrapper.emitted('update:network')).toBeTruthy()
  })

  it('emits update:asset', async () => {
    const selectedNetwork = mockAssets[0].networks[0]
    await wrapper.setProps({ network: selectedNetwork })

    findAssetsGroup().vm.$emit('change', selectedNetwork.assets[0])

    expect(wrapper.emitted('update:asset')).toBeTruthy()
  })

  it('shows assets if the network is selected', async () => {
    const selectedNetwork = mockAssets[0].networks[0]
    await wrapper.setProps({ network: selectedNetwork })

    expect(findAssetsRadioItems().length).toBe(selectedNetwork.assets.length)
  })
})
