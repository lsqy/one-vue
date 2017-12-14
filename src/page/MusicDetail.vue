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
            <div class="music-detail-author-wrap">
                <p>作者</p>
                <hr class="music-detail-author-separate-line">
                <div class="music-detail-author-detail">
                    <img :src="musicDetail.author_list[0] ? musicDetail.author_list[0].web_url : ''" alt="">
                    <div class="music-detail-author-detail-info">
                        <p>{{ musicDetail.author_list[0] ? musicDetail.author_list[0].user_name : '' }}</p>
                        <p class="music-detail-author-detail-desc">{{ musicDetail.author_list[0] ? musicDetail.author_list[0].desc : '' }}</p>
                    </div>
                </div>
            </div>
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
import CommentListItem from '@/components/CommentListItem';
export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      musicDetail: {
          author_list: {}
      },
      commentList: [
        {
            "id": "62265",
            "quote": "",
            "content": "想变的更好，成为你余生之中咬牙切齿的遗憾。",
            "praisenum": 186,
            "device_token": "",
            "del_flag": "0",
            "reviewed": "1",
            "user_info_id": "10089",
            "input_date": "2017-12-13 06:42:52",
            "created_at": "2017-12-13 06:42:52",
            "updated_at": "2017-12-13 14:23:47",
            "user": {
            "user_id": "6087871",
            "user_name": "睿睿睿睿睿宝",
            "web_url": "http://image.wufazhuce.com/FkCnVuJc0itF8YNME-cx3d6c2JgI?imageView2/1/w/80/h/80/q/75"
            },
            "touser": null,
            "type": 0
        },
        {
            "id": "62262",
            "quote": "",
            "content": "别在电话里哽咽了，如果可以，明天我们见面吧",
            "praisenum": 116,
            "device_token": "",
            "del_flag": "0",
            "reviewed": "1",
            "user_info_id": "10089",
            "input_date": "2017-12-13 06:30:32",
            "created_at": "2017-12-13 06:30:32",
            "updated_at": "2017-12-13 14:12:25",
            "user": {
            "user_id": "8444499",
            "user_name": "潘多拉",
            "web_url": "http://image.wufazhuce.com/Fg_6PL3ZnqpkCXtTtnTuiOJKQsI3?imageView2/1/w/80/h/80/q/75"
            },
            "touser": null,
            "type": 0
        },
        {
            "id": "62283",
            "quote": "",
            "content": "终于鼓起勇气问你为什么不理我，回答我的还是等待，原来我们之间只有我认真了，你只是一时冲动说喜欢我，过去了那个时间，你已经忘记了，而我却还沉浸在感动里。是的，我错了，你没有时间配合我那么久，毕竟你很忙。",
            "praisenum": 71,
            "device_token": "",
            "del_flag": "0",
            "reviewed": "1",
            "user_info_id": "10089",
            "input_date": "2017-12-13 07:43:24",
            "created_at": "2017-12-13 07:43:24",
            "updated_at": "2017-12-13 14:23:47",
            "user": {
            "user_id": "8661893",
            "user_name": "安",
            "web_url": "http://image.wufazhuce.com/Fh10GxbMN1PnmQmWrNxl83ioYtDb?imageView2/1/w/80/h/80/q/75"
            },
            "touser": null,
            "type": 0
        }
      ],
    };
  },
  components: {
    'comment-list-item': CommentListItem,
  },
  mounted() {
    console.log(this.$route.params);
    const { id } = this.$route.params;
    this.getDetail(id);
    const self = this;
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
            empty: {
            wrapId: 'dataList',
            tip: '暂无数据',
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
      console.log(2112);
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
        // console.log('curPageData', curPageData);
        // 如果是第一页需手动置空列表
        // if(page.num == 1) self.musicList = [];
        // 更新列表数据
        self.commentList = self.commentList.concat(curPageData);
        // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log(`page.num=${page.num}, page.size=${page.size}, curPageData.length=${curPageData.length}, self.musicList.length:${self.musicList.length}`);
        self.mescroll.endSuccess(curPageData.length);
      }, () => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
    },
    getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
      /*const { musicList, isRefresh } = this;
      const self = this;
      // 请求首页的时候不加id，以后分页请求加上最后一条的id
      let url = '/api/v1/music';
      if (musicList.length > 0 && !isRefresh) {
        url = `${url}/${musicList[musicList.length - 1].id}`;
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
      });*/
    },
    ondragstart() {
      return false;
    },
    getDetail(id) {
      const url = `/api/v1/musicDetail/${id}`;
      const self = this;
      self.axios.get(url).then((res) => {
        console.log('res', res);
        self.musicDetail = res.data.data;
      }, () => {
      });
    },
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
    .music-detail-author-wrap {
        font-size: .4rem;
        margin: .533333rem;
        .music-detail-author-separate-line {
            border: .053333rem solid #000;
            margin: .186667rem 0;
            width: 1.866667rem;
        }
        .music-detail-author-detail {
            display: flex;
            align-items: center;
            line-height: .533333rem;
            font-size: .373333rem;
            img {
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
                display: inline-block;
                overflow: hidden;
                margin-right: .133333rem;
            }
            .music-detail-author-detail-info {
                flex: 1;
            }
            .music-detail-author-detail-desc {
                color: #808080;
                font-size: .266667rem;
            }
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