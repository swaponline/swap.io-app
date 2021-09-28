<template>
  <v-speed-dial
    v-model="isOpen"
    class="main-actions-button"
    :direction="direction"
    transition="slide-y-reverse-transition"
  >
    <template #activator>
      <v-btn
        class="main-actions-button__open-button"
        dark
        fab
        height="auto"
        width="auto"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <v-icon class="main-actions-button__open-icon" :class="{ 'main-actions-button__open-icon--rotated': isOpen }">
          mdi-close
        </v-icon>
      </v-btn>
    </template>
    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          dark
          class="main-actions-button__button main-actions-button__button--green"
          height="auto"
          width="auto"
          v-bind="attrs"
          @click="openWalletCreate"
          v-on="on"
        >
          <v-icon>mdi-wallet</v-icon>
        </v-btn>
      </template>
      <span>New wallet</span>
    </v-tooltip>
    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          dark
          :to="{ name: 'CreateOrRecover' }"
          class="main-actions-button__button main-actions-button__button--blue"
          height="auto"
          width="auto"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <span>New profile</span>
    </v-tooltip>
    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          dark
          class="main-actions-button__button main-actions-button__button--indigo main-actions-button__button--rotate"
          height="auto"
          width="auto"
          v-bind="attrs"
          v-on="on"
          @click="openInvoiceBlock"
        >
          <v-icon>mdi-arrow-down-circle</v-icon>
        </v-btn>
      </template>
      <span>Receive</span>
    </v-tooltip>
    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          dark
          class="main-actions-button__button main-actions-button__button--indigo main-actions-button__button--rotate"
          height="auto"
          width="auto"
          v-bind="attrs"
          v-on="on"
          @click="openSendForm"
        >
          <v-icon>mdi-arrow-up-circle</v-icon>
        </v-btn>
      </template>
      <span>Send</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import { INVOICE_FORM, SEND_FORM, WALLET_CREATE } from '@/store/modules/Modals/names'
import { ADD_MODAL } from '@/store/modules/Modals'
import { mapMutations } from 'vuex'

export default {
  name: 'MainActionsButton',
  inheritAttrs: false,
  props: {
    direction: { type: String, default: 'top' }
  },
  data() {
    return {
      isOpen: false
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
.main-actions-button {
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include phone {
    width: 50px;
    height: 50px;
  }

  &__open-button {
    background: var(--main-color) !important;
    min-width: 65px;
    min-height: 65px;

    &:before {
      background-color: rgba($--black, 0.15);
    }

    &:hover:before {
      opacity: 1 !important;
    }

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
    font-size: 32px !important;
    transform: rotate(135deg);
    @include tablet {
      font-size: 40px !important;
    }
    @include phone {
      font-size: 26px !important;
    }

    &--rotated {
      transform: rotate(0);
    }
  }

  &__button {
    min-width: 55px;
    min-height: 55px;

    &--green {
      background-color: $--green !important;

      &:hover {
        background-color: $--green !important;
      }
    }
    &--blue {
      background-color: $--light-blue !important;
      &:hover {
        background-color: $--light-blue !important;
      }
    }
    &--indigo {
      background-color: $--blue !important;
      &:hover {
        background-color: $--blue !important;
      }
    }

    &:hover:before {
      background-color: rgba($--black, 0.15) !important;
    }

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
    bottom: 42px !important;
    left: 12px;
    z-index: 100;
    transition: 0.5s;

    &--wallet {
      transform: translate(100vw, 0);
    }
  }

  @include phone {
    bottom: 28px !important;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
