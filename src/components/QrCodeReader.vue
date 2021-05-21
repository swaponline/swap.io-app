<template>
  <div class="qr-code-reader">
    <v-btn class="qr-code-reader__button" text @click="openCamera">
      <span class="text-left flex-grow-1">Scan qr-code</span>
    </v-btn>
    <input ref="camera" type="file" accept="image/*;capture=camera" class="visually-hidden" @input="input" />
  </div>
</template>

<script>
export default {
  name: 'QrCodeReader',
  methods: {
    input({ target }) {
      this.$emit('input', target.files[0])
    },
    openCamera() {
      this.$refs.camera.click()
    }
  }
}
</script>

<style lang="scss">
.qr-code-reader {
  display: block;
  &__button {
    height: auto !important;
    font-weight: $--font-weight-bold;
    text-transform: none;
    flex-grow: 0;
    padding: 0 0 !important;
    width: 100%;
    span {
      letter-spacing: 0.01em;
      color: var(--main-color);
      font-size: $--font-size-medium;
    }
  }
  .visually-hidden {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
  }
}
</style>
