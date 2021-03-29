<template>
  <div class="secret-phrase">
    <div class="secret-phrase__inner">
      <show-secret-phrase v-if="!isWritePhrase" :words="words" @next="isWritePhrase = true"></show-secret-phrase>
      <input-secret-phrase v-else :words="words" @back="back"></input-secret-phrase>
    </div>
  </div>
</template>

<script>
import { MODULE_NAME as PROFILE_MODULE } from '@/store/modules/Profile'
import ShowSecretPhrase from '@/components/Profile/ShowSecretPhrase.vue'
import InputSecretPhrase from '@/components/Profile/InputSecretPhrase.vue'

export default {
  name: 'SecretPhrase',
  components: {
    ShowSecretPhrase,
    InputSecretPhrase
  },
  data() {
    return {
      isWritePhrase: false
    }
  },
  computed: {
    words() {
      return this.$store.state[PROFILE_MODULE].model.wordList
    }
  },
  created() {
    if (this.words.length === 0) {
      this.$router.replace({ name: 'ChooseStyle' })
    }
  },
  methods: {
    back() {
      this.isWritePhrase = false
    }
  }
}
</script>

<style lang="scss">
.secret-phrase {
  width: 100%;
  max-width: 1064px;
  height: 100%;
  max-height: 555px;
  margin: 20px auto;
  background: $--white;
  flex-grow: 1;
  border-radius: 12px;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  @include tablet {
    margin: 0 0;
    border-radius: 0;
    max-height: none;
    max-width: none;
  }
  &__inner {
    height: 100%;
  }
}
</style>
