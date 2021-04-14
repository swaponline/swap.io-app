<template>
  <div class="form-password">
    <form class="form-password__content" @submit.prevent="submit">
      <h3 class="form-password__title">Придумайте пароль</h3>
      <form-text-field v-model="password" placeholder="Введите пароль" />
      <form-text-field v-model="confirmPassword" placeholder="Подтвердите пароль" />
      <div class="form-password__buttons">
        <swap-button class="form-password__button" type="submit" :disabled="!isConfirmPassowrd">
          Подтвердить
        </swap-button>
        <swap-button :disabled="isCancelDisabled" class="form-password__button" @click="close">
          Отмена
        </swap-button>
      </div>
    </form>
  </div>
</template>

<script>
import FormTextField from '@/components/UI/Forms/TextField.vue'

export default {
  name: 'FormWrapper',
  components: {
    FormTextField
  },
  props: {
    withConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCancelDisabled: false,
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    isConfirmPassowrd() {
      return this.password.trim().length > 5 && this.confirmPassword === this.password
    }
  },
  methods: {
    submit() {
      if (this.isConfirmPassowrd) {
        this.$emit('submit', this.password)
        this.isCancelDisabled = true
        this.password = ''
        this.confirmPassword = ''
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.form-password {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(var(--vh) * 100);
  width: 100%;
  background: rgba($--black, 0.12);
  overflow: auto;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
    height: 305px;
    width: 400px;
    background: $--white;
    border-radius: 10px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }

  &__button {
    width: calc(50% - 4px);
  }
}
</style>
