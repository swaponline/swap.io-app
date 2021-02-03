<template>
  <div class="list-wallet">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <v-list class="list-wallet__main-list py-0">
      <v-list-item v-for="wallet in wallets" :key="wallet.name" class="list-wallet__wallet-item px-0">
        <v-list-item
          v-if="wallet.subWallets.length === 1"
          link
          exact
          class="list-wallet__group"
          :to="{ name: 'Wallet', params: { walletAddress: wallet.subWallets[0].address } }"
        >
          <v-list-item-icon class="list-wallet__icon-wrapper">
            <svg-icon class="list-wallet__icon" name="btc" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="d-flex mr-4 justify-space-between">
              <div>{{ wallet.name }}</div>
              <div>{{ wallet.value }}</div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-else
          class="list-wallet__group"
          color="grey lighten-1"
          active-class="list-wallet__active-list-group"
        >
          <template #activator>
            <v-list-item-icon class="list-wallet__icon-wrapper">
              <svg-icon class="list-wallet__icon" name="btc" />
            </v-list-item-icon>
            <v-list-item-title class="d-flex">
              <span>{{ wallet.name }}</span>
              <v-spacer></v-spacer>
              <span>{{ wallet.value }}</span>
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(subWallet, i) in wallet.subWallets"
            :key="i"
            link
            exact
            class="list-wallet__item"
            :to="{ name: 'Wallet', params: { walletAddress: subWallet.address } }"
          >
            <v-list-item-content class="list-wallet__item-content">
              <v-list-item-title class="d-flex mr-4">
                {{ subWallet.name }}
                <v-spacer />
                {{ subWallet.value }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'

import { MatchMedia } from 'vue-component-media-queries'
import ProfileList from './ProfileList.vue'

export default {
  name: 'ListWallet',
  components: {
    ProfileList,
    MatchMedia
  },
  computed: {
    wallets() {
      return this.$store.getters.currentListWallets
    }
  },
  mounted() {
    this.actionGetAccountId()
  },
  methods: {
    ...mapActions({
      actionGetAccountId: GET_ACCOUNT_ID
    })
  }
}
</script>

<style lang="scss">
.list-wallet {
  position: relative;
  max-width: 305px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px 12px 0 0;
  overflow-y: hidden;
  @include tablet {
    max-width: none;
  }
  &__main-list {
    height: 100%;
    background: $--white;
    border-radius: 12px 12px 0 0 !important;
  }
  &__wallet-item {
    justify-content: center;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      width: calc(100% - 30px);
      min-height: 1px;
      background: rgba($--black, 0.1);
    }
  }
  &__group {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    margin: 8px 10px;
  }
  &__item {
    min-height: 40px;
    margin: 0 10px;
    border-radius: 12px;
    overflow: hidden;
    &:first-child {
      margin-top: 5px;
    }
    &:before {
      z-index: 0;
      background: $--black;
    }
  }
  &__item-content {
    position: relative;
    padding: 0 0;
  }
  &__currnecy {
    color: rgba($color: $--white, $alpha: 0.5);
    margin-right: 4px;
  }
  &__active-list-group {
    color: rgba($--black, 0.87);
  }
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    min-width: 45px;
    height: 45px;
    margin: 15px 16px 15px 0 !important;
  }
  &__icon {
    width: 45px;
    height: 45px;
    fill: $--white;
  }
}
</style>
