<template>
  <div class="loader-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'VLoaderDots'
}
</script>

<style lang="scss">
.loader-dots {
  display: inline-flex;
  span {
    height: 10px;
    width: 10px;
    margin: 0 5px;
    border-radius: 50%;
    border: 1px solid $--dark-grey;
    background: $--white;
    &:first-child {
      animation: loading 3s linear infinite;
    }
    &:nth-child(2) {
      animation: loading 3s linear 0.5s infinite;
    }
    &:last-child {
      animation: loading 3s linear 1s infinite;
    }
  }
  @keyframes loading {
    0% {
      background: $--white;
    }
    16% {
      background: $--dark-grey;
    }
    33% {
      background: $--dark-grey;
    }
    50% {
      background: $--dark-grey;
    }
    66% {
      background: $--white;
    }
    83% {
      background: $--white;
    }
    100% {
      background: $--white;
    }
  }
}
</style>
