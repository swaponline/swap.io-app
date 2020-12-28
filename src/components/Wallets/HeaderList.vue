<template>
  <div>
    <v-toolbar class="header-list" color="purple">
      <v-btn class="header-list__button ml-1" icon @click="openAccountMenu">
        <v-img :src="photo" width="48" height="48" class="rounded-circle" position="center top" />
      </v-btn>
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
          {{ account.name }}
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
    photo() {
      // eslint-disable-next-line vue/max-len
      return `https://sun9-60.userapi.com/impg/zCF4saFPwlwi0PtC41GIQ1WP30Khy-thQ9FtuA/b6bn4u-Y9D4.jpg?size=646x1148&quality=96&proxy=1&sign=b1ff76233f1ee088d886dd165748e481&type=album`
    },
    balance() {
      return this.$store.getters.walletsSumm
    },
    styleParams() {
      return `max-height: ${48 * this.accounts.length}px;`
    },
    accounts() {
      return this.$store.state[WALLETS_MODULE].list
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
}
</style>
