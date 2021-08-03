<template>
  <div v-if="walletAddress" class="wallet">
    <wallet-info
      v-if="currentWallet"
      class="wallet__main-info"
      v-bind="currentWallet"
      :compressed="compressed"
      @uncompress-wallet="compressed = false"
    ></wallet-info>
    <transaction-block
      class="wallet__transaction"
      :class="{ 'wallet__transaction--stretch': compressed }"
      :is-compressed-wallet="compressed"
      @compress-wallet="compressed = true"
      @uncompress-wallet="compressed = false"
    ></transaction-block>
  </div>
  <div v-else class="wallet__info-block">
    <div v-if="!currentWallets.length" class="wallet__create-new">
      <template v-if="!isCreatingWallet">
        <smiles-icon class="wallet__create-new-image" />
        <div class="wallet__create-new-text">
          <h4 class="wallet__create-new-title">Congrats!</h4>
          You have created a profile for yourself.<br />
          Now you can very easily add crypto wallets.
        </div>
        <swap-button class="wallet__create-new-button" color="var(--main-color)" @click="createWallet"
          >Create wallet</swap-button
        >
      </template>

      <wallet-create v-else as-block @close="isCreatingWallet = false" />
    </div>
  </div>
</template>

<script>
import WalletInfo from '@/components/Wallets/WalletInfo.vue'
import TransactionBlock from '@/components/Wallets/Transactions/index.vue'
import SmilesIcon from '@/components/UI/Icons/Smiles.vue'
import WalletCreate from '@/components/Wallets/Modals/WalletCreate.vue'

export default {
  name: 'Wallet',
  components: { TransactionBlock, WalletInfo, SmilesIcon, WalletCreate },
  data() {
    return {
      compressed: false,
      isCreatingWallet: false
    }
  },
  computed: {
    currentWallets() {
      return this.$store.getters.currentWallets
    },
    walletAddress() {
      return this.$route.params.walletAddress
    },
    currentWallet() {
      return this.$store.getters.currentSubWallets?.find(el => el.address === this.walletAddress)
    }
  },
  watch: {
    currentWallets: {
      immediate: true,
      handler(val) {
        if (!this.currentWallet && val.length > 0) {
          this.$router.replace({
            name: 'Wallet',
            params: { walletAddress: val[0].subWallets[0].address }
          })
        }
      }
    }
  },
  methods: {
    createWallet() {
      this.isCreatingWallet = true
    }
  }
}
</script>

<style lang="scss">
.wallet {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &__main-info {
    width: auto;
  }
  &__transaction {
    margin-top: 20px;
    flex-grow: 1;
    height: 50%;
    transition: 0.5s;

    @include tablet {
      margin-top: 0px;
    }
    @include phone {
      &:after {
        position: absolute;
        content: '';
        height: 324px;
        width: 100%;
        top: -80px;
        background: rgba($--black, 0.45);
        transition: 0.5s;
        z-index: 2;
        opacity: 0;
        pointer-events: none;
      }
      &--stretch {
        &:after {
          height: 152px;
          opacity: 1;
        }
      }
    }
  }

  &__info-block {
    min-height: 250px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: $--white;
  }

  &__create-new {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__create-new-image {
    margin-top: 80px;
  }
  &__create-new-title {
    font-size: $--font-size-subtitle;
    font-weight: $--font-weight-semi-bold;
    margin-bottom: 14px;
  }
  &__create-new-text {
    margin-bottom: 46px;
    text-align: center;
    font-size: $--font-size-extra-small-subtitle;
    line-height: 24px;
    font-weight: $--font-weight-regular;
  }
  &__create-new-button {
    color: $--white !important;
    min-height: 45px;
    padding: 0 36px !important;
    margin-bottom: 100px;
  }
}
</style>
