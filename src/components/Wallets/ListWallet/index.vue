<template>
  <div class="list-wallet">
    <match-media v-slot="{ desktop }">
      <profile-list v-if="!desktop"></profile-list>
    </match-media>
    <v-list class="list-wallet__main-list py-0">
      <v-list-item class="px-0">
        <total-wallet-summ />
      </v-list-item>
      <v-list-item v-for="wallet in wallets" :key="wallet.name" class="list-wallet__wallet-item px-0">
        <list-item v-if="wallet.subWallets.length === 1" v-bind="wallet"></list-item>
        <list-group v-else v-bind="wallet"></list-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_ACCOUNT_ID } from '@/store/modules/Wallets'
import { MatchMedia } from 'vue-component-media-queries'
//  components
import ProfileList from '../ProfileList.vue'
import TotalWalletSumm from './TotalWalletSumm.vue'
import ListGroup from './Group.vue'
import ListItem from './Item.vue'

export default {
  name: 'ListWallet',
  components: {
    ProfileList,
    TotalWalletSumm,
    MatchMedia,
    ListGroup,
    ListItem
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
    overflow: auto;
    background: $--white;
    border-radius: 12px 12px 0 0 !important;
    @include tablet {
      border-radius: 0 !important;
    }
  }
  &__wallet-item {
    justify-content: center;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      width: calc(100% - 30px);
      min-height: 1px;
      background: $--light-grey;
    }
  }
}
</style>
