import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// router守卫(此处进行权限校验)
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  // const hasToken = store.getters.token
  console.log(`hasToken=${hasToken}`);
  if (hasToken) {
    console.log(`to=${to}`);
    if (to.path === '/login') {
      console.log(1);
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log(2);
      // 判断是否有路由
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // roles 必须是数组 例如['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 将角色信息传入VX,进行角色界定和分配路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加动态路由
          router.addRoutes(accessRoutes)

          // hack方法 确保路由加载完毕加载路由
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有 token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 去往之前重定向页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
