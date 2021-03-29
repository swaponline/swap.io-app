<template>
  <div class="transaction-loader">
    <svg-icon name="loader" class="transaction-loader__icon" />
  </div>
</template>

<script>
export default {
  name: 'TransactionLoader'
}
</script>

<style lang="scss">
.transaction-loader {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__icon {
    width: 50px;
    margin-bottom: 60px;
    fill: $--black;
  }
}
</style>
