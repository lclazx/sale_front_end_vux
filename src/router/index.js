/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/Container.vue'
import List from '@/components/ProjectList/List.vue'
import Map from '@/components/ProjectList/Map.vue'
import Contact from '@/components/ProjectList/Contact.vue'
import Me from '@/components/ProjectList/Contact.vue'
import ProjectDetail from '@/components/ProjectList/ProjectDetail.vue'
import Consult from '@/components/client/Consult.vue'
import Frame from '@/components/ProjectList/Frame.vue'
import Promote from '@/components/client/Promote.vue'

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
            }, {
                path: 'map/:id',
                component: Map
            },
            {
                path: 'contact',
                component: Contact
            },
            {
                path: 'me',
                component: Me
            }, {
                path: '/client/consult',
                component: Consult
            }, {
                path: 'projectDetail/:id',
                component: Frame
            }, {
                path: 'promote',
                component: Promote
            }
        ]
    }, {
        path: '/project/:id',
        component: ProjectDetail
    }, ]
})