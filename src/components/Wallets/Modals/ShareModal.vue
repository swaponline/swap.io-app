<template>
  <modal-wrapper value :title="title" :back-icon="backIcon" @input="close" @cancel="close">
    <div class="share-modal">
      <div class="share-modal__wrapper">
        <img class="share-modal__qr-image" :src="qrCodeSrc" />

        <form-indent class="share-modal__indent share-modal__indent--url">
          <swap-copy-button class="share-modal__copy-button" :value="shareUrl" :label="shareUrl">
            <span class="share-modal__url">{{ shareUrl }}</span>
          </swap-copy-button>
        </form-indent>

        <div v-if="!isSystemShared" class="share-modal__socials">
          <a
            v-for="social in $options.SOCIALS"
            :key="social.name"
            class="share-modal__social-link"
            :class="`share-modal__social-link--${social.name}`"
            target="_blank"
            :href="`${social.link}${shareUrl}/`"
          >
            <svg-icon class="share-modal__social-icon" :name="`share-${social.name}`" />
          </a>
        </div>
      </div>

      <div v-if="hasData" class="share-modal__info">
        <form-indent class="share-modal__indent" :title="data.label">
          <swap-copy-button :value="data.value" :label="data.value" />
        </form-indent>
      </div>
    </div>

    <template #footer>
      <swap-button v-if="isSystemShared" block large @click="systemShare">Share</swap-button>
      <div v-else></div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'
import QRCode from 'qrcode-generator'

const SOCIALS = [
  { name: 'telegram', link: 'https://t.me/share/url?url=' },
  { name: 'facebook', link: 'https://www.facebook.com/sharer/sharer.php?u=' },
  { name: 'whatsapp', link: 'https://web.whatsapp.com/send?text=' }
]

const DEFAULT_TITLE = 'Share'

export default {
  name: 'ShareModal',
  components: { ModalWrapper, FormIndent },
  SOCIALS,
  props: {
    data: { type: Object, default: () => ({}) },
    shareUrl: { type: String, required: true },
    title: { type: String, default: DEFAULT_TITLE },
    backIcon: { type: Boolean, default: false }
  },
  data() {
    return {
      isSystemShared: navigator ? navigator.canShare : false
    }
  },
  computed: {
    qrCodeSrc() {
      const qr = new QRCode(0, 'M')
      qr.addData(this.shareUrl)
      qr.make()
      return qr.createDataURL(4, 0)
    },
    hasData() {
      return this.data?.value
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    systemShare() {
      navigator.share({
        title: 'Номер счета', // Заголовок
        text: `Адрес счета для ознакомления: \n${this.shareUrl}` // текст
      })
    }
  }
}
</script>

<style lang="scss">
$--color-telegram: #2c92d9;
$--color-facebook: #4267b2;
$--color-whatsapp: #25d366;

.share-modal {
  display: flex;
  flex-direction: column;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 12px;
    border-radius: $--main-border-radius;
    background-color: get-theme-for($background, 'secondary');
  }

  &__indent {
    margin-bottom: 0 !important;
    border-color: $--border-grey;
  }

  &__indent--url {
    max-width: 400px;
    width: 100%;
    padding: 12px;
  }

  &__url {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__qr-image {
    margin-bottom: 40px;
    height: 180px;
    width: 180px;
    object-fit: cover;
    object-position: center center;
    background: $--white;
    padding: 10px;
  }

  &__socials {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__social-link {
    background: transparent;
    color: $--grey-3 !important;
    margin: 0 13px;
    transition: 0.3s;

    &--telegram:hover {
      color: $--color-telegram !important;
    }
    &--facebook:hover {
      color: $--color-facebook !important;
    }
    &--whatsapp:hover {
      color: $--color-whatsapp !important;
    }
  }

  &__social-icon {
    height: 40px;
    width: 40px;
  }

  &__info {
    margin: 40px 0 16px 0;
  }

  &__copy-button {
    display: flex;
    width: 100%;
  }
}
</style>
