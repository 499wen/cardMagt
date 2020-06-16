import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 正常路由
 */ 

import Entrance from '@/views/entrance.vue'

import test from '@/components/test/test.vue'
import cardMagt from '@/components/cardMagt/cardMagt.vue'

/** 
 * 错误路由
 * 
 * 404 找不到页面
 */ 
import Fhf from '@/error/404' 

Vue.use(VueRouter)

const routes = [
    {
        path: '/entrance',
        name: '入口',
        component: Entrance,

        children: [ 
            // {
            //     path: '/index',
            //     name: '首页',
            //     component: PerTable
            // },
            {
                path: '/404',
                name: '404',
                component: Fhf
            },

            {
                path: '/cardMagt',
                name: '证卡管理',
                component: cardMagt
            },
            {
                path: '/test',
                name: '测试路由',
                component: test
            },
        ]
    },



    // 重定向
    {
        path: '/',
        redirect: '/cardMagt'
    }
]

export default new VueRouter({
    mode: 'hash',
    routes
})
