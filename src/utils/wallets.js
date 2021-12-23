import { isEqual, sum } from '@/utils/common'

export function groupWalletsBy(wallets, field) {
  return wallets.reduce((groupedWallets, wallet) => {
    const index = groupedWallets.findIndex(group => isEqual(group[field], wallet[field]))

    if (index < 0) {
      groupedWallets.push({
        [field]: wallet[field],
        value: wallet.value || 0,
        wallets: [wallet]
      })
    } else {
      groupedWallets[index].wallets.push(wallet)
      // eslint-disable-next-line no-param-reassign
      groupedWallets[index].value = sum(wallet.value, groupedWallets[index].value) || 0
    }

    return groupedWallets
  }, [])
}
