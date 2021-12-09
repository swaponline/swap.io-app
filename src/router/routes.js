import { GUEST_INVOICE_ROUTE_NAME } from '@/constants/routes'
import { openInvoice, profileRequired } from './middleware'

export default [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import(/* webpackChunkName: 'MainLayout' */ '@/layouts/MainLayout'),
    redirect: { name: 'Wallets' },
    meta: { middleware: [profileRequired] },
    children: [
      {
        path: '/wallets/:coin?/:networkId?/:address?/',
        name: 'Wallets',
        props: true,
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/views/Wallet.vue')
      },
      {
        path: '/invoice',
        name: 'Invoice',
        component: () => import(/* webpackChunkName: 'Wallets' */ '@/views/Wallet.vue'),
        meta: { middleware: [openInvoice] }
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
    children: [
      {
        path: '/security-info',
        name: 'SecurityInfo',
        component: () => import(/* webpackChunkName: 'SecurityInfo' */ '@/views/Profile/Create/SecurityInfo.vue')
      },
      {
        path: '/create-profile',
        name: 'CreateProfile',
        props: true,
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
