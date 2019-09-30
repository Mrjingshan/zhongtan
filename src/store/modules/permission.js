// import { asyncRoutes, constantRoutes } from '@/router'
import { getRoute } from '@/api/user'
import { constantRoutes } from '@/router'
import Layout from '@/layout'
const _import = require('@/utils/_import_' + process.env.NODE_ENV)//获取组件的方法
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

function hasPermission (roles, route) {
  // 判断权限是否显示
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      switch (route.component) {
        case 'Layout':
          route.component = Layout
          break;
        case 'render':
          route.component = { render (c) { return c("router-view") } }
          break;
        default:
          route.component = _import(route.component)
          break;
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    var url;
    if (roles[0] === "admin") {
      url = 'https://www.easy-mock.com/mock/5b69b69ef770e33d7c1342a5/example/123456'
    } else {
      url = 'https://www.easy-mock.com/mock/5b69b69ef770e33d7c1342a5/example/qijingshanrouter'
    }
    return new Promise(resolve => {
      getRoute(url).then(res => {
        let accessedRoutes
        // 根据角色生成对应权限的路由
        accessedRoutes = filterAsyncRouter(res.data.route)
        commit('SET_ROUTES', res.data.route)
        resolve(accessedRoutes)
      }).catch(error => {
        console.log(error);
      });


    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
