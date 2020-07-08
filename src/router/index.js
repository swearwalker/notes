import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/Index.vue';
import CreateNote from '@/views/Create';
import Settings from '@/views/Settings';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/create',
    name: 'create',
    component: CreateNote,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/Edit'),
  },
  {
    path: '/view/:id',
    name: 'view',
    component: () => import('@/views/View'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

export default router;
