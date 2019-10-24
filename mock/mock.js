import Mock from 'mockjs';
// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({ timeout: '200 - 400' })

function loginFun (prarms) {
  const body = JSON.parse(prarms.body);
  if (body.username === "admin" || "editor") {
    return { data: { token: body.username } }
  } else {
    return "登录账号不对啊" + body.username
  }
}
const admin = {
  data: {
    "route": [
      {
        "path": "/nested",
        "component": "Layout",
        "redirect": "/nested/menu1",
        "name": "Nested",
        "meta": {
          "title": "Nested",
          "icon": "nested"
        },
        "children": [
          {
            "path": "menu1",
            "component": "render",
            "name": "Menu1",
            "meta": {
              "title": "Menu1"
            },
            "children": [
              {
                "path": "menu1-1",
                "component": "/nested/menu1/menu1-1/index",
                "name": "Menu1-1",
                "meta": {
                  "title": "Menu1-1"
                }
              },
              {
                "path": "menu1-2",
                "component": "render",
                "name": "Menu1-2",
                "meta": {
                  "title": "Menu1-2"
                },
                "children": [
                  {
                    "path": "menu1-2-1",
                    "component": "/nested/menu1/menu1-2/menu1-2-1/index",
                    "name": "Menu1-2-1",
                    "meta": {
                      "title": "Menu1-2-1"
                    }
                  },
                  {
                    "path": "menu1-2-2",
                    "component": "/nested/menu1/menu1-2/menu1-2-2/index",
                    "name": "Menu1-2-2",
                    "meta": {
                      "title": "Menu1-2-2"
                    }
                  }
                ]
              },
              {
                "path": "menu1-3",
                "component": "/nested/menu1/menu1-3/index",
                "name": "Menu1-3",
                "hidden": "true",
                "meta": {
                  "title": "Menu1-3"
                }
              }
            ]
          },
          {
            "path": "menu2",
            "component": "/nested/menu2/index",
            "meta": {
              "title": "menu2"
            }
          }
        ]
      },
      {
        "path": "external-link",
        "component": "Layout",
        "children": [
          {
            "path": "https://panjiachen.github.io/vue-element-admin-site/#/",
            "meta": {
              "title": "External Link",
              "icon": "link"
            }
          }
        ]
      },
      {
        "path": "/permission",
        "component": "Layout",
        "children": [
          {
            "path": "index",
            "name": "permission",
            "component": "/form/index",
            "meta": {
              "title": "我是最牛b的权限",
              "icon": "form"
            }
          }
        ]
      },
      {
        "path": "*",
        "redirect": "/404",
        "hidden": "true"
      }
    ]
  }
}
const editor = {
  data: {
    "route": [
      {
        "path": "/nested",
        "component": "Layout",
        "redirect": "/nested/menu1",
        "name": "Nested",
        "meta": {
          "title": "Nested",
          "icon": "nested"
        },
        "children": [
          {
            "path": "menu1",
            "component": "render",
            "name": "Menu1",
            "meta": {
              "title": "Menu1"
            },
            "children": [
              {
                "path": "menu1-1",
                "component": "/nested/menu1/menu1-1/index",
                "name": "Menu1-1",
                "meta": {
                  "title": "Menu1-1"
                }
              },
              {
                "path": "menu1-2",
                "component": "render",
                "name": "Menu1-2",
                "meta": {
                  "title": "Menu1-2"
                },
                "children": [
                  {
                    "path": "menu1-2-1",
                    "component": "/nested/menu1/menu1-2/menu1-2-1/index",
                    "name": "Menu1-2-1",
                    "meta": {
                      "title": "Menu1-2-1"
                    }
                  },
                  {
                    "path": "menu1-2-2",
                    "component": "/nested/menu1/menu1-2/menu1-2-2/index",
                    "name": "Menu1-2-2",
                    "meta": {
                      "title": "Menu1-2-2"
                    }
                  }
                ]
              },
              {
                "path": "menu1-3",
                "component": "/nested/menu1/menu1-3/index",
                "name": "Menu1-3",
                "meta": {
                  "title": "Menu1-3"
                }
              }
            ]
          },
          {
            "path": "menu2",
            "component": "/nested/menu2/index",
            "meta": {
              "title": "menu2"
            }
          }
        ]
      },
      {
        "path": "external-link",
        "component": "Layout",
        "children": [
          {
            "path": "https://panjiachen.github.io/vue-element-admin-site/#/",
            "meta": {
              "title": "External Link",
              "icon": "link"
            }
          }
        ]
      },
      {
        "path": "*",
        "redirect": "/404",
        "hidden": "true"
      }
    ]
  }
}
function getInfoFun (prarms) {
  if (prarms === 1) {
    return {
      data: {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https: //imgsa.baidu.com/forum/w%3D580%3B/sign=dc0e245c99dda144da096cba828cd2a2/ae51f3deb48f8c544437456034292df5e1fe7f9d.jpg',
        name: 'Super Admin'
      }
    }
  } else {
    return {
      data: {
        'roles': ['editor'],
        'introduction': 'I am a editor',
        'avatar': 'https: //imgsa.baidu.com/forum/w%3D580%3B/sign=458a434af903918fd7d13dc261062797/d52a2834349b033b7d18e8701bce36d3d439bd83.jpg',
        'name': 'Normal Editor'
      }
    }
  }
}
function getRoutes (prarms) {
  if (prarms === 1) {
    return admin
  } else {
    return editor
  }
}
Mock.mock('/login', 'post', loginFun); //登录
Mock.mock('/admin', "get", getInfoFun(1)); //获取信息
Mock.mock('/editor', "get", getInfoFun(2)); //获取信息
Mock.mock('/adminRoutes', "get", getRoutes(1)); //获取admin路由
Mock.mock('/editorRoutes', "get", getRoutes(2)); //获取editor路由

