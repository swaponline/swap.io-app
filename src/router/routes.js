export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: 'MainLayout' */ '@/layouts/LayoutRedesign'),
    redirect: { name: 'Wallets' },
    children: [
      {
        path: '/wallet',
        name: 'Wallets',
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/layouts/WalletLayout'),
        children: [
          {
            path: '/wallet/:nameWallet',
            name: 'Wallet',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallets.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallets.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallets.vue')
      }
    ]
  }
]
