import WalletCreate from '@/components/Wallets/Modals/WalletCreate.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import SwapButton from '@/components/UI/SwapButton.vue'
import WalletCreateNetwork from '@/components/Wallets/Modals/WalletCreateNetwork.vue'
import FormTextField from '@/components/UI/Forms/TextField.vue'
import InfiniteLoading from 'vue-infinite-loading'

import { shallowMount } from '@vue/test-utils'
import networksService from '@/services/networks'
import { profilesService } from '@/services/profiles'
import { walletsService } from '@/services/wallets'
import SwapKeysApi from '@/keys-api'
import mockAssets from './mockAssets'
import { stubComponent } from '../../../helpers/stubComponent'

jest.mock('lodash.debounce', () => jest.fn(fn => fn))

const ModalWrapperStub = stubComponent(ModalWrapper, {
  template: '<div><slot name="header"></slot><slot></slot><slot name="footer"></slot></div>'
})

describe('WalletCreate', () => {
  let wrapper

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(WalletCreate, {
      propsData: {
        ...propsData
      },
      provide: {
        mediaQueries: { mobile: false },
        ...provide
      },
      stubs: {
        ModalWrapper: ModalWrapperStub
      }
    })
  }

  const findModalWrapper = () => wrapper.findComponent(ModalWrapper)
  const findAssetsGroupItems = () => wrapper.findAll('[data-test-id=wallet-currency]')
  const findNetworkSelector = () => wrapper.findComponent(WalletCreateNetwork)
  const findButtonByText = text => {
    return wrapper
      .findAllComponents(SwapButton)
      .filter(buttonWrapper => buttonWrapper.text().includes(text))
      .at(0)
  }

  beforeEach(() => {
    networksService.fetchAssets = jest.fn().mockResolvedValue(mockAssets)
    createComponent()
  })

  afterEach(() => {
    wrapper.destroy()
    wrapper = null
  })

  it('is center modal', () => {
    createComponent({ propsData: { isCenter: true } })

    const modalWrapper = findModalWrapper()

    expect(modalWrapper.props().center).toBe(true)
    expect(modalWrapper.vm.$scopedSlots.header).not.toBe(undefined)
  })

  it('sets modalWrapper title', () => {
    const modalWrapper = findModalWrapper()

    expect(modalWrapper.props().title).toBe('New wallet')
  })

  it('sets modalWrapper title when asset group is selected', async () => {
    const modalWrapper = findModalWrapper()
    const assetsGroupItem = findAssetsGroupItems().wrappers[0]

    await assetsGroupItem.trigger('click')

    expect(modalWrapper.props().title).toBe('Choose network')
  })

  it('emitted close event when modalWrapper closed', async () => {
    const modalWrapper = findModalWrapper()
    await modalWrapper.vm.$emit('cancel')

    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('emitted close event for center modal', async () => {
    createComponent({ propsData: { isCenter: true } })
    const closeButton = findButtonByText('mdi-close')

    await closeButton.vm.$emit('click')

    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('shows network selector when assets group is selected', async () => {
    const assetsGroupItem = findAssetsGroupItems().wrappers[0]

    await assetsGroupItem.trigger('click')

    expect(findNetworkSelector().exists()).toBe(true)
  })

  it('when the network is reset shows the group selection and hides the network selection', async () => {
    const assetsGroupItem = findAssetsGroupItems().wrappers[0]
    await assetsGroupItem.trigger('click')

    await findNetworkSelector().vm.$emit('back')

    expect(findAssetsGroupItems().exists()).toBe(true)
    expect(findNetworkSelector().exists()).toBe(false)
  })

  describe('Asset search', () => {
    let searchInput
    let searchEvent

    beforeEach(() => {
      searchInput = wrapper.findComponent(FormTextField)
      searchEvent = FormTextField.model?.event || 'input'
      networksService.searchAssets = jest.fn().mockResolvedValue([])
    })

    it('does not infinite loading when there is a search', async () => {
      await searchInput.vm.$emit(searchEvent, 'test')

      expect(wrapper.findComponent(InfiniteLoading).exists()).toBe(false)
    })

    it.each`
      searchString | length | expected
      ${'test'}    | ${4}   | ${1}
      ${'t'}       | ${1}   | ${0}
    `('calls the search $expected time when length of the search string is $length', ({ searchString, expected }) => {
      searchInput.vm.$emit(searchEvent, searchString)

      expect(networksService.searchAssets).toBeCalledTimes(expected)
    })
  })

  describe('Create wallet', () => {
    let profileId
    let BtcAsset
    let BtcNetwork

    beforeEach(() => {
      profileId = 'test'
      BtcAsset = { symbol: 'BTC' }
      BtcNetwork = {
        network: { slug: 'bitcoin' },
        assets: [BtcAsset]
      }
      profilesService.getCurrentProfileId = jest.fn().mockReturnValue(profileId)
      walletsService.getCurrentWallets = jest.fn().mockReturnValue([])
      walletsService.addWallet = jest.fn()
      SwapKeysApi.createWallet = jest.fn().mockResolvedValue({ wallet: {} })
    })

    it('calls SwapKeysApi for center modal', async () => {
      createComponent({ propsData: { isCenter: true } })
      await wrapper.vm.$nextTick()
      // Select asset group
      await findAssetsGroupItems().wrappers[0].trigger('click')

      // Select network and asset
      const networkSelector = findNetworkSelector()
      await networkSelector.vm.$emit('update:network', BtcNetwork)
      await networkSelector.vm.$emit('update:asset', BtcAsset)
      const createButton = findButtonByText('Create')

      await createButton.vm.$emit('click')

      expect(SwapKeysApi.createWallet).toBeCalledWith(
        expect.objectContaining({ profileId, networkId: BtcNetwork.network.slug, coin: BtcAsset.symbol })
      )
    })

    it('calls SwapKeysApi', async () => {
      // Select asset group
      await findAssetsGroupItems().wrappers[0].trigger('click')

      // Select network and asset
      const networkSelector = findNetworkSelector()
      await networkSelector.vm.$emit('update:network', BtcNetwork)
      await networkSelector.vm.$emit('update:asset', BtcAsset)

      await findModalWrapper().vm.$emit('submit')

      expect(SwapKeysApi.createWallet).toBeCalledWith(
        expect.objectContaining({ profileId, networkId: BtcNetwork.network.slug, coin: BtcAsset.symbol })
      )
    })
  })
})
