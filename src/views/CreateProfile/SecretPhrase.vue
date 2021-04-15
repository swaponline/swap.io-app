<template>
  <div class="secret-phrase">
    <div class="secret-phrase__inner">
      <show-secret-phrase v-if="!isWritePhrase" :words="words" @next="isWritePhrase = true"></show-secret-phrase>
      <input-secret-phrase v-else :words="words" @create="createProfile" @back="back"></input-secret-phrase>
    </div>
    <form-password v-if="formVisible" @close="reject" @submit="resolve" />
  </div>
</template>

<script>
import { MODULE_NAME as PROFILE_MODULE } from '@/store/modules/Profile'
import ShowSecretPhrase from '@/components/Profile/ShowSecretPhrase.vue'
import InputSecretPhrase from '@/components/Profile/InputSecretPhrase.vue'
import FormPassword from '@/components/Profile/FormPassword.vue'
import WindowHandler from '@/WindowHandler'

export default {
  name: 'SecretPhrase',
  components: {
    ShowSecretPhrase,
    InputSecretPhrase,
    FormPassword
  },
  data() {
    return {
      isWritePhrase: false,
      currentWindow: null,
      formVisible: false,
      resolve: null,
      reject: null
    }
  },
  computed: {
    words() {
      return this.$store.state[PROFILE_MODULE].model.wordList
    },
    currentWindowIsOpen() {
      return this.currentWindow.isOpen
    }
  },
  created() {
    if (this.words.length === 0) {
      this.$router.replace({ name: 'ChooseStyle' })
    }
  },
  mounted() {
    this.openFrame()
  },
  beforeDestroy() {
    if (this.currentWindowIsOpen) {
      this.currentWindow.close()
    }
  },
  methods: {
    back() {
      this.isWritePhrase = false
    },
    openFrame() {
      this.currentWindow = new WindowHandler('secretPhrase', '/', 'secretPhrase')
    },
    async createProfile() {
      try {
        const password = await new Promise((resolve, reject) => {
          this.formVisible = true
          this.resolve = resolve
          this.reject = reject
        })
        const { profile } = await this.currentWindow.sendMessage({ mnemonic: this.words.join(''), password })
        console.warn(profile)
        this.formVisible = false
        this.resolve = null
        this.reject = null
      } catch (e) {
        console.error(`Create profile reject: ${e}`)
      }
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
