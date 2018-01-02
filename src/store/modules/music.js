import {
  getList,
  getDetail,
} from '../../service/music';
import * as types from '../mutation-types';

const Musicstate = {
  musicList: [],
  musicDetail: {
    author_list: [],
  },
  isRefresh: false,
  isFromDetail: false,
  pageNo: 0,
};

// getters
const getters = {
};

// actions
const actions = {
  // 请求列表
  async getMusicList($store, payload) {
    console.log('$store', $store);
    const { id } = payload;
    const result = await getList(id);
    if (result && result.length > 0) {
      // return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        resolve(result);
      });
    }
    return new Promise((resolve) => {
      resolve({});
    });
  },
  // 请求音乐详情
  async getMusicDetail($store, payload) {
    const { id } = payload;
    const result = await getDetail(id);
    console.log('result', result);
    if (result) {
      $store.commit(types.GETMUSICDETAILSUCCESS, {
        musicDetail: result,
      });
      // return new Promise((resolve, reject) => {
      return new Promise((resolve) => {
        resolve(result);
      });
    }
    return new Promise((resolve) => {
      resolve({});
    });
  },
};

// mutations
const mutations = {
  // 请求列表成功
  [types.GETMUSICLIST_SUCCESS](state, payload) {
    const musicState = state;
    musicState.musicList = payload;
    musicState.isRefresh = false;
    // musicState.pageNo = 0;
  },
  [types.GETMUSICLISTMORE_SUCCESS](state, payload) {
    const musicState = state;
    musicState.musicList = musicState.musicList.concat(payload);
  },
  [types.REFRESHMUSICLIST](state) {
    const musicState = state;
    musicState.isRefresh = true;
  },
  // 下拉刷新成功，先清空音乐列表
  [types.REFRESHMUSICLISTSUCCESS](state) {
    const musicState = state;
    musicState.musicList = [];
  },
  [types.FROMMUSICDETAIL](state, payload) {
    console.log('payload', payload);
    const musicState = state;
    if (payload) {
      const { isFromDetail } = payload;
      musicState.isFromDetail = isFromDetail;
    }
  },
  [types.ADDPAGENO](state, payload) {
    const musicState = state;
    if (payload) {
      const { pageNo } = payload;
      musicState.pageNo = pageNo;
    }
  },
  // 获取音乐详情成功
  [types.GETMUSICDETAILSUCCESS](state, payload) {
    const musicState = state;
    if (payload) {
      const { musicDetail } = payload;
      musicState.musicDetail = musicDetail;
    }
  },
  // 重置音乐详情
  [types.RESETTMUSICDETAIL](state) {
    const musicState = state;
    musicState.musicDetail = {
      author_list: [],
    };
  },
};

export default {
  state: Musicstate,
  getters,
  actions,
  mutations,
};
