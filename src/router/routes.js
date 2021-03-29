export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: 'MainLayout' */ '@/layouts/MainLayout'),
    redirect: { name: 'Wallet' },
    children: [
      {
        path: '/wallet',
        name: 'Wallets',
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/layouts/WalletLayout'),
        redirect: { name: 'Wallet' },
        children: [
          {
            path: '/wallet/:walletAddress?',
            name: 'Wallet',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Swap' */ '@/views/Swap')
      }
    ]
  },
  {
    path: '/',
    name: 'ProfileLayout',
    component: () => import(/* webpackChunkName: 'ProfileLayout' */ '@/layouts/ProfileLayout'),
    redirect: { name: 'MainLayout' },
    children: [
      {
        path: '/security-info',
        name: 'SecurityInfo',
        component: () => import(/* webpackChunkName: 'SecurityInfo' */ '@/views/CreateProfile/SecurityInfo.vue')
      },
      {
        path: '/secret-phrase',
        name: 'SecretPhrase',
        component: () => import(/* webpackChunkName: 'SecretPhrase' */ '@/views/CreateProfile/SecretPhrase.vue')
      },
      {
        path: '/choose-style',
        name: 'ChooseStyle',
        component: () => import(/* webpackChunkName: 'ChooseStyle' */ '@/views/CreateProfile/ChooseStyle.vue')
      }
    ]
  }
]
