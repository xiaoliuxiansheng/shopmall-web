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
    axios({
      method: method,
      url: serverHost + api,
      headers: headers,
      data: params
    })
    .then((res) => {

      if (res.data.errcode && res.data.errcode < 0) {
        Toast.info(JSON.stringify(res.data) || '请求错误');
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
// 获取角色权限信息
export async function getUserMessage () {
  return axiosRequest(`test`, 'GET', null, false, global.G_SERVER_HOST_GETUSERMSG,headers);
}
