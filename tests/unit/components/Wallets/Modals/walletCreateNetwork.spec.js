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

  it('emits back when click on Change', () => {
    findChangeButton().trigger('click')

    expect(wrapper.emitted().back).toBeTruthy()
  })

  it('emits update:network', () => {
    const networkChips = wrapper.findComponent(VChipGroup)
    networkChips.vm.$emit('change', mockAssets[0].networks[0])

    expect(wrapper.emitted('update:network')).toBeTruthy()
  })

  it('shows assets if the network is selected', async () => {
    expect(wrapper.findComponent(VRadioGroup).exists()).toBe(false)

    const selectedNetwork = mockAssets[0].networks[0]
    await wrapper.setProps({ network: selectedNetwork })

    expect(wrapper.findAllComponents(VRadio).length).toBe(selectedNetwork.assets.length)
  })

  it('emits update:asset', async () => {
    const selectedNetwork = mockAssets[0].networks[0]
    await wrapper.setProps({ network: selectedNetwork })
    const assetsRadio = wrapper.findComponent(VRadioGroup)
    assetsRadio.vm.$emit('change', selectedNetwork.assets[0])

    expect(wrapper.emitted('update:asset')).toBeTruthy()
  })
})
