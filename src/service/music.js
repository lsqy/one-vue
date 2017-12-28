
import request from '../utils/request';

// 获取音乐列表
export async function getList(id) {
  let url = '/music/0';
  if (id) {
    url = `/music/${id}`;
  }
  return request(url, {});
}


export async function getDetail(id) {
  const url = `/music/detail/${id}`;
  return request(url, {});
}
