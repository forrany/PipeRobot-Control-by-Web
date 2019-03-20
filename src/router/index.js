import Vue from 'vue'
import Router from 'vue-router'
import Address from '@/components/AddressItem'
import Content from '@/components/Content'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Address
    },{
      path:'/content/:address',
      name: 'content',
      component: Content,
    },
  ]
})
