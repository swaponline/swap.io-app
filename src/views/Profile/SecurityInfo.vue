<template>
  <div class="security-info">
    <security-info-block
      v-for="infoBlock in infoBlocks"
      v-show="infoBlock.id === currentBlock"
      :key="infoBlock.id"
      v-bind="infoBlock"
      :name-button="infoBlock.id === infoBlocks.length ? 'Create' : 'Next'"
      @next="next(infoBlock.id)"
      @back="back(infoBlock.id)"
      @skip="skip"
    >
    </security-info-block>
  </div>
</template>

<script>
// component
import SecurityInfoBlock from '@/components/Profile/SecurityInfoBlock.vue'
import infoBlocks from './infoBlocks'

export default {
  name: 'SecurityInfo',
  components: {
    SecurityInfoBlock
  },
  data() {
    return {
      currentBlock: 1,
      infoBlocks
    }
  },
  methods: {
    skip() {
      this.$router.push({ name: 'ChooseStyle' })
    },
    next(id) {
      if (id < infoBlocks.length) {
        this.currentBlock = id + 1
      } else {
        this.skip()
      }
    },
    back(id) {
      if (id > 1) {
        this.currentBlock = id - 1
      }
    }
  }
}
</script>

<style lang="scss">
.security-info {
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
}
</style>
