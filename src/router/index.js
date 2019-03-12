/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container.vue'
import List from '@/components/ProjectList/List.vue'
import Map from '@/components/ProjectList/Map.vue'
import Contact from '@/components/ProjectList/Contact.vue'
import Me from '@/components/ProjectList/Contact.vue'
import ProjectDetail from '@/components/ProjectList/ProjectDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Container',
    component: Container,
    children: [{
        path: 'list',
        component: List
      }, {
        path: 'map',
        component: Map
      },
      {
        path: 'contact',
        component: Contact
      },
      {
        path: 'me',
        component: Me
      },
      {
        path: 'project/:id',
        component: ProjectDetail
      }
    ]
  }]
})
