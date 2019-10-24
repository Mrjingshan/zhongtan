import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  if (token === "admin") {
    return request({
      url: "/admin",
      method: 'get'
    })
  } else {
    return request({
      url: "/editor",
      method: 'get'
    })
  }

}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}
export function getRoute (roles) {
  console.log(roles);
  if (roles[0] === "admin") {
    return request({ url: "/adminRoutes", method: 'get' })
  } else {
    return request({ url: "/editorRoutes", method: 'get' })
  }
}