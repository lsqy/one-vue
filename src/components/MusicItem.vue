<template>
  <div class="c-music-item">
      <div class="c-music-item-tag">- <span>音乐</span> -</div>
      <div class="c-music-item-title">
          <p>{{ contentItem.title }}</p>
          <p class="c-music-item-title__desc">{{ (contentItem.share_list.wx && contentItem.share_list.wx.desc) ? $_utils.getAuthor(contentItem.share_list.wx.desc) : ''}}</p>
      </div>
      <div class="c-music-item-cover">
          <div class="c-music-item-cover-background"></div>
          <div class="c-music-item-cover-img">
              <img :src="contentItem.img_url" alt="" class="c-music-item-img">
          </div>
          <img src="http://image.wufazhuce.com/play_btn_empty.png" alt="" class="c-music-item-play-btn">
          <img src="http://image.wufazhuce.com/music_copyright_1.png" width="100%" class="c-music-item-platform-icon">
      </div>
      <div class="c-music-item-content">
          <p class="c-music-item-music__desc">{{ contentItem.author.user_name }} | {{ contentItem.subtitle }}</p>
          <p class="c-music-item-content-title">{{ contentItem.forward }}</p>
          <p class="c-music-item-content-date">{{ contentItem.post_date ? $_utils.formatDate(contentItem.post_date) : '' }}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MusicItem',
  props: {
    contentItem: {
      type: Object,
      default() {
        return {
            author: {},
            share_list: {
                wx: {

                },
            },
        }
      },
    },
  },
  data() {
    return {
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .c-music-item {
    background: #fff;
    margin-bottom: .213333rem;
    .c-music-item-tag {
      text-align: center;
      font-size: .32rem;
      color: #676f6f;
      line-height: .666667rem;
      padding: .266667rem 0 .4rem;
    }  
    .c-music-item-title {
        font-size: .533333rem;
        font-weight: 500;
        line-height: 1.5;
        padding: 0 .533333rem;
    }
    .c-music-item-title__desc {
        font-size: .373333rem;
        color: #676f6f;
        line-height: 2;
        padding: .133333rem 0;
        font-weight: normal;
    }
    .c-music-item-cover {
        position: relative;
        margin: .266667rem 0;
        width: 100%;
        height: 6.453333rem;
        background: url(http://image.wufazhuce.com/music-list-right.png) no-repeat center right;
        background-size: auto 100%; 
    }
    .c-music-item-cover-background {
        position: absolute;
        left: 0;
        top: 0;
        width: 7.973333rem;
        height: 6.506667rem;
        box-shadow: 0 0 .266667rem .053333rem rgba(230, 230, 230, 0.5);
        border-radius: 0 4.224rem 4.266667rem 0;
    }
    .c-music-item-cover-img {
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
    .c-music-item-img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
    .c-music-item-play-btn {
        display: block;
        width: 1.173333rem;
        height: 1.173333rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .c-music-item-platform-icon {
        position: absolute;
        width: .64rem;
        height: .64rem;
        left: .533333rem;
        bottom: .213333rem;
    }
    .c-music-item-content {
        padding: 0 .533333rem;
        color: #676f6f;
    }
    .c-music-item-music__desc {
        font-size: .32rem;
        padding: .32rem 0 0 0;
    }
    .c-music-item-content-title {
        font-size: .373333rem;
        line-height: .666667rem;
        padding: .266667rem 0;
    }
    .c-music-item-content-date {
        font-size: .32rem;
        padding: .266667rem 0 .8rem 0;
    }
  }
</style>
