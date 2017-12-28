import {
  getList,
} from '../../service/index';
import * as types from '../mutation-types';

const IndexState = {
  indexList: [],
};

// getters
const getters = {
};

// actions
const actions = {
  // 请求列表
  async getIndexList({
    commit,
  }) {
    const res = await getList();
    if (res && res.content_list) {
      commit(types.GETINDEXLIST_SUCCESS, res);
    }
  },
};

// mutations
const mutations = {
  // 请求列表成功
  [types.GETINDEXLIST_SUCCESS](state, payload) {
    const indexState = state;
    indexState.indexList = payload.content_list;
  },
};

export default {
  state: IndexState,
  getters,
  actions,
  mutations,
};
