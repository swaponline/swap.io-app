export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: 'MainLayout' */ '@/layouts/MainLayout'),
    redirect: { name: 'Wallets' },
    children: [
      {
        path: '/wallet',
        name: 'Wallets',
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/views/Wallets.vue'),
        children: [
          {
            path: '/wallet/:nameWallet',
            name: 'Wallet',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallet.vue')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets.vue')
      }
    ]
  }
]
