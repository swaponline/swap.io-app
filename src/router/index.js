import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import middlewarePipeline from '@/router/middlewarePipeline'
import { encodeQueryParameters, decodeQueryParameters } from '@/utils/http'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  parseQuery: decodeQueryParameters,
  stringifyQuery: encodeQueryParameters
})

// Решение взято с https://github.com/vuejs/vue-router/issues/2881
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

// разрешение переходов
router.beforeEach((to, from, next) => {
  // middleware pipeline
  const middleware = to.matched.reduce((guards, matchedRoute) => {
    const routeGuards = matchedRoute.meta.middleware
      ? matchedRoute.meta.middleware.filter(someGuard => !guards.includes(someGuard))
      : []
    if (routeGuards && routeGuards.length) {
      return [...guards, ...routeGuards]
    }

    return guards
  }, [])

  const firstMiddleware = middleware[0]
  if (!firstMiddleware) {
    next()
    return
  }

  const context = {
    to,
    from,
    next,
    store
  }

  middlewarePipeline(context, middleware)()
})

export default router
