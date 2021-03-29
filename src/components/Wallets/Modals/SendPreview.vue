<template>
  <modal-wrapper
    value
    back-icon
    persistent
    hide-overlay
    modificator="flat"
    :transition="false"
    title="Transaction confirm"
    cancel-button-label="Back"
    @input="close"
    @cancel="close"
    @submit="confirm"
  >
    <div class="send-preview">
      <form-indent v-if="address" title="From:" :text="address" class="send-preview__from-indent"> </form-indent>

      <div class="send-preview__recipients">
        <div v-for="recipient in recipients" :key="recipient.address" class="send-preview__recipient">
          <form-indent title="To:">
            <span>{{ recipient.address }}</span>
          </form-indent>
          <form-indent title="Amount:">
            <span>{{ recipient.amount }} <span class="send-preview__currency-name">USD </span></span>
          </form-indent>
        </div>
      </div>

      <v-divider class="send-preview__divider"></v-divider>

      <span class="send-preview__results">
        <span class="mr-5">Transaction fee: </span>
        <span class="send-preview__fee">
          <span>
            <span class="send-preview__currency-name">USD </span>
            {{ fee }}
          </span>
        </span>
      </span>

      <span class="send-preview__results">
        <span class="mr-5">Total balance change: </span>
        <span class="send-preview__fee">
          <span><span class="send-preview__currency-name">USD </span>39</span>
        </span>
      </span>
    </div>
  </modal-wrapper>
</template>

<script>
import { mapMutations } from 'vuex'
import { ADD_MODAL } from '@/store/modules/Modals'
import { SEND_FORM } from '@/store/modules/Modals/names'

import ModalWrapper from '@/components/UI/ModalWrapper.vue'
import FormIndent from '@/components/UI/Forms/Indent.vue'

export default {
  name: 'SendPreview',
  components: {
    ModalWrapper,
    FormIndent
  },
  props: {
    address: {
      type: String,
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    recipients: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapMutations({
      mutationAddModal: ADD_MODAL
    }),
    close() {
      this.mutationAddModal({ id: `${SEND_FORM + this.address}` })
      this.$emit('close')
    },
    confirm() {
      this.$emit('close-all')
    }
  }
}
</script>

<style lang="scss">
.send-preview {
  p {
    margin: 0 0;
  }
  &__recipients {
    padding: 8px 0 13px;
  }
  &__recipient {
    position: relative;
    padding: 12px 0;
    &:not(:first-child) {
      &::before {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        content: '';
        display: block;
        background: rgba($--black, 0.12);
      }
    }
    > p {
      margin: 0 0;
      &:first-of-type {
        margin-bottom: 12px;
      }
    }
  }
  &__divider {
    margin-bottom: 25px;
  }
  &__results {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 0;
    margin-bottom: 10px;
    font-weight: $--font-weight-semi-bold;
    font-size: $--font-size-extra-small-subtitle;
  }
  &__fee {
    display: flex;
    align-items: center;
    line-height: 21px;
  }
  &__currency-name {
    color: $--dark-grey;
  }
}
</style>
