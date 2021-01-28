<template>
  <v-dialog v-bind="$attrs" content-class="white" :value="value" @input="toggle">
    <v-card class="dialog-modal">
      <div v-if="title" class="dialog-modal__title px-10 pt-7 pb-5">
        {{ title }}
      </div>
      <v-card-text class="pb-0 px-10">
        <slot />
      </v-card-text>
      <v-card-actions class="dialog-modal__footer pt-6 px-10 pb-9">
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogModal',
  inheritAttrs: false,
  props: {
    // РєРѕРЅС‚СЂРѕР»СЊ РІРёРґРёРјРѕСЃС‚Рё
    value: {
      type: Boolean,
      required: true
    },
    // РєРѕРЅС‚СЂРѕР»СЊ РІРёРґРёРјРѕСЃС‚Рё
    title: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    cancel() {
      this.toggle(false)
    },

    toggle(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.dialog-modal {
  position: relative;
  &__title {
    // border-bottom: 1px solid #ccc;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.25px;
  }
  &__footer {
    // border-top: 1px solid #ccc;
  }
}
</style>
