import Vue from 'vue';
import router from './router';
// import store from './store';
// import { setDocumentTitle, domTitle } from '@/utils/domUtil';
// import { USER_TOKEN, USER_MENU } from '@/constant/mutation-typs';

const whiteList = ['login']; // no redirect whitelist
const defaultRoutePath = '/';

router.beforeEach(async (to, from, next) => {
  // to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`));
  // const ss = Vue.prototype.$ss;
  // const token = ss.get(USER_TOKEN);
  // const menus = ss.get(USER_MENU);
  // if (token && menus) {
  //   if (to.path === '/login') {
  //     next({ path: defaultRoutePath });
  //   }
  //   //  else {
  //   //   if (!store.getters.hasAddRoutes) {
  //   //     const routers = await store.dispatch('GenerateRoutes');
  //   //     router.addRoutes(routers);
  //   //     next(to);
  //   //   } else {
        next();
  //   //   }
  //   // }
  // } else {
  //   if (whiteList.includes(to.name)) {
  //     // 在免登录白名单，直接进入
  //     next();
  //   } else {
  //     next({ path: '/login', query: { redirect: to.fullPath } });
  //   }
  // }
});

