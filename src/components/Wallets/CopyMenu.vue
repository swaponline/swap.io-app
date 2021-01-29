<template>
  <v-dialog :value="true" content-class="copy-menu">
    <div class="copy-menu__buttons">
      <v-btn depressed class="copy-menu__button" @click="copy">Copy</v-btn>
      <v-btn depressed class="copy-menu__button" @click="openQrModal">qr-code</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import copy from '@/utils/copy'

export default {
  name: 'CopyMenu',
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.visible = true
  },
  methods: {
    copy() {
      copy(this.address)
      this.$emit('close')
    },
    openQrModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.copy-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: none;

  &__buttons {
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    max-width: 540px;
  }
  &__button {
    background: $--white;
    width: 100%;
    border-radius: 0;
    min-height: 60px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
  }
}
</style>
