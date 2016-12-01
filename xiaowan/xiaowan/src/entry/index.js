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
