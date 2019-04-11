import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import scrollModal from '@/components/scrollTab/scrollModal'
import scrollModal1 from '@/components/scrollTab/scrollModal1'
import scrollModal2 from '@/components/scrollTab/scrollModal2'
import scrollModal3 from '@/components/scrollTab/scrollModal3'
import scrollModal4 from '@/components/scrollTab/scrollModal4'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/scrollModal',
      name: 'scrollModal',
      meta: {index: 2, title: "编辑自选"},
      component: scrollModal,
      children: [
        {
          path: '/scrollModal',
          meta: {index: 0, title: "行情"},
          redirect: '/scrollModal/1'
        },
        {
          path: '/scrollModal/1',
          name: 'scrollModal1',
          meta: {index: 3, title: "操盘设置"},
          component: scrollModal1
        },
        {
          path: '/scrollModal/2',
          name: 'scrollModal2',
          meta: {index: 3, title: "操盘设置"},
          component: scrollModal2
        },
        {
          path: '/scrollModal/3',
          name: 'scrollModal3',
          meta: {index: 3, title: "操盘设置"},
          component: scrollModal3
        },
        {
          path: '/scrollModal/4',
          name: 'scrollModal4',
          meta: {index: 3, title: "操盘设置"},
          component: scrollModal4
        },
      ]
    }
  ]
})
