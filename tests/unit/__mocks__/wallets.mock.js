export const bitcoinWallet = {
  profileId: '037f08683e',
  networkId: 'bitcoin',
  coin: 'BTC',
  walletNumber: 0,
  address: '1gaN21RQHLSWxapkSLX1xFK9fwTKDgWJR',
  publicKey: '0363c08bd274e374ee85e177d52cedc6492b34d970b217f9b7062f906d9be7c16b',
  coinName: 'Bitcoin',
  logo: '/networks/bitcoin/coins/BTC/logo.svg',
  network: { name: 'Bitcoin', logo: '/networks/bitcoin/coins/BTC/logo.svg', slug: 'bitcoin' },
  asset: { name: 'Bitcoin', logo: '/networks/bitcoin/coins/BTC/logo.svg', symbol: 'BTC' },
  name: 'Default',
  value: 0.03
}
export const bitcoinWBTCWallet = {
  profileId: '037f08683e',
  networkId: 'ethereum',
  coin: 'WBTC',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'WrappedBTC',
  logo: '/networks/ethereum/tokens/WBTC--0x2260fac5e5542a773aa44fbcfedf7c193bc2c599/logo.svg',
  network: { name: 'Ethereum', logo: '/networks/ethereum/coins/ETH/logo.svg', slug: 'ethereum' },
  asset: { name: 'Bitcoin', logo: '/networks/bitcoin/coins/BTC/logo.svg', symbol: 'BTC' },
  name: '',
  value: 1.4637
}
export const bitcoinWBTCWallet2 = {
  profileId: '037f08683e',
  networkId: 'polygon',
  coin: 'WBTC',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'Wrapped BTC',
  logo: '/networks/polygon/tokens/WBTC--0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6/logo.svg',
  network: { name: 'Polygon', logo: '/networks/polygon/coins/MATIC/logo.svg', slug: 'polygon' },
  asset: { name: 'Bitcoin', logo: '/networks/bitcoin/coins/BTC/logo.svg', symbol: 'BTC' },
  name: 'Main',
  value: 0.0013
}
export const bitcoinRenBTCWallet = {
  profileId: '037f08683e',
  networkId: 'ethereum',
  coin: 'renBTC',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'renBTC',
  logo: '/networks/ethereum/tokens/renBTC--0xeb4c2781e4eba804ce9a9803c67d0893436bb27d/logo.svg',
  network: { name: 'Ethereum', logo: '/networks/ethereum/coins/ETH/logo.svg', slug: 'ethereum' },
  asset: { name: 'Bitcoin', logo: '/networks/bitcoin/coins/BTC/logo.svg', symbol: 'BTC' },
  name: '',
  value: 200.75
}
export const ethereumWallet = {
  profileId: '037f08683e',
  networkId: 'ethereum',
  coin: 'ETH',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'Ether',
  logo: '/networks/ethereum/coins/ETH/logo.svg',
  network: { name: 'Ethereum', logo: '/networks/ethereum/coins/ETH/logo.svg', slug: 'ethereum' },
  asset: { name: 'Ether', logo: '/networks/ethereum/coins/ETH/logo.svg', symbol: 'ETH' },
  name: '',
  value: 0.899
}
export const binanceWallet = {
  profileId: '037f08683e',
  networkId: 'binance-smart-chain',
  coin: 'BNB',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'Binance Coin',
  logo: '/networks/binance-smart-chain/coins/BNB/logo.svg',
  network: {
    name: 'Binance Smart Chain',
    logo: '/networks/binance-smart-chain/coins/BNB/logo.svg',
    slug: 'binance-smart-chain'
  },
  asset: {
    name: 'Binance Coin',
    logo: '/networks/binance-smart-chain/coins/BNB/logo.svg',
    symbol: 'BNB'
  },
  name: '',
  value: 0
}
export const ethereumWETHWallet = {
  profileId: '037f08683e',
  networkId: 'ethereum',
  coin: 'WETH',
  walletNumber: 0,
  address: '0xbd3d8ee2535d7af98e4c81ebc5197f2cbd32412c',
  publicKey: '0xa57341adee1581bffac04ff83d3f3d5dadd0a04f',
  coinName: 'Wrapped Ether',
  logo: '/networks/ethereum/tokens/WETH--0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/logo.svg',
  network: { name: 'Ethereum', logo: '/networks/ethereum/coins/ETH/logo.svg', slug: 'ethereum' },
  asset: { name: 'Ether', logo: '/networks/ethereum/coins/ETH/logo.svg', symbol: 'ETH' },
  name: '',
  value: 0.006
}

export const bitcoinWallets = [bitcoinWallet, bitcoinWBTCWallet, bitcoinRenBTCWallet, bitcoinWBTCWallet2]
export const mockWallets = [
  bitcoinWallet,
  ethereumWallet,
  bitcoinWBTCWallet,
  bitcoinRenBTCWallet,
  ethereumWETHWallet,
  bitcoinWBTCWallet2,
  binanceWallet
]

export const mockWalletsSum = 203.15
