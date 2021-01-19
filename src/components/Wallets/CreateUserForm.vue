<template>
  <transition-translate>
    <transition-inner v-if="visible" class="create-user-form">
      <form @submit.prevent="submit">
        <header class="create-user-form__header">
          <h3>Create wallet</h3>
          <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </header>
        <v-text-field v-model="userName" outlined label="User name"></v-text-field>
        <v-row>
          <v-col class="d-flex justify-end" cols="12">
            <v-btn class="mr-4" @click="$emit('close')">Cancel</v-btn>
            <v-btn class="mr-4" @click="$emit('close')">Восстановить пользователя</v-btn>
            <v-btn type="submit">Create</v-btn>
          </v-col>
        </v-row>
      </form>
    </transition-inner>
  </transition-translate>
</template>

<script>
import { mapActions } from 'vuex'
import { CREATE_NEW_USER } from '@/store/modules/Wallets'

import TransitionTranslate from '../Transitions/Translate.vue'

export default {
  name: 'CreateUserForm',
  components: {
    TransitionTranslate
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    ...mapActions({
      actionCreateNewUser: CREATE_NEW_USER
    }),
    submit() {
      if (this.userName.trim()) {
        this.actionCreateNewUser({
          id: Date.now(),
          name: this.userName
        })
        console.log({
          id: Date.now(),
          name: this.userName
        })
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.create-user-form {
  padding: 10px 15px;
  @include tablet {
    padding: 10px 10px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
