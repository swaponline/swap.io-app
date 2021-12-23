<template>
  <div class="wallet-create-network">
    <div class="wallet-create-network__asset-group">
      <coin-logo class="wallet-create-network__asset-group-icon" :path="assetGroup.logo" :name="assetGroup.symbol" />
      {{ assetGroup.symbol }}
      <button class="wallet-create-network__asset-group-change" @click="back">Change</button>
    </div>

    <h4 class="wallet-create-network__subtitle">Networks</h4>
    <v-chip-group v-model="networkModel" column>
      <v-chip
        v-for="networkItem in networks"
        :key="networkItem.network.slug"
        class="wallet-create-network__chip"
        :value="networkItem"
      >
        {{ networkItem.network.name }}
      </v-chip>
    </v-chip-group>

    <template v-if="networkModel">
      <h4 class="wallet-create-network__asset-title">Assets</h4>
      <v-radio-group v-model="assetModel" hide-details class="wallet-create-network__asset-list">
        <v-radio
          v-for="(item, index) in networkAssets"
          :key="`${item.symbol}-${index}`"
          :value="item"
          :ripple="false"
          class="wallet-create-network__asset"
          active-class="wallet-create-network__asset--active"
        >
          <template #label>
            <div class="wallet-create-network__asset-label">
              <coin-logo class="wallet-create-network__asset-icon" :path="item.logo" :name="item.symbol" />
              <span class="wallet-create-network__asset-name">{{ item.symbol }}</span>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </template>
  </div>
</template>

<script>
import CoinLogo from '@/components/Wallets/CoinLogo.vue'

export default {
  name: 'WalletCreateNetwork',
  components: { CoinLogo },
  props: {
    assetGroup: { type: Object, default: null },
    network: { type: Object, default: null },
    asset: { type: Object, default: null }
  },

  computed: {
    assetModel: {
      get() {
        return this.asset
      },
      set(value) {
        this.$emit('update:asset', value)
      }
    },
    networkModel: {
      get() {
        return this.network
      },
      set(value) {
        this.$emit('update:network', value)
      }
    },
    networks() {
      return this.assetGroup?.networks || []
    },
    networkAssets() {
      return this.networkModel?.assets || []
    }
  },

  watch: {
    network() {
      if (this.networkAssets.length) {
        // eslint-disable-next-line prefer-destructuring
        this.assetModel = this.networkAssets[0]
      } else {
        this.assetModel = null
      }
    }
  },

  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss">
.wallet-create-network {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 8px;

  &__asset-group {
    display: flex;
    align-items: center;
    height: 52px;
    padding: 14px;
    margin-bottom: 15px;
    font-size: $--font-size-extra-small-subtitle;
    font-weight: $--font-weight-semi-bold;
    background-color: get-theme-for($background, 'secondary');
    border-radius: $--main-border-radius;
  }

  &__asset-group-icon {
    margin-right: 14px;
    width: 20px;
    height: 20px;
  }

  &__asset-group-change {
    margin-left: auto;
    color: $--grey-3;

    &:hover {
      text-decoration: underline;
    }
  }

  &__subtitle {
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 10px;
  }

  &__chip {
    padding: 0 8px !important;
    border-radius: 4px !important;
    background-color: get-theme-for($button, 'primary', 'enabled') !important;
  }

  &__asset-title {
    color: $--grey-3;
    font-weight: $--font-weight-semi-bold;
    margin: 10px 0;
  }

  &__asset-list {
    overflow: auto;
    margin-top: 0;
    padding-top: 0;
  }

  &__asset {
    border-radius: $--main-border-radius;
    transition: 0.2s;
    margin: 2px 0 !important;

    &--active,
    &:hover {
      background-color: get-theme-for($button, 'primary', 'enabled');
    }

    .v-input--selection-controls__input {
      display: none;
    }
  }

  &__asset-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
  }

  &__asset-icon {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }
}
</style>
