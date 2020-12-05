import { axios } from '@/api/request';
import qs from 'qs'
// 获取部门列表
function getFollowByDep (params) {
  return axios({
    url: '/customer/day/organization',
    method: 'post',
    data: params,
  });
}

function getUnFollowPeople (params) {
  return axios({
    url: '/customer/day/findDetailsInfo',
    method: 'post',
    data: params
  });
}

const getDep = () => {
  return axios ({
    url: '/system/dept/treeselect',
    method: 'get',
  })
}

export {
  getFollowByDep,
  getUnFollowPeople,
  getDep
}