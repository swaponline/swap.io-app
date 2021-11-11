<template>
  <div class="coin-logo">
    <v-tooltip v-if="showTooltip" bottom>
      <template #activator="{ on, attrs }">
        <img v-if="path" class="coin-logo__image" v-bind="attrs" :src="logoSrc" :alt="`${name} logo`" v-on="on" />
        <span v-else class="coin-logo__stub" v-bind="attrs" v-on="on"></span>
      </template>
      <span>{{ name }}</span>
    </v-tooltip>
    <img v-else-if="path" class="coin-logo__image" :src="logoSrc" :alt="`${name} logo`" />
    <span v-else class="coin-logo__stub"></span>
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

  &__stub {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $--grey-2;
  }
}
</style>
