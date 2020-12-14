export const MODULE_NAME = 'Wallets'

export default {
  state: {
    list: [
      {
        name: 'BTC',
        value: 0.056734,
        icon: 'btc',
        subWallets: [
          {
            name: 'Default',
            value: 0.056734,
            address: '1C9Uae6kyDtPo4ykzd5AJaLzLEZSpEbP3y'
          }
        ]
      },
      {
        name: 'ETH',
        value: 43.0561,
        subWallets: [
          {
            name: 'Default',
            value: 40.0561,
            address: '0x2dF6C87022A039c60E1A27ED6ea7A8cDa3101Cd0'
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
            value: 100.1,
            address: 'GUzPzmRhx5VgsYH3vZjGjLgtFQMHkJzyHU'
          }
        ]
      }
    ]
  },
  getters: {
    siblingList(state) {
      return state.list.reduce((acc, el) => {
        acc.push(...el.subWallets)
        return acc
      }, [])
    }
  }
}
