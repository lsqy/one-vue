<template>
  <div class="music-list-page">
    <div id="mescroll" class="mescroll">
        <div class="mescroll-bounce">
            <div id="dataList"  class="data-list music-list v-transition">
                <div class="music-list-item" v-for="musicItem in musicList" :key="musicItem.id">
                    <div class="music-list-tag">- <span>音乐</span> -</div>
                    <div class="music-list-item-title">
                        <p>{{ musicItem.title }}</p>
                        <p class="music-list-item-title__desc">{{ musicItem.share_list.wx ? $utils.getAuthor(musicItem.share_list.wx.desc) : ''}}</p>
                    </div>
                    <div class="music-list-item-cover">
                        <div class="music-list-item-cover-background"></div>
                        <div class="music-list-item-cover-img">
                            <img :src="musicItem.img_url" alt="" class="music-list-item-img">
                        </div>
                        <img src="http://image.wufazhuce.com/play_btn_empty.png" alt="" class="music-list-item-play-btn">
                        <img src="http://image.wufazhuce.com/music_copyright_1.png" width="100%" class="music-list-item-platform-icon">
                    </div>
                    <div class="music-list-item-content">
                        <p class="music-list-item-music__desc">{{ musicItem.author.user_name }} | {{ musicItem.subtitle }}</p>
                        <p class="music-list-item-content-title">{{ musicItem.forward }}</p>
                        <p class="music-list-item-content-date">{{ $utils.formatDate(musicItem.post_date) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      mescroll: null,
      musicList: [
      ],
    };
  },
  mounted() {
      const self = this;
      self.mescroll = new MeScroll("mescroll", {
          up: {
            callback: self.upCallback,
            toTop: {
                  src: '/static/img/mescroll-totop.png',
                  offset: 1000
            },
            empty: {
                wrapId: 'dataList',
                tip: '暂无数据'
            },
            clearEmptyId: "dataList", //相当于同时设置了clearId和empty.warpId; 简化写法;
          }
      });
      //禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
	  document.ondragstart = self.ondragstart;
  },
  methods: {
      upCallback(page) {
        const self = this;
        self.getListDataFromNet(page.num, page.size, (curPageData) => {
            // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
            console.log('curPageData',curPageData); 
            //如果是第一页需手动置空列表
            // if(page.num == 1) self.musicList = [];
            //更新列表数据
            self.musicList = self.musicList.concat(curPageData);
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.musicList.length==" + self.musicList.length);
            
            self.mescroll.endSuccess(curPageData.length);
        
        }, () => {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            self.mescroll.endErr();
        });
      },
      getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
        const musicList = this.musicList;
        //请求首页的时候不加id，以后分页请求加上最后一条的id
        let url = '/api/v1/music';
        if(musicList.length > 0) {
            url = url + '/' + musicList[musicList.length - 1].id
        }
        this.axios.get(url).then((res) => {
            if(res.data && res.data.data) {
                successCallback && successCallback(res.data.data);//成功回调
            } 
        })
      },
      ondragstart() {
          return false;
      }
  }
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
    .music-list-tag {
        text-align: center;
        font-size: .32rem;
        color: #676f6f;
        line-height: .666667rem;
        padding: .266667rem 0 .4rem;
    }
    .music-list-item {
        background: #fff;
        margin-bottom: .213333rem;
    }
    .music-list-item-title {
        font-size: .533333rem;
        font-weight: 500;
        line-height: 1.5;
        padding: 0 .533333rem;
    }
    .music-list-item-title__desc {
        font-size: .426667rem;
        color: #676f6f;
        line-height: 2;
        padding: .133333rem 0;
        font-weight: normal;
    }
    .music-list-item-cover {
        position: relative;
        margin: .266667rem 0;
        width: 100%;
        height: 6.453333rem;
        background: url(http://image.wufazhuce.com/music-list-right.png) no-repeat center right;
        background-size: auto 100%; 
    }
    .music-list-item-cover-background {
        position: absolute;
        left: 0;
        top: 0;
        width: 7.973333rem;
        height: 6.506667rem;
        box-shadow: 0 0 .266667rem .053333rem rgba(230, 230, 230, 0.5);
        border-radius: 0 4.224rem 4.266667rem 0;
    }
    .music-list-item-cover-img {
        position: absolute;
        width: 6.026667rem;
        height: 6.026667rem;
        overflow: hidden;
        background-size: cover;
        background-image: url(http://image.wufazhuce.com/music-list-paceholder.png);
        border-radius: 50%;
        top: .213333rem;
        left: 1.733333rem;
    }
    .music-list-item-img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
    .music-list-item-play-btn {
        display: block;
        width: 1.173333rem;
        height: 1.173333rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .music-list-item-platform-icon {
        position: absolute;
        width: .64rem;
        height: .64rem;
        left: .533333rem;
        bottom: .213333rem;
    }
    .music-list-item-content {
        padding: 0 .533333rem;
        color: #676f6f;
    }
    .music-list-item-music__desc {
        font-size: .32rem;
        padding: .32rem 0 0 0;
    }
    .music-list-item-content-title {
        font-size: .373333rem;
        line-height: .666667rem;
        padding: .266667rem 0;
    }
    .music-list-item-content-date {
        font-size: .32rem;
        padding: .266667rem 0 .8rem 0;
    }
</style>