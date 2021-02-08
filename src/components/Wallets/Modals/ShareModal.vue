<template>
  <form-wrapper value class="share-modal" @input="close">
    <div class="share-modal__inner">
      <h3 class="share-modal__subtitle">
        <span>Share</span>
        <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </h3>

      <div class="share-modal__qr-image">
        <img :src="qrCodeSrc" />
      </div>

      <div v-if="isSystemShared" class="share-modal__buttons">
        <v-btn depressed class="share-modal__share-button" @click="systemShare">
          Share
        </v-btn>
      </div>

      <div v-else class="share-modal__buttons">
        <button v-for="social in socials" :key="social" class="share-modal__social-button" @click="clickSocial(social)">
          <svg-icon :name="`share-${social}`" />
        </button>
      </div>

      <p class="share-modal__indent">
        <span>{{ type === 'wallet' ? 'Wallet ID:' : 'Hash:' }}</span>
        <v-tooltip v-model="copyDataTooltip.value" top :open-on-hover="false" class="wallet-info__tooltip">
          <template #activator="{ on }">
            <button class="share-modal__copy-button" @click="copy(data, 'copyDataTooltip')">
              {{ data }}
              <svg-icon name="copy" v-on="on" />
            </button>
          </template>
          <span>Copied</span>
        </v-tooltip>
      </p>

      <p class="share-modal__indent">
        <span>Link to {{ type }}:</span>
        <v-tooltip v-model="copyUrlTooltip.value" top :open-on-hover="false" class="wallet-info__tooltip">
          <template #activator="{ on }">
            <button class="share-modal__copy-button" @click="copy(shareUrl, 'copyUrlTooltip')">
              {{ shareUrl }}
              <svg-icon name="copy" v-on="on" />
            </button>
          </template>
          <span>Copied</span>
        </v-tooltip>
      </p>
    </div>
  </form-wrapper>
</template>

<script>
import Copy from '@/utils/copy'

import SvgIcon from '@/components/SvgIcon.vue'
import FormWrapper from '../../FormWrapper.vue'

export default {
  name: 'ShareModal',
  components: {
    FormWrapper,
    SvgIcon
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      socials: ['telegram', 'facebook', 'whatsapp'],
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
    qrCodeSrc() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=202x202&data=${this.shareUrl}`
    },
    shareUrl() {
      return `${window.location.origin + this.type}/${this.data} `
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
      Copy(data)
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
.share-modal {
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 25px 50px 40px;
    min-height: calc(var(--vh, 1vh) * 100);

    @include phone {
      padding: 20px;
    }
  }
  &__subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 8px 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
  }
  &__qr-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    @include tablet {
      margin-bottom: 55px;
    }
    img {
      height: 202px;
      width: 202px;
      object-fit: cover;
      object-position: center center;
    }
  }
  &__buttons {
    padding: 20px 0;
    margin: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid $--light-grey;
    border-bottom: 1px solid $--light-grey;
    @include tablet {
      order: 4;
      margin: 30px 0;
    }
  }
  &__social-button {
    background: $--white;
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin: 0 13px;
    outline: none;
    border-radius: 50%;
    transition: 0.3s;
    &:hover {
      transform: scale(1.25, 1.25);
    }
    svg {
      height: 37px;
      width: 37px;
    }
  }
  &__indent {
    width: 100%;
    margin-bottom: 20px;
    color: $--dark-grey;
    font-size: $--font-size-medium;
    @include tablet {
      margin-bottom: 35px;
    }
    span {
      display: block;
    }
  }
  &__copy-button {
    width: 100%;
    outline: none;
    color: $--black;
    font-size: $--font-size-extra-small-subtitle;
    padding: 4px 0;
    word-break: break-all;
    text-align: left;
    transition: 0.3s;
    &:hover {
      background: $--light-grey;
    }
    svg {
      margin-bottom: -3px;
      margin-left: 5px;
      width: 16px;
      height: 16px;
    }
  }
}
</style>
