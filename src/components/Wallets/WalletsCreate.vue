<template>
  <div class="wallets-create">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <div class="wallets-create__create-new">
      <smiles-icon class="wallets-create__create-new-image" />
      <div class="wallets-create__create-new-text">
        <h4 class="wallets-create__create-new-title">Congrats!</h4>
        You have created a profile for yourself.<br />
        Now you can very easily add crypto wallets.
      </div>
      <swap-button class="wallets-create__button" primary @click="openWalletCreate">Create wallet</swap-button>
    </div>
  </div>
</template>

<script>
import SmilesIcon from '@/components/UI/Icons/Smiles.vue'
import ProfileList from '@/components/Wallets/ProfileList.vue'
import { MatchMedia } from 'vue-component-media-queries'

import { WALLET_CREATE } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'
import { mapMutations } from 'vuex'

export default {
  name: 'WalletsCreate',
  components: { SmilesIcon, ProfileList, MatchMedia },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    openWalletCreate() {
      this.mutationAddModal({
        name: WALLET_CREATE,
        show: true,
        info: { isCenter: true }
      })
    }
  }
}
</script>

<style lang="scss">
.wallets-create {
  max-height: 555px;
  max-width: 1064px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 auto;

  @include tablet {
    max-width: 100%;
    max-height: 100%;
  }

  &__create-new {
    border-radius: 12px;
    background: get-theme-for($background, 'primary');
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 10px;

    @include tablet {
      margin: 0 40px 40px;
      justify-content: center;
    }

    @include phone {
      margin: 0 12px 12px;
    }
  }
  &__create-new-image {
    margin-top: 80px;

    @include tablet {
      margin-top: 0;
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
      margin-bottom: 0;
    }
  }
}
</style>
