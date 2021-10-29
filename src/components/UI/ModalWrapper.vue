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
  </v-dialog>
</template>

<script>
export default {
  name: 'ModalWrapper',
  inheritAttrs: false,
  props: {
    value: { type: Boolean, default: false },
    confirmButtonLabel: { type: String, default: 'Confirm' },
    cancelButtonLabel: { type: String, default: 'Cancel' },
    title: { type: String, default: '' },
    modificator: { type: String, default: '' },
    backIcon: { type: Boolean, default: false },
    transition: { type: [String, Boolean], default: 'slide-x-reverse-transition' },
    disableConfirmButton: { type: Boolean, default: false }
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
  $this: &;

  position: relative;
  height: 100%;
  max-height: calc(var(--vh, 1vh) * 100) !important;
  width: 40%;
  max-width: 650px;
  margin-left: auto;
  border-radius: 0;
  overflow: auto;
  background: get-theme-for($background, 'primary');
  margin-right: 0;
  box-shadow: none;

  &--flat {
    box-shadow: none;
  }
  &--full-height {
    #{$this}__inner {
      height: 100%;
    }
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
