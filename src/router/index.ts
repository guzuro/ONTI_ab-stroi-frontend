import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
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
  if (to.name !== 'Login') {
    AuthService.checkLogin().then((response: any) => {
      if (response.status === 200) {
        if (!Object.keys((store.state as any).userModule.userData).length) {
          UserService.getUserData()
            .then(({ data }) => {
              store.dispatch('userModule/setUserToStore', data);
              store.dispatch('userModule/setAuthState', true);
            })
            .then(() => {
              if (to.path === '/') {
                next({
                  path: `${(store.state as any).userModule.userData.role}/profile`,
                });
              }
            });
          next();
        } else {
          next();
        }
      } else {
        next({ path: '/login' });
      }
    });
  } else {
    next();
  }
});

export default router;
