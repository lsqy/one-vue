<template>
  <div class="one-index-page">
     <div class="one-index-item" v-for="contentItem in contentList" :key="contentItem.id" @click="goDetail(contentItem.category, contentItem.item_id)">
          <!--摄影-->
          <template v-if="contentItem.category == '0'">
            <div class="one-index-item-title">
              <p class="one-index-item-title-date">{{ formatDate(contentItem.post_date) }}</p>
              <p class="one-index-item-title-volume">{{ contentItem.volume }}</p> 
            </div>  
            <div class="one-index-item-img">
              <img :src="contentItem.img_url" alt="">
            </div>
            <p class="one-index-item-author">{{ contentItem.title }} | {{ contentItem.pic_info }}</p>
            <p class="one-index-item-content">{{ contentItem.forward }}</p>
            <p class="one-index-item-author">{{ contentItem.words_info }}</p>
          </template>
          <!--文章-->
          <template v-if="contentItem.category != '0'">
            <p class="one-index-item-tag">— {{ contentItem.share_list.wx.title ? contentItem.share_list.wx.title.split(' ')[0] : 'ONE STORY' }} —</p>
            <div class="one-index-item-title spec">
              <p class="one-index-item-title-name">{{ contentItem.title }}</p>
              <p class="one-index-item-title-author">{{ contentItem.share_list.wx.desc ? contentItem.share_list.wx.desc.split(' ')[0] : '' }}</p>
            </div> 
            <div class="one-index-item-img spec">
              <template v-if="contentItem.category == '4'">
                <img :src="contentItem.img_url" alt="" class="one-index-item-music-img">
                <img src="http://image.wufazhuce.com/music-detail-play.png" width="100%" class="play-btn">
                <img src="http://image.wufazhuce.com/music_copyright_1.png" width="100%" class="platform-icon">
              </template>
              <template v-else>
                <img :src="contentItem.img_url" alt="">
              </template>
            </div>
            <p class="one-index-item-content spec">{{ contentItem.forward }}</p>
            <p class="one-index-item-subtitle">{{ contentItem.subtitle ? '—' + contentItem.subtitle : '' }}</p>
          </template>
     </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      contentList: [],
    };
  },
  mounted() {
    const self = this;
    const idListUrl = `${this.$_config.apiBaseURL}/onelist/idlist`;
    // 首先获取首页前十条图文索引
    self.axios.get(idListUrl).then((res) => {
      if (res.data && res.data.data.length > 0) {
        const listSingleUrl = `${this.$_config.apiBaseURL}/onelist/${res.data.data[0]}/0`;
        // 通过上面获取的索引取第一个访问最新的一日
        self.axios.get(listSingleUrl).then((res2) => {
          self.contentList = res2.data.data.content_list;
        }, () => {

        });
      }
    }, () => {

    });
  },
  methods: {
    goDetail(category, itemId) {
      switch (category) {
        case '4':
          this.$router.push({
            name: 'MusicDetail',
            params: {
              id: itemId,
            },
          });
          break;
      }
    },
    formatDate(date) {
      return date.split(' ')[0].split('-').join(' / ');
    },
  },
  destroyed() {

  },
};
</script>

<style lang="scss" scoped>
  .one-index-page {
    background: #f6f6f6;
    .one-index-item {
      background-color: #fff;
      padding-bottom: .666667rem;
      margin-bottom: .213333rem;
      .one-index-item-tag {
        text-align: center;
        line-height: .666667rem;
        font-size: .32rem;
        padding: .266667rem 0 0 0;
        color: rgba(0,0,0,.6);
      }
      .one-index-item-title {
        margin: 0 .533333rem;
        &.spec {
          margin: 0 .533333rem;
        }
        .one-index-item-title-date {
          color: #000000;
          opacity: 0.6;
          font-size: .533333rem;
          line-height: .586667rem;
          text-align: center;
          padding-top: .426667rem;
          font-family: 'Courier New';
        }
        .one-index-item-title-name {
          color: #323232;
          font-size: .533333rem;
          line-height: .586667rem;
          text-align: left;
          padding-top: .426667rem;
          padding-bottom: .426667rem;
          font-family: 'Courier New';
        }
        .one-index-item-title-volume {
          margin-top: .106667rem;
          color: #808080;
          text-align: center;
          font-size: .266667rem;
          line-height: .373333rem;
        }
        .one-index-item-title-author {
          font-size: .373333rem;
          color: #808080;
        }
      }
      .one-index-item-img {
        position: relative;
        text-align: center;
        &.spec {
          margin: 0 .533333rem;
        }
        img {
          width: 100%;
          height: auto;
          margin: .4rem 0;
        }
        .one-index-item-music-img {
          width: 80%;
          border-radius: 50%;
        }
        .platform-icon {
          position: absolute;
          left: 0;
          bottom: .266667rem;
          width: .64rem;
          height: .64rem;
        }
        .play-btn {
          position: absolute;
          width: 1.333333rem;
          height: 1.333333rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          margin: 0;
        }
      }
      .one-index-item-author {
        text-align: center;
        color: #808080;
        font-size: .266667rem;
        line-height: .373333rem;
      }
      .one-index-item-content {
        color: #000000;
        opacity: 0.6;
        font-size: .373333rem;
        line-height: .693333rem;
        margin: .533333rem;
        margin-bottom: .48rem;
        &.spec {
          margin-top: 0;
        }
      }
      .one-index-item-subtitle {
        color: #000000;
        opacity: 0.6;
        font-size: .373333rem;
        line-height: .693333rem;
        text-align: right;
        margin-right: .666667rem;
      }
    }
  }
</style>