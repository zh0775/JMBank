import Vue from 'vue'
import App from './App.vue'
import '@/core/lazy_user'
import './permission';
import store from '@/store/';
import router from '@/router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
// // 按需引入vue-awesome图标
// import Icon from 'vue-awesome/components/Icon';
// import 'vue-awesome/icons/chart-bar.js';
// import 'vue-awesome/icons/chart-area.js';
// import 'vue-awesome/icons/chart-pie.js';
// import 'vue-awesome/icons/chart-line.js';
// import 'vue-awesome/icons/align-left.js';

// 全局注册图标
// Vue.component('icon', Icon);

// 适配flex
import 'amfe-flexible';
import '@/utils/flex.js'
// import '@/common/flexible.js';

// 引入全局css
import '@/assets/scss/style.scss';

// Vue.use(dataV);
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.config.performance = true;
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
