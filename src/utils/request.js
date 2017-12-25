
// import { apiBaseURL } from '../config/config.js';
const apiBaseURL = '/api/v1';

// 全局拦截
function checkStatus(response) {
  try {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}

// 解析json
function parseJSON(response) {
  try {
    return response.json();
  } catch (e) {
    console.log(e.message);
    throw e;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(apiBaseURL + url, options)
.then(checkStatus)
.then(parseJSON)
.then((data) => {
  if (data.res === 0) {
    return data.data;
  }
  return data;
})
.catch((err) => {
  console.log(err);
  throw err;
});
}
