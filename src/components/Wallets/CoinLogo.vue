<template>
  <div class="coin-logo">
    <v-tooltip v-if="showTooltip" bottom>
      <template v-slot:activator="{ on, attrs }">
        <img class="coin-logo__image" v-bind="attrs" :src="logoSrc" :alt="name" v-on="on" />
      </template>
      <span>{{ name }}</span>
    </v-tooltip>
    <img v-else class="coin-logo__image" :src="logoSrc" :alt="name" />
  </div>
</template>

<script>
import { walletsService } from '@/services/wallets'

export default {
  name: 'CoinLogo',
  props: {
    path: { type: String, default: '' },
    name: { type: String, default: '' },
    showTooltip: { type: Boolean, default: false }
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
  display: flex;
  &__image {
    object-fit: contain;
    max-width: 100%;
  }
}
</style>
