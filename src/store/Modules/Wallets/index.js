export const MODULE_NAME = 'Wallets'

export default {
  state: {
    wallets: [
      {
        name: 'BTC',
        value: 0.056734,
        icon: 'btc',
        subWallets: [
          {
            name: 'Default',
            value: 0.056734
          }
        ]
      },
      {
        name: 'ETH',
        value: 43.0561,
        subWallets: [
          {
            name: 'Default',
            value: 40.0561
          },
          {
            name: 'Swaps',
            value: 3.0
          },
          {
            name: 'Expenses',
            value: 0.0
          }
        ]
      },
      {
        name: 'USDT',
        value: 100.1,
        subWallets: [
          {
            name: 'Default',
            value: 100.1
          }
        ]
      }
    ]
  }
}
