import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userList: [], // 选中的人员信息
        loginInfo: {}, // 登录信息

        conditionGroup: {}, // 条件组信息
    },
    mutations: {
        editUserList(state, payload){
            state.userList = payload
        },
        // 设置登录信息
        setLoginIngo(state, payload){
            state.loginInfo = payload
        },
        // 修改条件组信息
        setConditionGroup(state, payload){
            state.conditionGroup = payload
        }
    }
})