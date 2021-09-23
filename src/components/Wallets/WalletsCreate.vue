<template>
  <div class="wallets-create" :class="{ 'wallets-create--centered': isCreatingWallet }">
    <div class="wallets-create__create-new">
      <template v-if="!isCreatingWallet">
        <smiles-icon class="wallets-create__create-new-image" />
        <div class="wallets-create__create-new-text">
          <h4 class="wallets-create__create-new-title">Congrats!</h4>
          You have created a profile for yourself.<br />
          Now you can very easily add crypto wallets.
        </div>
        <swap-button class="wallets-create__button" primary @click="isCreatingWallet = true">Create wallet</swap-button>
      </template>

      <wallet-create v-else as-block @close="isCreatingWallet = false" />
    </div>
  </div>
</template>

<script>
import SmilesIcon from '@/components/UI/Icons/Smiles.vue'
import WalletCreate from '@/components/Wallets/Modals/WalletCreate.vue'

export default {
  name: 'WalletsCreate',
  components: { SmilesIcon, WalletCreate },
  data() {
    return {
      isCreatingWallet: false
    }
  }
}
</script>

<style lang="scss">
.wallets-create {
  min-height: 250px;
  max-height: 100%;
  width: 100%;
  border-radius: 12px;
  overflow-y: auto;
  background: var(--primary-background);

  &--centered {
    display: block;
    max-width: 450px;
    flex-grow: 0;
    margin: 0 auto;
    padding: 20px;
  }

  &__create-new {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__create-new-image {
    margin-top: 80px;

    @include phone {
      margin-top: 75px;
    }
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
  &__button {
    padding: 0 36px !important;
    margin-bottom: 100px;

    @include phone {
      margin-bottom: 32px;
    }
  }
}
</style>
