import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/reset.css"
import "./router/permission"
import jwt from "jwt-decode"
import "./utils/eventbus"
import "./plugins/MyComponents.js"
import i18n from "./plugins/i18n"
Vue.config.productionTip = false
if (localStorage.getItem("lang")){
  i18n.locale=localStorage.getItem("lang")
} 
  


localStorage.getItem("userInfo")
if (localStorage.getItem("userInfo")) {
  store.commit("LoginModule/setUser", {
    username: jwt(localStorage.getItem("userInfo")).username,
    token:localStorage.getItem("userInfo")
  })
}


 new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app') 


