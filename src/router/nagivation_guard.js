import store from '@/store';
import { cancelRequest } from '@/utils/request';
import router from './index';

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    cancelRequest();
  }

  await store.dispatch('auth/checkAuth');

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      return next(`/login?rtn=${to.fullPath}`);
    }

    if (!store.state.shop.isShopListLoaded) {
      await store.dispatch('shop/loadShopList');
    }
  }

  if (to.path === '/login' && store.getters['auth/isAuthenticated']) {
    return next('/portal');
  }

  return next();
});
