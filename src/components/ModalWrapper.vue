<template>
  <v-dialog
    :value="value"
    v-bind="$attrs"
    content-class="modal-wrapper"
    transition="slide-x-reverse-transition"
    v-on="$listeners"
  >
    <form class="modal-wrapper__inner" @submit.prevent="$emit('submit')">
      <slot name="header">
        <header v-if="title" class="modal-wrapper__title">
          <h3>{{ title }}</h3>
          <v-btn icon @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>
      </slot>

      <slot></slot>

      <slot name="footer">
        <div class="modal-wrapper__footer">
          <v-btn v-if="cancelButtonLabel" class="modal-wrapper__button" depressed type="button" @click="cancel">
            {{ cancelButtonLabel }}
          </v-btn>
          <v-btn v-if="confirmButtonLabel" class="modal-wrapper__button" depressed type="submit">
            {{ confirmButtonLabel }}
          </v-btn>
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
      default: ''
    },
    cancelButtonLabel: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
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
  }
  &__footer {
    margin: 0 -8px;
    margin-top: auto;
  }
  &__button {
    width: calc(50% - 16px);
    border-radius: 8px;
    margin: auto 8px 0;
    min-height: 52px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    span {
      font-size: $--font-size-medium;
    }
  }
}
</style>
