import { GUEST_INVOICE_ROUTE_NAME } from '@/constants/routes'
import { openInvoice } from './middleware'

/* eslint-disable import/extensions */
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
        path: '/invoice',
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/layouts/WalletLayout'),
        meta: { middleware: [openInvoice] },
        children: [
          {
            path: '',
            name: 'Invoice',
            component: () => import(/* webpackChunkName: 'Wallet' */ '@/views/Wallets/Wallet.vue')
          }
        ]
      },
      {
        path: '/swap',
        name: 'Swap',
        component: () => import(/* webpackChunkName: 'Swap' */ '@/views/Swap')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: 'Settings' */ '@/views/Settings')
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
        component: () => import(/* webpackChunkName: 'SecurityInfo' */ '@/views/Profile/Create/SecurityInfo.vue')
      },
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
      }
    ]
  },
  {
    path: '/',
    name: 'DefaultLayout',
    component: () => import(/* webpackChunkName: 'DefaultLayout' */ '@/layouts/DefaultLayout'),
    children: [
      {
        path: '/invoice',
        name: GUEST_INVOICE_ROUTE_NAME,
        component: () => import(/* webpackChunkName: 'GuestInvoice' */ '@/views/GuestInvoice.vue')
      }
    ]
  }
]
