<template>
  <div class="movie-detail-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <carousel class="movie-detail-banner" :perPage="1" paginationActiveColor="#42b983" paginationColor="#b2ebd1" :paginationSize="5" :autoplay="true" :autoplayHoverPause="true" :autoplayTimeout="5000">
                <slide class="movie-detail-banner-item" v-for="photoItem in movieDetail.photoList" :key="photoItem">
                    <img :src="photoItem" alt="">
                </slide>
            </carousel>
            <div class="movie-detail-title">
                <p>{{ movieDetail.title }}</p>
            </div>
            <div class="movie-detail-author">
                <p>文/{{ (movieDetail.author_list && movieDetail.author_list[0]) ? movieDetail.author_list[0].user_name : '' }}</p>
            </div>
            <div class="movie-detail-content" v-html="movieDetail.content ? movieDetail.content : ''">
            </div>
            <div class="movie-detail-content-footer">
                <p>{{ movieDetail.charge_edt }}</p>
                <p>{{ movieDetail.copyright }}</p>
            </div>
            <author-item :authorInfo="(movieDetail.author_list && movieDetail.author_list[0])  ? movieDetail.author_list[0] : {}" />
            <div class="movie-detail-comment">
                <p class="movie-detail-comment-title">评论内容</p>
                <hr class="movie-detail-comment-separate-line"> 
            </div>
            <div id="dataList"  class="data-list movie-detail-comment-list v-transition">
                <comment-list-item v-for="commentListItem in commentList" :key="commentListItem.id" :info="commentListItem"/>
            </div>   
        </div>
    </div>        
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem';
import AuthorItem from '@/components/AuthorItem';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      movieDetail: {
          author_list: {},
          photoList: [],
      },
      commentList: [],
    };
  },
  components: {
    'comment-list-item': CommentListItem,
    'author-item': AuthorItem,
    Carousel,
    Slide,
  },
  mounted() {
    const self = this;
    const { id } = self.$route.params;
    self.getDetail(id);
    self.mescroll = new MeScroll('mescroll', {
        // 配置下拉刷新
        down: {
            use: false
        },
        up: {    // 配置上拉加载
            callback: self.upCallback,
            toTop: {
                src: '/static/img/mescroll-totop.png',
                offset: 1000,
            },
            page: {
                size: 10, //每页数据条数
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
        console.log('curPageData', curPageData);
        // 更新列表数据
        self.commentList = self.commentList.concat(curPageData);
        // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log('curPageData.length',curPageData.length);
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
      let url = `/api/v1/comment/movie/${id}/0`;
      if (commentList.length > 0) {
        url = `/api/v1/comment/movie/${id}/${commentList[commentList.length - 1].id}`;
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
      const url = `/api/v1/movie/detail/${id}`;
      const self = this;
      self.axios.get(url).then((res) => {
        console.log('res', res);
        self.movieDetail = res.data.data.data[0];
      }, () => {
      });
    },
  },
  destroyed() {
    // 这个操作至关重要，如果不清除mescroll实例，导致到下一个页面ios下无法滑动，因为是单页应用，如果不清除的话，会一直在内存中
    this.mescroll.destroy();
    const { $ } = this.$_utils;
    const $mescrollTotop = $('.mescroll-totop')[0];
    const $body = $('body')[0];
    if($mescrollTotop) {
        // 移除滑到顶部，否则切换到其他页面之后还存在
        $body.removeChild($mescrollTotop);
    }
   },
};
</script>

<style lang="scss">
  .movie-detail-page {
    height: 100%;
    color: #323232;
    -webkit-overflow-scrolling: touch;
    .movie-detail-title {
        margin: 1.8rem .533333rem 0 .533333rem;
        text-align: center;
        font-weight: bold;
        font-size: .746667rem;
    }
    .movie-detail-banner {
        .movie-detail-banner-item {
            width: 100%;
            text-align: center;
            img {
                width: 100%;
                height: 5.333333rem;
                display: block;
            }
        }
    }
    .movie-detail-author {
        font-size: .373333rem;
        margin-top: .66667rem;
        margin-bottom: .6rem;
        text-align: center;
    }
    .movie-detail-content {
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
    .movie-detail-content-footer {
        color: #808080;
        font-style: oblique;
        font-size: .32rem;
        padding-bottom: .266667rem;
        p {
            margin: .533333rem;
        }
    }
    .movie-detail-comment-list {
        margin: 0 .533333rem 0 .533333rem;
    }
    .movie-detail-comment {
        color: #323232;
        margin: 1.6rem .533333rem 0 .533333rem;
        .movie-detail-comment-title {
            font-size: .4rem;
        }
        .movie-detail-comment-separate-line {
            border: .053333rem solid #000;
            margin: .186667rem 0;
            width: 1.866667rem;
        }
    }
  }
</style>