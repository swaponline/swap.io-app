<template>
  <div class="invoice-shared">
    <header class="invoice-shared__header">
      <h2>Invoice {Номер счета}</h2>
      <v-btn icon @click="$emit('close')">
        <v-icon size="40">mdi-close</v-icon>
      </v-btn>
    </header>
    <div class="invoice-shared__content">
      <h3 class="mb-2 text-center">Отправьте эту ссылку плательщику для подтверждения платежа</h3>
      <div class="invoice-shared__qr mb-2">
        <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`" />
      </div>
      <v-btn text class="invoice-shared__main-link mb-2" @click="copy">
        {{ link }}
        <v-icon class="invoice-shared__icon-copy">mdi-content-copy</v-icon>
      </v-btn>
      <v-btn v-if="isSystemShared" class="invoice-shared__button blue" dark @click="systemShared">
        <v-icon class="mr-2">mdi-share-variant</v-icon>
        Share
      </v-btn>
      <div v-else class="invoice-shared__links mb-2">
        <v-btn
          dark
          class="invoice-shared__link blue"
          target="_blank"
          :href="`https://www.facebook.com/sharer.php?u=${link}`"
        >
          Facebook
        </v-btn>
        <v-btn
          dark
          class="invoice-shared__link blue"
          target="_blank"
          :href="`https://www.facebook.com/sharer.php?u=${link}`"
        >
          Facebook
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceShared',
  data() {
    return {
      link: window.location.href,
      isSystemShared: navigator ? navigator.canShare : false
    }
  },
  methods: {
    copy() {
      if (navigator && navigator.clipboard) {
        navigator.clipboard
          .writeText(this.wallet)
          .then(() => {
            this.show = true
            if (this.tooltipTimer) {
              clearTimeout(this.tooltipTimer)
            }
            this.tooltipTimer = setTimeout(() => {
              this.show = false
            }, 1500)
          })
          .catch(err => {
            console.log('Значение не скопировано', err)
          })
      }
    },
    systemShared() {
      if (this.isSystemShared) {
        navigator.share({
          title: 'Номер счета', // Заголовок
          text: `Адрес счета для ознакомления: \n${this.link}` // текст
        })
      }
    }
  }
}
</script>

<style lang="scss">
.invoice-shared {
  position: absolute;
  z-index: $--z-index-high;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  max-width: calc(var(--max-content-size) - var(--navigation-drawer-desktop-width));
  overflow-x: hidden;
  overflow-y: auto;
  background: $--white;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  @include tablet {
  }
  &__header {
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
    @include tablet {
      padding: 10px 0;
    }
  }
  &__content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @include tablet {
      flex-grow: 0;
    }
  }
  &__main-link {
    position: relative;
    opacity: 0.5;
    outline: none;
    padding-left: 24px;
    padding-bottom: 8px;
    max-width: 100vw;
    height: auto !important;
    &:hover {
      .invoice-links__icon-copy {
        opacity: 1;
      }
    }
    @include tablet {
      font-size: $--font-size-small;
      padding-left: 0;
      white-space: normal;
      word-break: break-all;
      span {
        display: inline;
        max-width: 100%;
      }
    }
  }
  &__icon-copy {
    opacity: 0;
    @include phone {
      display: none !important;
    }
  }
  &__link {
    text-decoration: none;
    min-width: 100px;
    min-height: 40px;
    margin: 0 10px;
  }
}
</style>
