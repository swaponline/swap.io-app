<template>
  <div class="transaction-skeleton">
    <swap-skeleton width="100%" boilerplate type="divider" />
    <div class="transaction-skeleton__wrapper">
      <swap-skeleton class="transaction-skeleton__name" boilerplate type="list-item-avatar-two-line" />
      <div class="transaction-skeleton__value">
        <swap-skeleton class="transaction-skeleton__amount" boilerplate type="list-item-two-line" />
        <swap-skeleton class="transaction-skeleton__balance" boilerplate type="list-item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionSkeleton'
}
</script>

<style lang="scss">
.transaction-skeleton {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__name {
    width: 55%;
  }
  &__value {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }

  &__amount {
    width: 60%;

    @include phone {
      width: 100%;
    }

    .v-skeleton-loader {
      &__paragraph,
      &__sentences {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      &__text {
        width: 100%;
      }
    }
  }

  &__balance {
    width: 40%;

    @include tablet {
      display: none;
    }
  }

  .v-skeleton-loader {
    &__avatar {
      width: 24px;
      height: 24px;
    }

    &__text {
      height: 18px;
    }
  }
}
</style>
