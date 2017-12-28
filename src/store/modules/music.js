import {
  getList
} from '../../service/music';
import * as types from '../mutation-types'

const state = {
  musicList: [],
  isRefresh: false,
  isFromDetail: false,
  pageNo: 0,
};

// getters
const getters = {
}

// actions
const actions = {
  //请求列表
  async getMusicList({
    commit,
    state,
  }, payload) {
    const { id } = payload;
    let result = await getList(id);
    if(result && result.length > 0) {
      return new Promise((resolve, reject) => {
          resolve(result);
      })
    }
  },
};

// mutations
const mutations = {
  //请求列表成功
  [types.GETMUSICLIST_SUCCESS]( state, payload ) {
    state.musicList = payload;
    state.isRefresh = false;
  },
  [types.GETMUSICLISTMORE_SUCCESS]( state, payload ) {
    state.musicList = state.musicList.concat(payload);
  },
  [types.REFRESHMUSICLIST]( state, payload ) {
    state.isRefresh = true;
  },
  [types.REFRESHMUSICLISTSUCCESS]( state, payload ) {
    state.musicList = [];
  },
  [types.FROMMUSICDETAIL]( state, payload ) {
    console.log('payload',payload);
    if(payload) {
      const { isFromDetail } = payload;
      state.isFromDetail = isFromDetail;
    }
  },
  [types.ADDPAGENO]( state, payload ) {
    if(payload) {
      const { pageNo } = payload;
      state.pageNo = pageNo;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}