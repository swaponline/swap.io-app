import ShareModal from '@/components/Wallets/Modals/ShareModal.vue'
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import SwapCopyButton from '@/components/UI/SwapCopyButton.vue'
import SwapButton from '@/components/UI/SwapButton.vue'

import { shallowMount } from '@vue/test-utils'
import { stubComponent } from '../../../__helpers__/stubComponent'

const ModalWrapperStub = stubComponent(ModalWrapper, {
  template: '<div><slot name="header"></slot><slot></slot><slot name="footer"></slot></div>'
})

describe('WalletCreate', () => {
  let wrapper

  const DEFAULT_PROPS = {
    shareUrl: '/test',
    data: {}
  }

  const createComponent = ({ propsData, provide } = {}) => {
    wrapper = shallowMount(ShareModal, {
      propsData: { ...DEFAULT_PROPS, ...propsData },
      provide: {
        mediaQueries: { mobile: false, desktop: true },
        ...provide
      },
      stubs: {
        ModalWrapper: ModalWrapperStub
      }
    })
  }

  beforeEach(() => {
    createComponent()
  })

  it('emitted close event when modalWrapper closed', () => {
    const modalWrapper = wrapper.findComponent(ModalWrapper)
    modalWrapper.vm.$emit('cancel')

    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('renders copy url button', () => {
    const copyButton = wrapper.findComponent(SwapCopyButton)

    expect(copyButton.props().value).toBe(DEFAULT_PROPS.shareUrl)
    expect(copyButton.text()).toContain(DEFAULT_PROPS.shareUrl)
  })

  it('shows a list of social networks if system sharing is not available', () => {
    const socialLinks = wrapper.findAll('[data-testid=social-link]')

    expect(socialLinks.length).toBe(3)
  })

  it('shows share button if system sharins is available', () => {
    window.navigator.canShare = true
    createComponent()

    const shareButton = wrapper.findComponent(SwapButton)

    expect(shareButton.exists()).toBe(true)
  })

  it('call share method', () => {
    const shareMock = jest.fn()
    window.navigator.share = shareMock
    window.navigator.canShare = true
    createComponent()

    const shareButton = wrapper.findComponent(SwapButton)
    shareButton.vm.$emit('click')
    expect(shareMock).toBeCalled()
  })

  it('does not show a list of social networks if system sharing is available', () => {
    window.navigator.canShare = true
    createComponent()
    const socialLinks = wrapper.findAll('[data-testid=social-link]')

    expect(socialLinks.length).toBe(0)
  })

  it('shows data copy button if has data', () => {
    const testData = { value: 'test value', label: 'test label' }
    createComponent({ propsData: { ...DEFAULT_PROPS, data: testData } })

    const dataField = wrapper.find('[data-testid=share-data]')
    const dataCopyButton = dataField.findComponent(SwapCopyButton)

    expect(dataField.exists()).toBe(true)
    expect(dataCopyButton.exists()).toBe(true)

    expect(dataField.props().title).toBe(testData.label)
    expect(dataCopyButton.props().label).toBe(testData.value)
    expect(dataCopyButton.props().value).toBe(testData.value)
  })

  it.todo('v-for="social in $options.SOCIALS"')
  it.todo(':src="qrCodeSrc"')
})
