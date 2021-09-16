<template>
  <v-dialog :value="value" content-class="copy-menu" transition="slide-y-reverse-transition" @click:outside="close">
    <div class="copy-menu__buttons">
      <div v-if="showAddress" class="copy-menu__address">{{ address }}</div>
      <v-btn color="white" depressed class="copy-menu__button" @click="copy">Copy</v-btn>
      <v-btn color="white" depressed class="copy-menu__button" @click="openQrModal">qr-code</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import copy from '@/utils/copy'
import { mapMutations } from 'vuex'

import { SHARE_MODAL } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'

export default {
  name: 'CopyMenu',
  props: {
    address: {
      type: String,
      default: ''
    },
    showAddress: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    copy() {
      copy(this.address)
      this.close()
    },
    openQrModal() {
      this.close()
      this.mutationAddModal({
        name: SHARE_MODAL,
        info: {
          type: 'wallet',
          data: this.address
        }
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.copy-menu {
  margin-top: auto;
  box-shadow: none;
  :not(:last-child) {
    border-bottom: 1px solid $--light-grey !important;
  }
  &__buttons {
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    max-width: 540px;
    margin: auto;
  }
  &__address {
    min-height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    text-align: center;
    background: $--white;
    font-weight: $--font-weight-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__button {
    width: 100%;
    border-radius: 0;
    min-height: 60px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-extra-small-subtitle;
    }
  }
}
</style>
