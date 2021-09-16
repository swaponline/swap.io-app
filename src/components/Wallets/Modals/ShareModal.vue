<template>
  <modal-wrapper value title="Share" @input="close" @cancel="close">
    <div class="share-modal">
      <div class="share-modal__wrapper">
        <img class="share-modal__qr-image" :src="qrCodeSrc" />

        <form-indent class="share-modal__indent share-modal__indent--url">
          <v-tooltip v-model="copyUrlTooltip.value" top :open-on-hover="false">
            <template #activator="{ on }">
              <button
                class="share-modal__copy-button share-modal__copy-button--url"
                @click="copy(shareUrl, 'copyUrlTooltip')"
              >
                <span class="share-modal__url">{{ shareUrl }}</span>
                <svg-icon class="share-modal__url-copy" name="copy" v-on="on" />
              </button>
            </template>
            <span>Copied</span>
          </v-tooltip>
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

      <div class="share-modal__info">
        <form-indent class="share-modal__indent" :title="isWallet ? 'Wallet id' : 'Hash'">
          <v-tooltip v-model="copyDataTooltip.value" top :open-on-hover="false">
            <template #activator="{ on }">
              <button class="share-modal__copy-button" @click="copy(data, 'copyDataTooltip')">
                {{ data }}
                <svg-icon name="copy" v-on="on" />
              </button>
            </template>
            <span>Copied</span>
          </v-tooltip>
        </form-indent>
      </div>
    </div>

    <template #footer>
      <swap-button v-if="isSystemShared" class="share-modal__button" depressed @click="systemShare">Share</swap-button>
      <div v-else></div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'
import copy from '@/utils/copy'
import QRCode from 'qrcode-generator'

const SOCIALS = [
  { name: 'telegram', link: 'https://t.me/share/url?url=' },
  { name: 'facebook', link: 'https://www.facebook.com/sharer/sharer.php?u=' },
  { name: 'whatsapp', link: 'https://web.whatsapp.com/send?text=' }
]

export default {
  name: 'ShareModal',
  components: { ModalWrapper, FormIndent },
  SOCIALS,
  props: {
    type: { type: String, default: '' },
    data: { type: String, default: '' }
  },
  data() {
    return {
      isSystemShared: navigator ? navigator.canShare : false,
      copyDataTooltip: {
        value: false,
        timer: 0
      },
      copyUrlTooltip: {
        value: false,
        timer: 0
      }
    }
  },
  computed: {
    isWallet() {
      return this.type === 'wallet'
    },
    qrCodeSrc() {
      const qr = new QRCode(0, 'M')
      qr.addData(this.shareUrl)
      qr.make()
      return qr.createDataURL(4, 0)
    },
    shareUrl() {
      return `${window.location.origin}/${this.type}/${this.data}`
    }
  },
  beforeDestroy() {
    clearTimeout(this.copyDataTooltip.timer)
    clearTimeout(this.copyUrlTooltip.timer)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickSocial(name) {
      console.log('shareSocial', name)
    },
    systemShare() {
      navigator.share({
        title: 'Номер счета', // Заголовок
        text: `Адрес счета для ознакомления: \n${this.shareUrl}` // текст
      })
    },
    copy(data, tooltipName) {
      copy(data)
        .then(() => {
          this[tooltipName].value = true
          if (this[tooltipName].timer) {
            clearTimeout(this[tooltipName].timer)
          }
          this[tooltipName].timer = setTimeout(() => {
            this[tooltipName].value = false
          }, 1500)
        })
        .catch(err => {
          console.log('Значение не скопировано', err)
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
    background-color: var(--main-input-background);
  }

  &__indent {
    margin-bottom: 0 !important;
    border-color: $--border-grey;
  }

  &__indent--url {
    max-width: 400px;
    width: 100%;
  }

  &__url {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__url-copy {
    flex-shrink: 0;
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

  &__button {
    margin: auto 0 0;
    border-radius: $--main-border-radius;
    min-height: 52px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
  }

  &__copy-button {
    width: auto;
    outline: none;
    color: var(--primary-text);
    font-size: $--font-size-extra-small-subtitle;
    padding: 4px 0;
    word-break: break-all;
    text-align: left;
    transition: 0.3s;

    &:hover {
      background: var(--main-button-background);
    }

    svg {
      margin-bottom: -3px;
      margin-left: 5px;
      width: 16px;
      height: 16px;
    }
  }

  &__copy-button--url {
    display: flex;
    width: 100%;
  }
}
</style>
