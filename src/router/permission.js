import router from "./index"
import store from "../store/index"
console.log(store);
router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        //需要登录
       // var token=false
       var token = store.state.LoginModule.user.token;
        if (token) {
        next() 
        } else {
            next('/login')
        }
    } else {
        //不需要登录
        next()
    }
})