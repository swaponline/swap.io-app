<template>
  <div class="substrate">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Substrate'
}
</script>

<style lang="scss">
.substrate {
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
  display: flex;
  justify-content: center;
  padding-top: 55px;

  @include tablet {
    width: auto;
    margin: 20px 20px 25px;
    max-height: none;
    max-width: none;
  }

  @include phone {
    margin: 0;
  }
}
</style>
