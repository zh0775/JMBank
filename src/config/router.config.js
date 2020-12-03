// import { BasicLayout } from '@/layouts'

export const constantRouterMap = [
  {
    path: '/',
    name: 'main',
    redirect: '/followProgress',
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
]