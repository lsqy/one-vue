import {
  getList
} from '../../service/music';
import * as types from '../mutation-types'

const state = {
  musicList: [],
  isRefresh: false,
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
    console.log('payload',payload);
    state.musicList = payload;
    state.isRefresh = false;
  },
  [types.GETMUSICLISTMORE_SUCCESS]( state, payload ) {
    state.musicList = state.musicList.concat(payload);
  },
  [types.REFRESHMUSICLIST]( state, payload ) {
    state.isRefresh = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}