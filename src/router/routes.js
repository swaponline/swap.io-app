/* eslint-disable import/extensions */
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
        path: '/create-profile',
        name: 'CreateProfile',
        component: () => import(/* webpackChunkName: 'Create' */ '@/views/Profile/Create')
      },
      {
        path: '/recover-profile',
        name: 'RecoverProfile',
        component: () => import(/* webpackChunkName: 'Recover' */ '@/views/Profile/Recover')
      },
      {
        path: '/create-or-recover',
        name: 'CreateOrRecover',
        component: () => import(/* webpackChunkName: 'CreateOrRecover' */ '@/views/Profile/CreateOrRecover.vue')
      },
      {
        path: '/security-info',
        name: 'SecurityInfo',
        component: () => import(/* webpackChunkName: 'SecurityInfo' */ '@/views/Profile/Create/SecurityInfo.vue')
      },
      {
        path: '/frame',
        name: 'Frame',
        component: () => import(/* webpackChunkName: 'Frame' */ '@/views/Frame')
      }
    ]
  }
]
