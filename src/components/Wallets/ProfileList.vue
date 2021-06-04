<template>
  <v-expansion-panels v-model="panels" class="profile-list">
    <v-expansion-panel class="profile-list__inner">
      <v-expansion-panel-header class="profile-list__header" :hide-actions="isDesktop">
        <v-avatar height="50" width="50" min-width="50" class="profile-list__avatar-wrapper">
          <img
            height="45"
            width="45"
            class="profile-list__avatar"
            :src="getSrcAvatar(currentAccountName)"
            alt="avatar"
          />
        </v-avatar>
        <span class="profile-list__name">{{ currentAccountName }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list class="profile-list__list-account py-0">
          <v-list-item
            v-for="account in accounts"
            :key="account.id"
            class="profile-list__list-item"
            @click="setAccount(account.id)"
          >
            <v-avatar height="50" width="50" min-width="50" class="profile-list__avatar-wrapper">
              <img
                height="45"
                width="45"
                class="profile-list__avatar-item"
                :src="getSrcAvatar(account.name)"
                alt="avatar-item"
                loading="lazy"
              />
            </v-avatar>
            <span>{{ account.name }}</span>
          </v-list-item>
          <button class="profile-list__add-new-profile" @click="toSecurityInfo">+ Add profile</button>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULE_NAME as WALLETS_MODULE, SET_ACCOUNT_ID } from '@/store/modules/Wallets'

export default {
  name: 'ProfileList',
  inject: ['mediaQueries'],
  data() {
    return {
      panels: []
    }
  },
  computed: {
    isDesktop() {
      return this.mediaQueries.desktop
    },
    balance() {
      return this.$store.getters.walletsSumm
    },
    styleParams() {
      return `height: ${48 * this.accounts.length}px; overflow: auto;`
    },
    currentAccount() {
      return this.$store.getters.currentAccount
    },
    accounts() {
      return this.$store.state[WALLETS_MODULE].list.filter(el => el.id !== this.currentAccount.id)
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
    },
    toSecurityInfo() {
      return this.$router.push({ name: 'SecurityInfo' })
    }
  }
}
</script>

<style lang="scss">
.profile-list {
  display: flex;
  overflow: visible;
  height: 80px;
  min-width: 200px;

  @include tablet {
    width: auto;
    margin: 20px 40px;
  }
  @include phone {
    height: 70px;
    margin: 8px;
  }
  &__inner {
    border-radius: 12px !important;
    &.v-item--active {
      box-shadow: 0px 4px 20px rgba(17, 17, 17, 0.1);
    }
    &::before {
      display: none;
      @include tablet {
        display: block;
      }
    }
  }
  &__header {
    margin: 0;
    padding: 0 25px;
    min-height: 80px !important;
    background: $--white;
    border-radius: 12px;
    @include phone {
      min-height: 70px !important;
    }
  }
  &__avatar-wrapper {
    margin-right: 12px;
    flex: 0 !important;
    border-radius: 50% !important;
  }
  &__list-account {
    margin: 0 -24px -6px;
  }
  &__list-item {
    padding: 0 25px;
    height: 80px;
  }
  &__add-new-profile {
    width: 100%;
    border-top: 1px solid #f6f6f6;
    padding: 16px 32px 15px 25px;
    color: $--black;
  }
  &__name {
    font-weight: $--font-weight-medium;
    font-size: $--font-size-extra-small-subtitle;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
