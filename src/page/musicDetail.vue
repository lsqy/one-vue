<template>
  <div class="music-detail-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <div class="music-detail-banner">
                <div class="music-detail-banner-shade"></div>
                <img class="music-detail-banner-img" :src="musicDetail.cover" alt="">               
                <img src="http://image.wufazhuce.com/music-detail-play.png" alt="" class="music-detail-banner-play-btn">
            </div>
            <div class="music-detail-info">
                <p>{{ musicDetail.title }}</p>
                <p>{{ musicDetail.album }}</p>
                <p>{{ musicDetail.story_author ? musicDetail.story_author.user_name : '' }}</p>
            </div>
            <div class="music-detail-title">
                <p>{{ musicDetail.story_title }}</p>
            </div>
            <div class="music-detail-author">
                <p>文/{{ musicDetail.story_author ? musicDetail.story_author.user_name : '' }}</p>
            </div>
            <div class="music-detail-content" v-html="musicDetail.story ? musicDetail.story : ''">
            </div>
            <div class="music-detail-content-footer">
                <p>{{ musicDetail.charge_edt }}</p>
                <p>{{ musicDetail.copyright }}</p>
            </div>
            <author-item :authorInfo="(musicDetail.author_list && musicDetail.author_list[0])  ? musicDetail.author_list[0] : {}" />
            <div class="music-detail-comment">
                <p class="music-detail-comment-title">评论内容</p>
                <hr class="music-detail-comment-separate-line"> 
            </div>
            <div id="dataList"  class="data-list music-detail-comment-list v-transition">
                <comment-list-item v-for="commentListItem in commentList" :key="commentListItem.id" :info="commentListItem"/>
            </div>   
        </div>
    </div>        
  </div>
</template>

<script>
/* global MeScroll:true */
import CommentListItem from '@/components/CommentListItem';
import { mapState } from 'vuex';
import AuthorItem from '@/components/AuthorItem';
import * as types from '../store/mutation-types';

export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      commentList: [],
    };
  },
  computed: {
    ...mapState({
      musicDetail: state => state.music.musicDetail,
    }),
  },
  components: {
    'comment-list-item': CommentListItem,
    'author-item': AuthorItem,
  },
  mounted() {
    const self = this;
    const { id } = self.$route.params;
    self.getDetail(id);
    self.mescroll = new MeScroll('mescroll', {
      // 配置下拉刷新
      down: {
        use: false,
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
          tip: '暂无评论',
        },
        clearEmptyId: 'dataList', // 相当于同时设置了clearId和empty.warpId; 简化写法;
      },
    });
    // 禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    document.ondragstart = self.ondragstart;
  },
  methods: {
    upCallback(page) {
      const self = this;
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
        // 更新列表数据
        self.commentList = self.commentList.concat(curPageData);
        // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log('curPageData.length', curPageData.length);
        self.mescroll.endSuccess(curPageData.length);
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      const self = this;
      const { id } = self.$route.params;
      const { commentList } = self;

      // 请求首页的时候不加id，以后分页请求加上最后一条的id
      let url = `/api/v1/comment/music/${id}/0`;
      if (commentList.length > 0) {
        url = `/api/v1/comment/music/${id}/${commentList[commentList.length - 1].id}`;
      }
      self.axios.get(url).then((res) => {
        if (res.data && res.data.data) {
          if (successCallback) {
            successCallback(res.data.data.data); // 成功回调
          }
        }
      }, (err) => {
        if (errorCallback) {
          errorCallback(err); // 失败回调
        }
      });
    },
    ondragstart() {
      return false;
    },
    getDetail(id) {
      this.$store.dispatch('getMusicDetail', {
        id,
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
    this.$store.commit(types.RESETTMUSICDETAIL);
  },
};
</script>

<style lang="scss">
  .music-detail-page {
    height: 100%;
    color: #323232;
    -webkit-overflow-scrolling: touch;
    .music-detail-banner {
        position: relative;
        width: 100%;
        height: 9.493333rem;
        .music-detail-banner-shade {
            position: absolute;
            left: -4.96rem;
            top: -3.573333rem;
            width: 13.066667rem;
            height: 13.066667rem;
            border-radius: 6.533333rem 6.533333rem 6.533333rem 0;
            box-shadow: 0 0 .533333rem .133333rem rgba(230,230,230,0.6);
        }
        .music-detail-banner-img {
            position: absolute;
            left: -4.48rem;
            top: -3.093333rem;
            width: 12.106667rem;
            height: 12.106667rem;
            border-radius: 6.053333rem 6.053333rem 6.053333rem 6.026667rem;
            overflow: hidden;
        }
        .music-detail-banner-play-btn {
            position: absolute;
            left: .613333rem;
            top: 2rem;
            width: 1.92rem;
            height: 1.92rem;
        }
    }
    .music-detail-info {
        text-align: center;
        font-size: .373333rem;
        line-height: .533333rem;
        margin-top: .853333rem;
    }
    .music-detail-title {
        margin: .8rem .533333rem 0 .533333rem;
        text-align: center;
        font-weight: bold;
        font-size: .746667rem;
    }
    .music-detail-author {
        font-size: .373333rem;
        margin-top: 1.066667rem;
        margin-bottom: .8rem;
        text-align: center;
    }
    .music-detail-content {
        padding: 0 .533333rem;
        line-height: .693333rem;
        margin-top: .373333rem;
        font-size: .426667rem;
        p {
            text-align: justify;
            margin-bottom: .4rem;
        }
        .one-quote-warp p {
            margin-left: 25px !important;
            margin-top: 0 !important;
            color: #808080;
        }
    }
    .music-detail-content-footer {
        color: #808080;
        font-style: oblique;
        font-size: .32rem;
        padding-bottom: .266667rem;
        p {
            margin: .533333rem;
        }
    }
    .music-detail-comment-list {
        margin: 0 .533333rem 0 .533333rem;
    }
    .music-detail-comment {
        color: #323232;
        margin: 1.6rem .533333rem 0 .533333rem;
        .music-detail-comment-title {
            font-size: .4rem;
        }
        .music-detail-comment-separate-line {
            border: .053333rem solid #000;
            margin: .186667rem 0;
            width: 1.866667rem;
        }
    }
  }
</style>