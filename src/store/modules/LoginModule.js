export default  {
    namespaced: true,
    state: {
        user: {
            username: "",
            token: ''
        }    
    },
    mutations: {
        setUser(state,obj) {
            state.user = {
                username: obj.username,
                token:obj.token
            }           
        },
        clearUser(state) {
            state.user = {
                username: "",
                token:""
            }       
        }
    }
}