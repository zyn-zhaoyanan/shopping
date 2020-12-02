import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from "./modules/LoginModule"
import EditorModule from "./modules/EditorModule"
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    LoginModule,
    EditorModule
  }
})
