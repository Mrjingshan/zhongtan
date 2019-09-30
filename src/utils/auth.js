import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  console.log(`token=${token}`);
  localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
}
