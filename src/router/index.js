import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/Layout.vue"
import Product from "../views/product"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LayOut',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Product',
        component: Product,
        meta: {
          isLogin:true
        }
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import("../views/params"),
        meta: {
          isLogin:true
        }
      },
      {
        path: '/adv',
        name: 'Adv',
        component: () => import("../views/adv"),
        meta: {
          isLogin:true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import("../views/Login")
  },
  {
    path: '/user',
    name: 'Ucenter',
    component:()=>import("../views/Ucenter")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
