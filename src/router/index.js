import Vue from 'vue'
import VueRouter from 'vue-router'
import Professor from '../views/professor/professor.vue'
import Avaliacoes from '../views/professor/avaliacoes/avaliacoes.vue'
import Aluno from '../views/aluno/aluno.vue'
import AvaliacoesAluno from '../views/aluno/avaliacoes/avaliacoes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/professor',
    name: 'Professor',
    component: Professor,
    children: [
      {
        path: '/',
        redirect: './avaliacoes'
      },
      {
        path: '/professor/avaliacoes',
        name: 'Professor Avaliacoes',
        component: Avaliacoes
      }
    ]
  },
  {
    path: '/aluno',
    name: 'Aluno',
    component: Aluno,
    children: [
      {
        path: '/',
        redirect: './avaliacoes'
      },
      {
        path: '/aluno/avaliacoes',
        name: 'Aluno Avaliacoes',
        component: AvaliacoesAluno
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
