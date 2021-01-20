<template>
  <div class="list-wallet">
    <v-list class="py-0">
      <v-list-item v-for="wallet in wallets" :key="wallet.name" class="px-0">
        <v-list-item
          v-if="wallet.subWallets.length === 1"
          link
          exact
          color="purple"
          class="list-wallet__wallet-item"
          :to="{ name: 'Wallet', params: { nameWallet: wallet.subWallets[0].address } }"
        >
          <v-list-item-icon class="list-wallet__icon-wrapper mr-4">
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
          class="list-wallet__wallet-item"
          color="purple"
          active-class="list-wallet__active-list-group"
        >
          <template #activator>
            <v-list-item-icon class="list-wallet__icon-wrapper mr-4">
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
            color="purple"
            exact
            :to="{ name: 'Wallet', params: { nameWallet: subWallet.address } }"
          >
            <v-list-item-content>
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
    <v-spacer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'ListWallet',
  components: {
    SvgIcon
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
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $--white;
  border-right: 1px solid $--grey;
  border-radius: 12px 12px 0 0;
  overflow-y: hidden;
  &__wallet-item {
    width: 100%;
    border-bottom: 1px solid rgba($color: $--black, $alpha: 0.2);
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
    min-width: 38px;
    height: 38px;
    background: $--grey;
  }
  &__icon {
    width: 20px;
    height: 20px;
    fill: $--white;
  }
}
</style>
