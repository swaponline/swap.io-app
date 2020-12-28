<template>
  <div>
    <v-toolbar class="header-list" color="purple">
      <v-btn class="header-list__button ml-0" icon @click="openAccountMenu">
        <img
          height="48"
          width="48"
          class="header-list__avatar"
          :src="`https://identicon-api.herokuapp.com/${currentAccount.name}/96?format=png`"
          alt="avatar"
        />
      </v-btn>
      <span class="header-list__name">{{ currentAccount.name }}</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="header-list__summ align-center">
        <span>{{ balance }}</span>
      </v-toolbar-items>
    </v-toolbar>
    <div
      class="header-list__extension"
      :style="openMenu ? styleParams : ''"
      :class="{
        'header-list__extension--visible': openMenu
      }"
    >
      <v-list class="py-0">
        <v-list-item v-for="account in accounts" :key="account.id" @click="setAccount(account.id)">
          <img
            height="48"
            width="48"
            class="header-list__avatar-item"
            :src="`https://identicon-api.herokuapp.com/${account.name}/96?format=png`"
            alt="avatar-item"
            loading="lazy"
          />
          <span>{{ account.name }}</span>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_NAME as WALLETS_MODULE, SET_ACCOUNT_ID } from '@/store/modules/Wallets'

export default {
  name: 'HeaderList',
  data() {
    return {
      openMenu: false
    }
  },
  computed: {
    balance() {
      return this.$store.getters.walletsSumm
    },
    styleParams() {
      return `max-height: ${48 * this.accounts.length}px;`
    },
    accounts() {
      return this.$store.state[WALLETS_MODULE].list
    },
    currentAccount() {
      return this.$store.getters.currentAccount
    }
  },
  methods: {
    ...mapActions({
      actionSetAccount: SET_ACCOUNT_ID
    }),
    openAccountMenu() {
      this.openMenu = !this.openMenu
    },
    setAccount(id) {
      this.actionSetAccount(id)
      this.openMenu = false
    }
  }
}
</script>

<style lang="scss">
.header-list {
  font-size: 18px;
  max-height: 64px;
  &__summ {
    color: $--white;
    font-weight: 500;
  }
  &__extension {
    overflow: hidden;
    max-height: 0;
    transition: 0.5s;
    background: yellow;
    &--visible {
      height: auto;
      // @include tablet {
      //   min-height: calc(100vh - 152px) !important;
      // }
    }
  }
  &__avatar {
    background: white;
    border-radius: 50%;
  }
  &__name {
    margin-left: 10px;
    color: $--white;
  }
  &__avatar-item {
    border-radius: 50%;
    margin-right: 15px;
  }
}
</style>
