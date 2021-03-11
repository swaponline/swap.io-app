<template>
  <modal-wrapper value title="Add new ERC20" @input="close" @submit="create" @cancel="close">
    <div>
      <form-field placeholder="erc20 address"></form-field>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '../../ModalWrapper.vue'
import FormField from '../../FormTextField.vue'

export default {
  name: 'AddNewCurrency',
  components: {
    ModalWrapper,
    FormField
  },
  methods: {
    close() {
      this.$emit('close')
    },
    create() {
      this.close()
    }
  }
}
</script>
