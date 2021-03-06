import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from '../main/components/Index.vue'

import store from '../main/store';

// 用户管理
import ManageUserView from '../main/components/manage/user/user-view.vue'
import UserTable from '../main/components/manage/user/user-table.vue'
import UserCreate from '../main/components/manage/user/user-create.vue'
// 角色管理
import RoleView from '../main/components/manage/role/role-view.vue'
import RoleTableView from '../main/components/manage/role/role-table-view.vue'
import RoleCreateView from '../main/components/manage/role/role-create-view.vue'
// menu 管理
import MenuView from '../main/components/manage/menu/menu-view.vue'
import MenuCreate from '../main/components/manage/menu/menu-create.vue'
import MenuTree from '../main/components/manage/menu/menu-tree.vue'
import RoleMenuView from '../main/components/manage/menu/role-menu.vue'


import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


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
        // 用户管理
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
        },
        // 角色管理
        {
            path: '/manage/role',
            component: RoleView,
            children: [
                {
                    path: '', // 空路径 是会默认呈现的路径
                    component: RoleTableView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role']
                    }
                }, {
                    path: 'roleTable',
                    component: RoleTableView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role']
                    }
                }, {
                    path: 'roleCreate',
                    component: RoleCreateView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理', '角色创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role', '/manage/role/roleCreate']
                    }
                }
            ]
        },
        // 菜单管理
        {
            path: '/manage/menu',
            component: MenuView,
            children: [
                {
                    path: '', // 空路径 是会默认呈现的路径
                    component: MenuTree,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '菜单管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/menu']
                    }
                }, {
                    path: 'menuTable',
                    component: MenuTree,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '菜单管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/menu']
                    }
                }, {
                    path: 'menuCreate',
                    component: MenuCreate,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理', '菜单创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/menu', '/manage/menu/menuCreate']
                    }
                },{
                    path: 'roleMenu/:role_id',
                    component: RoleMenuView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理', '角色菜单管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/menu', '/manage/menu/roleMenu']
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
