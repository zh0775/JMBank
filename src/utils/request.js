import axios from 'axios';
import Vue from 'vue';
import store from '@/store';
import { VueAxios } from './axios';
import { USER_TOKEN } from '@/constant/mutation-types';
import { MessageBox } from 'element-ui';
const isDevelopment = process.env.NODE_ENV === 'development';
let baseURL = '';
if (isDevelopment) {
  // baseURL = 'http://192.168.1.21:8080/api';// 王冠
  // baseURL = 'http://192.168.1.56:8080/api'; // 黄星
  // baseURL = 'http://192.168.1.180:8080/api';
  baseURL = 'https://developer/api.autodesk.com/authentication/v1/authenticate';
} else {
  baseURL = '/api';
}
const needLoadingApi = ['/board/findboardbyboardmap'];
const noNeedTipApi = ['/login'];
let requestNum = 0; // 网络请求个数
let loadingTimeout = null; // 网络请求loading延迟隐藏时间
export function getUrl () {
  return baseURL;
}
// 创建 axios 实例
const service = axios.create({
  baseURL, // api base_url
  timeout: 1000 * 60 // 请求超时时间
});
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (Vue.ss.get(USER_TOKEN)) {
      // 设置token
      config.headers['Token'] = Vue.ss.get(USER_TOKEN);
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

const hideLoading = () => {
  if (requestNum <= 0) {
    clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
      Vue.loading.hide();
    }, 600);
  }
};

const err = (error) => {
  let msg = '';
  if (error.response) {
    const { data, status } = error.response;
    if (status === 403) {
      msg = data.message;
    } else if (status === 401) {
      msg = data.msg;
      if (!store.state.app.hasShowGlobalAlert) {
        Vue.prototype.$info({
          content: '登陆已过期，请重新登陆',
          okText: '重新登录',
          onOk () {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          }
        });
        store.dispatch('toggleState', {
          hasShowGlobalAlert: true
        });
      }
    } else if (status === 404) {
      msg = '接口地址不存在';
    } else if (status === 500) {
      msg = '服务器内部错误';
    } else {
      msg = error.message;
    }
  } else {
    msg = '网络错误';
  }
  if (!noNeedTipApi.includes(error.config.url)) { // 不需要错误提示的接口才提示
    // Message.error(msg);
  }

  if (needLoadingApi.includes(error.config.url) && requestNum > 0) {
    requestNum--;
    hideLoading();
  }

  return Promise.resolve({
    code: 100,
    msg
  });
};

service.interceptors.request.use((config) => {
  // if (config.data) {
  //   config.data = JSON.stringify(config.data);
  // }
  // if (config.params) {
  //   config.params = JSON.stringify(config.params);
  // }
  if (needLoadingApi.includes(config.url)) {
    requestNum++;
    Vue.loading.show({
      tip: '加载中......'
    });
  }
  // Vue.ss.set(ACCESS_TOKEN, `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTQ5
  //   NjMwODg5MTUsInBheWxvYWQiOiJ7XCJ1c2VybmFtZVwiOlwid2dAd2cuY29tXCIsXCJwYXNzd29yZFwiOlwid2d
  //   cIixcImNvbmZpZGVudGlhbGl0eVwiOjV9In0.1lpdqh4Oc5sJjK7OGTqw8PksNwskFLChqwS3-nSzNm8
  // `);
  // const token = Vue.ss.get(ACCESS_TOKEN);
  // if (token) {
  // eslint-disable-next-line max-len
  // config.headers['Token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU1NTIxNzU5NTgsInBheWxvYWQiOiJ7XCJ1c2VybmFtZVwiOlwid2dAd2cuY29tXCIsXCJwYXNzd29yZFwiOlwid2dcIixcImNvbmZpZGVudGlhbGl0eVwiOjV9In0.dF71IvY-zx95UUXmRnQn0lwHGEdmu1hxa0P4ohw8XI0';
  // }
  return config;
}, err);

service.interceptors.response.use((response) => {
  if (response.data.code === -1) {
    MessageBox({
      message: '登陆已失效，请重新登陆',
      confirmButtonText: '重新登录',
      type: 'warning',
      callback: () => {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }
    });
  }
  if (needLoadingApi.includes(response.config.url) && requestNum > 0) {
    requestNum--;
    hideLoading();
  }
  return response.data;
}, err);

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service);
  }
};

export {
  installer as VueAxios,
  service as axios
};
