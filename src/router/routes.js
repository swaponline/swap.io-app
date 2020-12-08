export default [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import(/* webpackChunkName: 'hello' */ '@/views/HelloWorld.vue')
  }
]
