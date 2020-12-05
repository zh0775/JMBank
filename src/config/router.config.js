// import { BasicLayout } from '@/layouts'

export const constantRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/followTrack',
    component: () => import('@/views/home/home'),
    meta: {title: '首页'},
    children:[]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home'),
    meta: {title: '首页'},
    children:[]
  },
  {
    path: '/followProgress',
    name: 'followProgress',
    component: () => import('@/views/pages/followProgress'),
    meta: {title: '跟进进度'},
    children:[]
  },
  {
    path: '/followProgressDetail',
    name: 'followProgressDetail',
    component: () => import('@/views/pages/followProgressDetail'),
    meta: {title: '跟进进度详情'},
    children:[]
  },
  {
    path: '/guideTrack',
    name: 'guideTrack',
    component: () => import('@/views/pages/guideTrack'),
    meta: {title: '带看轨迹'},
    children:[]
  },
  {
    path: '/followTrack',
    name: 'followTrack',
    component: () => import('@/views/pages/followTrack'),
    meta: {title: '跟进轨迹'},
    children:[]
  },
]