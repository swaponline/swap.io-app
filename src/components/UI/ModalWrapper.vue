<template>
  <v-dialog
    :value="value"
    v-bind="$attrs"
    :overlay-opacity="0.3"
    :content-class="`modal-wrapper modal-wrapper--${modificator}`"
    :transition="transition"
    v-on="$listeners"
  >
    <form class="modal-wrapper__inner" @submit.prevent="$emit('submit')">
      <slot name="header">
        <header v-if="title" class="modal-wrapper__title" :class="{ 'modal-wrapper__title--with-back': backIcon }">
          <span>
            <v-btn v-if="backIcon" color="black" icon @click="cancel">
              <v-icon size="30">mdi-chevron-left</v-icon>
            </v-btn>
            {{ title }}
          </span>
          <v-btn icon @click="cancel">
            <v-icon size="32">mdi-close</v-icon>
          </v-btn>
        </header>
      </slot>

      <slot></slot>

      <slot name="footer">
        <div class="modal-wrapper__footer">
          <swap-button v-if="cancelButtonLabel" class="modal-wrapper__button" type="button" @click="cancel">
            {{ cancelButtonLabel }}
          </swap-button>
          <swap-button
            v-if="confirmButtonLabel"
            class="modal-wrapper__button"
            :disabled="disableConfirmButton"
            type="submit"
          >
            {{ confirmButtonLabel }}
          </swap-button>
        </div>
      </slot>
    </form>
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalWrapper',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    confirmButtonLabel: {
      type: String,
      default: 'Confirm'
    },
    cancelButtonLabel: {
      type: String,
      default: 'Cancel'
    },
    title: {
      type: String,
      default: ''
    },
    modificator: {
      type: String,
      default: ''
    },
    backIcon: {
      type: Boolean,
      default: false
    },
    transition: {
      type: [String, Boolean],
      default: 'slide-x-reverse-transition'
    },
    disableConfirmButton: {
      type: Boolean,
      default: false
    }
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
  position: relative;
  height: 100%;
  max-height: calc(var(--vh, 1vh) * 100) !important;
  width: 40%;
  margin-left: auto;
  border-radius: 0;
  overflow: auto;
  background: $--white;
  margin-right: 0;
  box-shadow: none;
  &--flat {
    box-shadow: none;
  }

  @include tablet {
    width: 100%;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 45px 50px 45px 40px;
    margin: 0 0;
    min-height: calc(var(--vh, 1vh) * 100);
    @include phone {
      padding: 25px 20px 20px;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-small-subtitle;
    &--with-back {
      margin: 0 -12px 25px;
      h3 {
        display: flex;
        align-items: center;
      }
    }
  }
  &__footer {
    margin: auto -8px 0;
    @include phone {
      margin: auto -4px 0;
    }
  }
  &__button {
    width: calc(50% - 16px);
    margin: auto 8px 0;
    @include phone {
      min-width: 0px !important;
      width: calc(50% - 8px);
      margin: auto 4px 0;
    }
  }
}
</style>
