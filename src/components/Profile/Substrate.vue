<template>
  <div class="substrate">
    <v-button-cancel v-if="!hideCloseButton" class="substrate__button-cancel" @click="cancel" />
    <slot></slot>
  </div>
</template>

<script>
import VButtonCancel from '@/components/Profile/VButtonCancel.vue'
import { profilesService } from '@/services/profiles'

const ESCAPE = 'Escape'

export default {
  name: 'Substrate',
  components: {
    VButtonCancel
  },
  props: {
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },
  created() {
    document.addEventListener('keydown', this.closeByPressingESC)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeByPressingESC)
  },
  methods: {
    cancel() {
      profilesService.setCreatingOrRecovering(false)
      return this.$router.push({ name: 'Wallets' })
    },
    closeByPressingESC({ key }) {
      if (!(key === ESCAPE)) return
      this.cancel()
    }
  }
}
</script>

<style lang="scss">
.substrate {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1064px;
  height: 100%;
  max-height: 555px;
  margin: 20px auto 25px auto;
  background: get-theme-for($background, 'primary');
  flex-grow: 1;
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: hidden;

  &__button-cancel {
    position: absolute;
    right: 25px;
    top: 25px;

    @include phone {
      display: none;
    }
  }

  @include tablet {
    width: auto;
    margin: 20px 40px 40px;
    max-height: none;
    max-width: none;
  }

  @include phone {
    margin: 20px;
  }
}
</style>
