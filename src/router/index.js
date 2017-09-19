import Vue from 'vue'
import Router from 'vue-router'
import List from '../page/list.vue'
import Add from '../page/add.vue'
import Detail from '../page/detail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/add/:type',
      name: 'Add',
      component: Add
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
