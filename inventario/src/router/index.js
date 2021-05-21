import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inventario',
      component: () => import('../Views/Inventario.vue')
    },
    {
      path: '/gestion',
      name: 'gestion',
      component: () => import('../Views/Gestion.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../Views/Registro.vue')
    }
  ]
})
