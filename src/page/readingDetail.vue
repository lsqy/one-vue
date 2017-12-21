<template>
  <div class="reading-detail-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <spinner v-if="!readingDetail.hp_content"/>
            <template v-if="readingDetail.hp_content">
                <div class="reading-detail-title">
                    <p>{{ readingDetail.hp_title }}</p>
                </div>
                <div class="reading-detail-author">
                    <hr class="reading-detail-separate-line">
                    <p>文/{{ (readingDetail.author && readingDetail.author[0]) ? readingDetail.author[0].user_name : '' }}</p>
                </div>
                <div class="reading-detail-img">
                    <img :src="readingDetail.img_url ? readingDetail.img_url : ''" alt="">
                </div>  
                <div class="reading-detail-content" v-html="readingDetail.hp_content ? readingDetail.hp_content : ''">
                </div>
                <div class="reading-detail-content-footer">
                    <p>{{ readingDetail.charge_edt }}</p>
                    <p>{{ readingDetail.copyright }}</p>
                </div>
                <author-item :authorInfo="(readingDetail.author_list && readingDetail.author_list[0])  ? readingDetail.author_list[0] : {}" />
                <div class="reading-detail-comment">
                    <p class="reading-detail-comment-title">评论内容</p>
                    <hr class="reading-detail-comment-separate-line"> 
                </div>
                <div id="dataList"  class="data-list reading-detail-comment-list v-transition">
                    <comment-list-item v-for="commentListItem in commentList" :key="commentListItem.id" :info="commentListItem"/>
                </div>   
            </template>
        </div>
    </div>        
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem';
import AuthorItem from '@/components/AuthorItem';
import Spinner from '@/components/Spinner';

export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      readingDetail: {
          author_list: {}
      },
      commentList: [],
    };
  },
  components: {
    'comment-list-item': CommentListItem,
    'author-item': AuthorItem,
    Spinner,
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
                size: 20, //每页数据条数
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
      let url = `/api/v1/comment/essay/${id}/0`;
      if (commentList.length > 0) {
        url = `/api/v1/comment/essay/${id}/${commentList[commentList.length - 1].id}`;
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
      const url = `/api/v1/reading/detail/${id}`;
      const self = this;
      self.axios.get(url).then((res) => {
        console.log('res', res);
        self.readingDetail = res.data.data;
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
  .reading-detail-page {
    height: 100%;
    color: #323232;
    -webkit-overflow-scrolling: touch;
    .reading-detail-title {
        margin: .8rem .533333rem 0 .533333rem;
        text-align: center;
        font-weight: bold;
        font-size: .746667rem;
    }
    .reading-detail-separate-line {
        border: .053333rem solid #000;
        margin: .386667rem 0;
        width: 1.866667rem;
    }
    .reading-detail-author {
        font-size: .373333rem;
        margin: .8rem .533333rem;
    }
    .reading-detail-img {
        margin: .533333rem;
        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }
    .reading-detail-content {
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
    .reading-detail-content-footer {
        color: #808080;
        font-style: oblique;
        font-size: .32rem;
        padding-bottom: .266667rem;
        p {
            margin: .533333rem;
        }
    }
    .reading-detail-comment-list {
        margin: 0 .533333rem 0 .533333rem;
    }
    .reading-detail-comment {
        color: #323232;
        margin: 1.6rem .533333rem 0 .533333rem;
        .reading-detail-comment-title {
            font-size: .4rem;
        }
        .reading-detail-comment-separate-line {
            border: .053333rem solid #000;
            margin: .186667rem 0;
            width: 1.866667rem;
        }
    }
  }
</style>

