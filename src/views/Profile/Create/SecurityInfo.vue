<template>
  <substrate class="security-info">
    <div class="security-info__wrapper">
      <security-info-block
        v-for="infoBlock in infoBlocks"
        v-show="infoBlock.id === currentBlock"
        :key="infoBlock.id"
        v-bind="infoBlock"
        :name-button="infoBlock.id === infoBlocks.length ? 'Create' : 'Next'"
        @cancel="cancel"
        @next="next(infoBlock.id)"
        @back="back(infoBlock.id)"
        @skip="skip"
      >
      </security-info-block>
    </div>
  </substrate>
</template>

<script>
import SecurityInfoBlock from '@/components/Profile/SecurityInfoBlock.vue'
import Substrate from '@/components/Profile/Substrate.vue'
import infoBlocks from './infoBlocks'

export default {
  name: 'SecurityInfo',
  components: {
    SecurityInfoBlock,
    Substrate
  },
  data() {
    return {
      currentBlock: 1,
      infoBlocks
    }
  },
  methods: {
    skip() {
      this.$router.push({ name: 'CreateProfile' })
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
    },
    cancel() {
      this.$router.push({ name: 'Wallets' })
    }
  }
}
</script>

<style lang="scss">
.security-info {
  display: block;

  @include tablet {
    display: flex;
    padding-top: 15px;
  }
}
</style>
