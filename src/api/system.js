import { axios } from '@/utils/request';
// 获取部门列表
function getAllDepList (params) {
  return axios({
    url: '/organization/find-all',
    params
  });
}

// 通过部门查用户
function getUsersBydep (params) {
  return axios({
    url: '/user/list',
    params
  });
}
// 新增部门信息
function addDepMsg (data) {
  return axios({
    url: '/organization/add',
    method: 'post',
    data
  });
}
// 编辑部门信息
function editDepMsg (data) {
  return axios({
    url: '/organization/update',
    method: 'post',
    data
  });
}

// 解锁、锁定用户
function setLockById (data) {
  return axios({
    url: '/organization/lock',
    method: 'post',
    data
  });
}

// 删除部门
function delDepMsg (data) {
  return axios({
    url: '/organization/del',
    method: 'post',
    data
  });
}

// 重置用户密码
function resetUserPsWord (data) {
  return axios({
    url: '/organization/resetpass',
    method: 'post',
    data
  });
}
// 删除或晋升部门负责人
function updateleader (data) {
  return axios({
    url: '/organization/updateleader',
    method: 'post',
    data
  });
}

// 获得所有部门
function getAllOrgnization (params) {
  return axios({
    url: '/organization/find-all',
    method: 'get',
    params
  });
}

// 通过部门id获得部门负责人
function findLeader (params) {
  return axios({
    url: '/organization/findLeader',
    method: 'get',
    params
  });
}

// 获取成员
function findMem (params) {
  return axios({
    url: '/organization/findMem',
    params
  });
}

// 获取日志列表
function getSystemMLogList (params) {
  return axios({
    url: '/log/findotherlog',
    params
  });
}

// 获取消息列表
function getSystemMsgList (params) {
  return axios({
    url: '/message/find',
    params
  });
}

// 通过申请
function msgProcess (data) {
  return axios({
    url: '/message/process',
    method: 'post',
    data
  });
}

// 查询配置信息
function getConfigMsg () {
  return axios({
    url: '/config/find'
  });
}

// 修改配置信息
function setConfigMsg (data) {
  return axios({
    url: '/config/update',
    method: 'post',
    data
  });
}

// 日志导出
function syslogExportLogs (params) {
  return axios({
    url: '/syslog/exportLogs',
    responseType: 'blob',
    params
  });
}


// 新增用戶
function addUser (data) {
  return axios({
    url: '/user/add',
    method: 'post',
    data
  });
}
// 編輯用戶
function updateUser (data) {
  return axios({
    url: '/user/update',
    method: 'post',
    data
  });
}
// 刪除用戶
function delUser (data) {
  return axios({
    url: '/user/del',
    method: 'post',
    data
  });
}

export {
  getAllDepList,
  getUsersBydep,
  addDepMsg,
  editDepMsg,
  setLockById,
  delDepMsg,
  resetUserPsWord,
  updateleader,
  getAllOrgnization,
  findLeader,
  findMem,
  getSystemMLogList,
  getSystemMsgList,
  msgProcess,
  getConfigMsg,
  setConfigMsg,
  syslogExportLogs,
  addUser,
  updateUser,
  delUser
};
