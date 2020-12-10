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
        component: () => import(/* webpackChunkName: 'WalletsLayout' */ '@/layouts/WalletsLayout'),
        children: [
          {
            path: '/wallet/:namewallet',
            name: 'Wallet',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallet')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallet')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallet')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallet')
      }
    ]
  }
]
