<template>
  <swap-dialog class="modal-wrapper" :value="value" :center="center" v-bind="$attrs" v-on="$listeners">
    <form class="modal-wrapper__form" @submit.prevent="$emit('submit')">
      <slot name="header">
        <header v-if="title" class="modal-wrapper__title" :class="{ 'modal-wrapper__title--with-back': backIcon }">
          <span>
            <swap-button v-if="backIcon" icon class="mr-2" @click="cancel">
              <v-icon size="30">mdi-chevron-left</v-icon>
            </swap-button>
            {{ title }}
          </span>
          <swap-button icon @click="cancel">
            <v-icon size="32">mdi-close</v-icon>
          </swap-button>
        </header>
      </slot>

      <slot></slot>

      <div class="modal-wrapper__footer">
        <slot name="footer">
          <v-row dense>
            <v-col v-if="cancelButtonLabel" align-self="end">
              <swap-button block large @click="cancel">
                {{ cancelButtonLabel }}
              </swap-button>
            </v-col>
            <v-col v-if="confirmButtonLabel" align-self="end">
              <swap-button block large :disabled="disableConfirmButton" type="submit">
                {{ confirmButtonLabel }}
              </swap-button>
            </v-col>
          </v-row>
        </slot>
      </div>
    </form>
  </swap-dialog>
</template>

<script>
import SwapDialog from '@/components/UI/SwapDialog.vue'

export default {
  name: 'ModalWrapper',
  components: { SwapDialog },
  inheritAttrs: false,
  props: {
    value: { type: Boolean, default: false },
    confirmButtonLabel: { type: String, default: 'Confirm' },
    cancelButtonLabel: { type: String, default: 'Cancel' },
    title: { type: String, default: '' },
    modificator: { type: String, default: '' },
    backIcon: { type: Boolean, default: false },
    disableConfirmButton: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss">
.modal-wrapper {
  &__form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;

    & > span {
      display: flex;
      align-items: center;
    }

    &--with-back {
      margin: 0 -12px 25px;

      h3 {
        display: flex;
        align-items: center;
      }
    }
  }

  &__footer {
    margin-top: auto;
  }
}
</style>
