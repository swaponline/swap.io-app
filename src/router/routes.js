export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: 'MainLayout' */ '@/layouts/LayoutRedesign'),
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
          },
          {
            path: '/invoice/:walletAddress?',
            name: 'Invoice',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/components/Wallets/InvoiceBlock.vue')
          },
          {
            path: '/send/:walletAddress?',
            name: 'Send',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/components/Wallets/SendForm.vue')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
      }
    ]
  }
]
