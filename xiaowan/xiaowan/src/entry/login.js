import Vue from 'vue'
import VueResource from 'vue-resource'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';

import Login from '../main/components/Login.vue'

Vue.use(Element);
Vue.use(VueResource);

new Vue({
    el: '#login',
    render: h => h(Login)
})
