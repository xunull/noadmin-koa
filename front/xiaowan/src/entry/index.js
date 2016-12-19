import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from '../main/components/Index.vue'

import store from '../main/store';

import ManageUserView from '../main/components/manage/user/user-view.vue'
import UserTable from '../main/components/manage/user/user-table.vue'
import UserCreate from '../main/components/manage/user/user-create.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.devtools = true;

// 这个router可以写一个默认的,
// 当系统工作的时候,可以有一个router的内容是由管理系统配置的
// ajax 请求这个router 然后替换这个router
// 写在这里的router 可以作为一个最最基本的
// 或者可以说这个router是核心的router,业务的router由后台读取
var router = new VueRouter({
    routes: [
        {
            path: '/manage/user',
            component: ManageUserView,
            children: [
                {
                    path: '',
                    component: UserTable,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user']
                    }
                }, {
                    path: 'userTable',
                    component: UserTable,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user']
                    }
                }, {
                    path: 'userCreate',
                    component: UserCreate,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理', '用户创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user', '/manage/user/userCreate']
                    }
                }
            ]
        }
    ]
});

// 路由切换的时候，需要更新breadcrumb的信息
router.beforeEach((to, from, next) => {
    next();
})

new Vue({
    el: '#index',
    store,
    router: router,
    render: h => h(Index)
})
