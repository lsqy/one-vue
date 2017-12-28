<template>
  <div class="music-list-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <div id="dataList"  class="data-list music-list v-transition">
                <music-item v-for="musicItem in musicList" :key="musicItem.id" @click.native="goDetail(musicItem.item_id)" :contentItem="musicItem"/>
            </div>
        </div>
    </div>    
  </div>
</template>

<script>
/* global MeScroll :true */
import MusicItem from '@/components/MusicItem';
import { mapState } from 'vuex';
import * as types from '../store/mutation-types';

export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
    };
  },
  computed: {
    ...mapState({
      isRefresh: state => state.music.isRefresh,
      musicList: state => state.music.musicList,
      isFromDetail: state => state.music.isFromDetail,
      pageNo: state => state.music.pageNo,
    }),
  },
  components: {
    'music-item': MusicItem,
  },
  mounted() {
    const self = this;
    const { $ } = self.$_utils;
    self.mescroll = new MeScroll('mescroll', {
      // 配置下拉刷新
      down: {
        callback: (mescroll) => {
          if (self.isFromDetail) {
            self.$store.commit(types.FROMMUSICDETAIL, {
              isFromDetail: false,
            });
            return;
          }
          // 下拉刷新的回调,默认重置上拉加载列表为第一页
          mescroll.resetUpScroll();
          self.$store.commit(types.REFRESHMUSICLISTSUCCESS);
        },
        beforeLoading: () => {
          // 设置为下拉刷新状态
          self.$store.commit(types.REFRESHMUSICLIST);
        },
      },
      up: {    // 配置上拉加载
        callback: self.upCallback,
        toTop: {
          src: '/static/img/mescroll-totop.png',
          offset: 1000,
        },
        page: {
          num: self.pageNo,
          size: 10, // 每页数据条数
        },
        empty: {
          wrapId: 'dataList',
          tip: '暂无数据',
        },
        clearEmptyId: 'dataList', // 相当于同时设置了clearId和empty.warpId; 简化写法;
      },
    });
    // 列表返回还原滚动位置
    const musicMescrollTop = sessionStorage.getItem('musicMescrollTop') || 0;
    const $mescroll = $('#mescroll');
    $mescroll.scrollTop = musicMescrollTop;
    sessionStorage.removeItem('musicMescrollTop');
    // 禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    document.ondragstart = self.ondragstart;
  },
  methods: {
    upCallback(page) {
      const self = this;
      // 如果是从列表返回的，则不发起首次请求
      if (self.isFromDetail) {
        self.$store.commit(types.FROMMUSICDETAIL, {
          isFromDetail: false,
        });
        return;
      }
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
        // console.log('curPageData', curPageData);
        // 如果是第一页需手动置空列表
        // if(page.num == 1) self.musicList = [];
        // 更新列表数据
        // self.musicList = self.musicList.concat(curPageData);
        // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log('test');
        console.log(`page.num=${page.num}, page.size=${page.size}, curPageData.length=${curPageData.length}, self.musicList.length:${self.musicList.length}`);
        self.$store.commit(types.ADDPAGENO, {
          pageNo: page.num,
        });
        self.mescroll.endSuccess(curPageData.length);
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      const { musicList, isRefresh } = this;
      const self = this;
      // 请求首页的时候不加id，以后分页请求加上最后一条的id
      if (musicList.length > 0 && !isRefresh) {
        self.$store.dispatch('getMusicList', {
          id: musicList[musicList.length - 1].id,
        }).then((res, err) => {
          if (successCallback) {
            if (res && res.length) {
              successCallback(res); // 成功回调
              self.$store.commit(types.GETMUSICLISTMORE_SUCCESS, res);
            } else if (errorCallback) {
              errorCallback(err);
            }
          }
        });
      } else {
        self.$store.dispatch('getMusicList', {
        }).then((res) => {
          if (successCallback) {
            if (res && res.length) {
              successCallback(res); // 成功回调
              self.$store.commit(types.GETMUSICLIST_SUCCESS, res);
            }
          }
        });
      }
    },
    ondragstart() {
      return false;
    },
    goDetail(itemId) {
      const { $ } = this.$_utils;
      const $mescroll = $('#mescroll');
      const mescrollTop = $mescroll.scrollTop || 0;
      sessionStorage.setItem('musicMescrollTop', mescrollTop);

      this.$router.push({
        name: 'MusicDetail',
        params: {
          id: itemId,
        },
      });
      this.$store.commit(types.FROMMUSICDETAIL, {
        isFromDetail: true,
      });
    },
  },
  destroyed() {
    // 这个操作至关重要，如果不清除mescroll实例，导致到下一个页面ios下无法滑动，因为是单页应用，如果不清除的话，会一直在内存中
    this.mescroll.destroy();
    const { $ } = this.$_utils;
    const $mescrollTotop = $('.mescroll-totop')[0];
    const $body = $('body')[0];
    if ($mescrollTotop) {
      // 移除滑到顶部，否则切换到其他页面之后还存在
      $body.removeChild($mescrollTotop);
    }
  },
};
</script>

<style lang="scss" scoped>
    .music-list-page {
        height: 100%;
        color: #323232;
        background: #f6f6f6;
    }
    .mescroll-bounce {
        height: 100%;
    }
</style>
