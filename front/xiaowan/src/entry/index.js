import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from '../main/components/Index.vue'

import store from '../main/store';

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
