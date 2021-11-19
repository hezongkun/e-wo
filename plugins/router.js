// import blackList from '@/config/blackList.js'
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    next()

    // const redirect = decodeURIComponent(from.query.redirect || to.path)
    // if (to.path === redirect) {
    //   next()
    // } else {
    //   // 跳转到目的路由
    //   next({ path: redirect })
    // }

    // if (!store.state.hasLogin) {
    //   // 未登录 跳转登录
    //   if (blackList.includes(to.name)) {
    //     next({ path: '/user/login', query: { redirect: to.fullPath } })
    //   } else {
    //     // 在免登录白名单，直接进入
    //     next()
    //   }
    // } else {
    //   // const redirect = decodeURIComponent(from.query.redirect || to.path)
    //   // if (to.path === redirect) {
    //   //   next()
    //   // } else {
    //   //   // 跳转到目的路由
    //   //   next({ path: redirect })
    //   // }
    //   next()

    //   // const redirect = decodeURIComponent(from.query.redirect || to.path)
    //   // if (to.path === redirect) {
    //   //   // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    //   //   next({ ...to, replace: true })
    //   // } else {
    //   //   // 跳转到目的路由
    //   //   next()
    //   // }
    // }
  })
}
