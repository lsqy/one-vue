<template>
  <div class="movie-list-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <div id="dataList"  class="data-list movie-list v-transition">
                <movie-item v-for="movieItem in movieList" :key="movieItem.id" @click.native="goDetail(movieItem.item_id)" :contentItem="movieItem"/>
            </div>
        </div>
    </div>    
  </div>
</template>

<script>
/* global MeScroll :true */
import IndexItem from '@/components/IndexItem';

export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      movieList: [
      ],
      isRefresh: false, // 是否是下拉刷新
    };
  },
  components: {
    'movie-item': IndexItem,
  },
  mounted() {
    const self = this;
    self.mescroll = new MeScroll('mescroll', {
      // 配置下拉刷新
      down: {
        callback: (mescroll) => {
          // 加载轮播数据
          // loadSwiper();
          // 下拉刷新的回调,默认重置上拉加载列表为第一页
          mescroll.resetUpScroll();
        },
        beforeLoading: () => {
          // 设置为下拉刷新状态
          self.isRefresh = true;
        },
      },
      up: {    // 配置上拉加载
        callback: self.upCallback,
        toTop: {
          src: '/static/img/mescroll-totop.png',
          offset: 1000,
        },
        page: {
          size: 10, // 每页数据条数
        },
        empty: {
          wrapId: 'dataList',
          tip: '暂无数据',
        },
        clearEmptyId: 'dataList', // 相当于同时设置了clearId和empty.warpId; 简化写法;
      },
    });
    // 禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    // document.ondragstart = self.ondragstart;
  },
  methods: {
    upCallback(page) {
      const self = this;
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
        // console.log('curPageData', curPageData);
        // 如果是第一页需手动置空列表
        // if(page.num == 1) self.movieList = [];
        // 更新列表数据
        self.movieList = self.movieList.concat(curPageData);
        // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log(`page.num=${page.num}, page.size=${page.size}, curPageData.length=${curPageData.length}, self.movieList.length:${self.movieList.length}`);
        self.mescroll.endSuccess(curPageData.length);
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      const { movieList, isRefresh } = this;
      const self = this;
      // 请求首页的时候不加id，以后分页请求加上最后一条的id
      let url = '/api/v1/movie/0';
      if (movieList.length > 0 && !isRefresh) {
        url = `/api/v1/movie/${movieList[movieList.length - 1].id}`;
      }
      this.axios.get(url).then((res) => {
        if (res.data && res.data.data) {
          if (successCallback) {
            successCallback(res.data.data); // 成功回调
            self.isRefresh = false;
          }
        }
      }, (err) => {
        if (errorCallback) {
          errorCallback(err); // 失败回调
          self.isRefresh = false;
        }
      });
    },
    ondragstart() {
      return false;
    },
    goDetail(itemId) {
      this.$router.push({
        name: 'MovieDetail',
        params: {
          id: itemId,
        },
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
    .movie-list-page {
        height: 100%;
        color: #323232;
        background: #f6f6f6;
    }
    .mescroll-bounce {
        height: 100%;
    }
</style>