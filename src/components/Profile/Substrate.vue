<template>
  <div class="substrate">
    <v-button-cancel class="substrate__button-cancel" @click="cancel" />
    <slot></slot>
  </div>
</template>

<script>
import { CREATING_OR_RECOVERING_PROFILE } from '@/store/modules/Profile'
import VButtonCancel from '@/components/Profile/VButtonCancel.vue'

export default {
  name: 'Substrate',
  components: {
    VButtonCancel
  },
  methods: {
    cancel() {
      this.$store.dispatch(CREATING_OR_RECOVERING_PROFILE, false)
      return this.$router.push({ name: 'Wallets' })
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
  background: $--white;
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
    margin: 20px 20px 40px;
    max-height: none;
    max-width: none;
  }

  @include phone {
    margin: 10px;
  }
}
</style>
