<template>
  <img class="coin-logo" :src="logoSrc" :alt="name" />
</template>

<script>
import { walletsService } from '@/services/wallets'

export default {
  name: 'CoinLogo',
  props: {
    path: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  computed: {
    logoSrc() {
      return walletsService.getLogo(this.path)
    }
  }
}
</script>

<style lang="scss">
.coin-logo {
  object-fit: contain;
}
</style>
