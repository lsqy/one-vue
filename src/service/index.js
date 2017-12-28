
import request from '../utils/request';

// 获取首页列表
export async function getList() {
  return request('/onelist', {});
}


export async function getDetail() {
  return request('/onelist', {});
}
