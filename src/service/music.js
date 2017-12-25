
import request from '../utils/request';
export async function getList(id) {
  // let url = '/api/v1/music/0';
  let url = '/music/0';
  if(id) {
    url = `/music/${id}`;
  }
  return request(url, {});
}