<template>
  <v-dialog :value="true" content-class="edit-fee" @click:outside="close">
    <div class="edit-fee__form">
      <h3 class="edit-fee__title">Transaction fee:</h3>
      <slider-fee
        v-model="commission"
        v-bind="sliderParams"
        :recommended-fee="recommendedFee"
        class="edit-fee__slider"
      ></slider-fee>
      <v-btn depressed class="edit-fee__button" @click="submit">Done</v-btn>
      <v-btn depressed class="edit-fee__button" @click="close">Cancel</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { EDIT_FEE } from '@/store/modules/Transactions'

import SliderFee from '../SliderFee.vue'

export default {
  name: 'EditFee',
  components: {
    SliderFee
  },
  props: {
    sliderParams: {
      type: Object,
      default() {
        return {}
      }
    },
    recommendedFee: {
      type: Number,
      default: 0
    },
    fee: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      commission: this.fee
    }
  },
  methods: {
    ...mapActions({
      actionEditFee: EDIT_FEE
    }),
    close() {
      this.$emit('close')
    },
    submit() {
      this.actionEditFee(this.commission)
      this.close()
    }
  }
}
</script>

<style lang="scss">
.edit-fee {
  margin-top: auto;
  box-shadow: none;
  &__form {
    background: $--white;
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
    max-width: 540px;
    margin: auto;
  }
  &__title {
    margin-top: 20px;
    text-align: center;
  }
  &__slider {
    border-bottom: 1px solid $--light-grey !important;
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    .v-input {
      order: 2;
      width: 100%;
    }
  }
  &__button {
    width: 100%;
    border-radius: 0;
    min-height: 60px;
    text-transform: none;
    font-weight: $--font-weight-bold;
    border-bottom: 1px solid $--light-grey !important;
    background-color: $--white !important;
    span {
      font-size: $--font-size-extra-small-subtitle;
    }
  }
}
</style>
