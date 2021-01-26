<template>
  <v-expansion-panels v-model="panels" class="header-list-wrapper">
    <v-expansion-panel class="header-list">
      <v-expansion-panel-header class="header-list__expansion-button">
        <v-avatar height="50" width="50" min-width="50" class="header-list__avatar">
          <img height="45" width="45" :src="getSrcAvatar(currentAccountName)" alt="avatar" />
        </v-avatar>
        <span class="header-list__name">{{ currentAccountName }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list class="header-list__list-account py-0">
          <v-list-item v-for="account in accounts" :key="account.id" @click="setAccount(account.id)">
            <img
              height="48"
              width="48"
              class="header-list__avatar-item"
              :src="getSrcAvatar(account.name)"
              alt="avatar-item"
              loading="lazy"
            />
            <span>{{ account.name }}</span>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_NAME as WALLETS_MODULE, SET_ACCOUNT_ID } from '@/store/modules/Wallets'

export default {
  name: 'HeaderList',
  data() {
    return {
      panels: []
    }
  },
  computed: {
    balance() {
      return this.$store.getters.walletsSumm
    },
    styleParams() {
      return `height: ${48 * this.accounts.length}px; overflow: auto;`
    },
    accounts() {
      return this.$store.state[WALLETS_MODULE].list
    },
    currentAccount() {
      return this.$store.getters.currentAccount
    },
    currentAccountName() {
      return this.currentAccount.name
    }
  },
  methods: {
    ...mapActions({
      actionSetAccount: SET_ACCOUNT_ID
    }),
    setAccount(id) {
      this.$router.push({ name: 'Wallets', query: null })
      this.actionSetAccount(id)
      this.panels = []
    },
    getSrcAvatar(name) {
      return `https://identicon-api.herokuapp.com/${name}/96?format=png`
    }
  }
}
</script>

<style lang="scss">
.header-list-wrapper {
  width: auto;
  display: none;
  @include tablet {
    display: flex;
    margin: 20px 40px;
  }
  @include phone {
    margin: 8px;
  }
}
.header-list {
  border-radius: 12px !important;
  &__expansion-button {
    margin: 0;
    padding: 0 15px;
    min-height: 80px;
    background: $--white;
    border-radius: 12px;

    @include phone {
      min-height: 70px;
    }
  }
  &__avatar {
    margin-right: 12px;
    flex: 0 !important;
    height: 50px;
    width: 50px;
  }
  &__list-account {
    margin: 0 -24px -6px;
  }
  &__name {
    font-weight: $--font-weight-medium;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__avatar-item {
    border-radius: 50%;
  }
}
</style>
