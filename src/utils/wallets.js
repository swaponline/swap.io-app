export function groupWalletsBy(wallets, field) {
  return wallets.reduce((groupedWallets, wallet) => {
    const index = groupedWallets.findIndex(group => group[field] === wallet[field])

    if (index < 0) {
      groupedWallets.push({
        [field]: wallet[field],
        value: wallet.value,
        wallets: [wallet]
      })
    } else {
      groupedWallets[index].wallets.push(wallet)
      // eslint-disable-next-line no-param-reassign
      groupedWallets[index].value += wallet.value
    }

    return groupedWallets
  }, [])
}
