<template>
  <v-speed-dial v-model="fab" class="main-actions" bottom left direction="top" transition="slide-y-reverse-transition">
    <template #activator>
      <v-btn v-model="fab" class="main-actions__open-button" dark fab height="auto" width="auto">
        <v-icon v-if="fab" class="main-actions__open-icon">
          mdi-close
        </v-icon>
        <svg-icon v-else name="plus" class="main-actions__open-icon" />
      </v-btn>
    </template>
    <v-btn fab dark color="green" class="main-actions__button" height="auto" width="auto" @click="openWalletCreate">
      <v-icon>mdi-wallet</v-icon>
    </v-btn>
    <v-btn fab dark :to="{ name: 'SecurityInfo' }" color="blue" class="main-actions__button" height="auto" width="auto">
      <v-icon>mdi-account-plus</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      color="indigo"
      class="main-actions__button main-actions__button--rotate"
      height="auto"
      width="auto"
      @click="openInvoiceBlock"
    >
      <v-icon>mdi-arrow-down-circle</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      color="indigo"
      class="main-actions__button main-actions__button--rotate"
      height="auto"
      width="auto"
      @click="openSendForm"
    >
      <v-icon>mdi-arrow-up-circle</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { INVOICE_FORM, SEND_FORM, WALLET_CREATE } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'
import { mapMutations } from 'vuex'

export default {
  name: 'MainActions',
  data() {
    return {
      fab: false
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    openInvoiceBlock() {
      this.mutationAddModal({
        name: INVOICE_FORM,
        show: true
      })
    },
    openSendForm() {
      this.mutationAddModal({
        name: SEND_FORM,
        show: true
      })
    },
    openWalletCreate() {
      this.mutationAddModal({
        name: WALLET_CREATE,
        show: true
      })
    }
  }
}
</script>

<style lang="scss">
.main-actions {
  &__open-button {
    background: $--purple !important;
    min-width: 65px;
    min-height: 65px;
    @include tablet {
      min-width: 75px;
      min-height: 75px;
    }
    @include phone {
      min-width: 50px;
      min-height: 50px;
    }
  }
  &__open-icon {
    width: 26px;
    height: 26px;
  }
  &__button {
    min-width: 55px;
    min-height: 55px;
    @include tablet {
      min-width: 45px;
      min-height: 45px;
    }
    @include phone {
      min-width: 40px;
      min-height: 40px;
    }
    &--rotate {
      transform: rotate(45deg);
    }
  }
}
.v-speed-dial {
  position: absolute;
  @include tablet {
    position: fixed;
    bottom: 80px !important;
    z-index: 100;
    transition: 0.5s;
    &--wallet {
      transform: translate(100vw, 0);
    }
  }
}
</style>
