import store from '@/store';
import { RoleEnum } from '@/types/types';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    component: () => import('../views/auth.vue'),
    path: '/login',
    name: 'Login',
  },
  {
    component: () => import('../layouts/DashboardLayout.vue'),
    path: '/:role/',
    children: [
      {
        component: () => import('../views/user-profile.vue'),
        path: 'profile',
        name: 'UserProfile',
        meta: {
          authRole: [RoleEnum.Administrator, RoleEnum.Customer],
        },
      },
      {
        component: () => import('../views/customers-list.vue'),
        path: 'customers',
        name: 'CustomersList',
        meta: {
          authRole: [RoleEnum.Administrator],
        },
      },
      {
        component: () => import('../views/customer.vue'),
        path: 'customer/:actionType',
        name: 'Customer',
        meta: {
          authRole: [RoleEnum.Administrator],
        },
      },
      {
        component: () => import('../views/order.vue'),
        path: 'customer/:customerId/order/:actionType',
        name: 'Order',
        meta: {
          authRole: [RoleEnum.Administrator, RoleEnum.Customer],
        },
      },
      {
        component: () => import('../views/project.vue'),
        path: 'customer/:customerId/order/:orderId/project',
        name: 'Project',
        meta: {
          authRole: [RoleEnum.Administrator, RoleEnum.Customer],
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // TODO
  const routeMeta = to.meta;
  if (to.name !== 'Login' && to.name !== 'Main') {
    if (
      routeMeta
      && routeMeta.authRole
      && store.getters['userModule/isAuthenticated']
      && routeMeta.authRole.includes(store.getters['userModule/getUserRole'])
    ) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }

  // if (!to.path.includes('dashboard')) {
  //   store.commit('userModule/RESET_IS_AUTHENTICATED');
  //   store.commit('userModule/RESET_USER_STATE');
  //   next();
  // }
});

export default router;
