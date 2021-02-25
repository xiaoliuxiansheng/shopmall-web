/*
 * @Descripttion:
 * @Author: qingzi.wang
 * @Date: 2020-02-26 00:07:10
 */

import axios from 'axios'
import { Toast } from 'antd-mobile';

let loadingFlag = false; // 加载控制

/**
 * isHideLoading 是否隐藏加载提示
 * params 传送数据
 */
export function axiosRequest(api, method = 'GET', params, isHideLoading, serverHost = global.G_SERVER_HOST,headers = {}) {

  // 条件显示加载提示
  if (!loadingFlag && !isHideLoading) {
    Toast.loading('数据加载中...', 0);
    loadingFlag = true;
  }
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    axios({
      method: method,
      url: serverHost + api,
      headers: {
        authorization: "Bearer " + token,
        ...headers,
      },
      data: params
    })
    .then((res) => {
      if (res.data.errcode && res.data.errcode < 0) {
        Toast.fail(res.data.msg || '请求错误',2);
        return
      }
      if ( +res.data.errcode === 405) {
        Toast.info(res.data.message || '用户认证信息已过期，请重新登录！')
        localStorage.removeItem('token')
        setTimeout(() => {
          window.location.href = '/'
        },1000)
        return
      }
      resolve(res.data);

      loadingFlag = false;
      Toast.hide();

    })
    .catch((error) => {

      Toast.hide();

      if (error) {
        Toast.info('服务端发生逻辑错误！');
      }

      reject(error);

    })
  })
}

/**
 * test
 */
// 注册
export async function UserRegister (msg) {
  return axiosRequest(`/api/register`, 'POST', msg, false);
}
// 登录
export async function UserLogin (msg) {
  return axiosRequest(`/api/userLogin`, 'POST', msg, false);
}
// 用户列表
export async function UserList (page,size) {
  return axiosRequest(`/api/user/list?page=${page}&size=${size}`, 'GET', '', false);
}
// 修改名称
export async function modifyUserName (msg) {
  return axiosRequest(`/api/user/name`, 'PUT', msg, false);
}
// 修改密码
export async function modifyUserPwd (msg) {
  return axiosRequest(`/api/user/password`, 'PUT', msg, false);
}
