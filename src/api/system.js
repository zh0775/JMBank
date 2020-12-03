import { axios } from '@/utils/request';



function getToken (data) {
  return axios({
    url: '',
    method: 'post',
    data
  });
}

export {
  getToken
};
