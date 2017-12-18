<template>
  <div class="c-index-item">
    <p class="c-index-item-tag">— {{ (contentItem.share_list.wx && contentItem.share_list.wx.title.split(' ')[0] != 'ONE') ? contentItem.share_list.wx.title.split(' ')[0] : 'ONE STORY' }} —</p>
    <div class="c-index-item-title">
      <p class="c-index-item-title-name">{{ contentItem.title }}</p>
      <p class="c-index-item-title-author">{{ contentItem.share_list.wx ? contentItem.share_list.wx.desc.split(' ')[0] : '' }}</p>
    </div> 
    <div class="c-index-item-img">
      <img :src="contentItem.img_url" alt="">
    </div>
    <p class="c-index-item-content">{{ contentItem.forward }}</p>
    <template v-if="contentItem.subtitle != ''">
      <div class="c-index-item-footer">
        <span class="c-index-item-subtitle">{{ contentItem.subtitle ? '—关于《' + contentItem.subtitle.split('电影:')[1] + '》': '' }}</span>
        <span class="c-index-item-content-date-spec">{{ $_utils.formatDate(contentItem.post_date) }}</span>
      </div>
    </template>
    <template v-else>
      <p class="c-index-item-content-date">{{ $_utils.formatDate(contentItem.post_date) }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'IndexItem',
  props: {
    contentItem: {
      type: Object,
      default: {
        share_list: {
          wx: {

          },
        },
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    formatDate(date) {
      return date.split(' ')[0].split('-').join(' / ');
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .c-index-item {
    background-color: #fff;
    padding: 0 .533333rem .666667rem .533333rem;
    margin-bottom: .213333rem;
    .c-index-item-tag {
      text-align: center;
      line-height: .666667rem;
      font-size: .32rem;
      padding: .266667rem 0 0 0;
      color: rgba(0,0,0,.6);
    }
    .c-index-item-title {
      .c-index-item-title-name {
        color: #323232;
        font-size: .533333rem;
        line-height: .586667rem;
        text-align: left;
        padding-top: .426667rem;
        padding-bottom: .426667rem;
        font-family: 'Courier New';
      }
      .c-index-item-title-author {
        font-size: .373333rem;
        color: #808080;
      }
    }
    .c-index-item-img {
      position: relative;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        margin: .4rem 0;
      }
    }
    .c-index-item-content {
      color: #000000;
      opacity: 0.6;
      font-size: .373333rem;
      line-height: .693333rem;
      margin: 0;
    }
    .c-index-item-footer {
      overflow: hidden;
      line-height: .693333rem;
      margin-top: .533333rem;
    }
    .c-index-item-content-date-spec {
      float: left;
      font-size: .32rem; 
    }
    .c-index-item-subtitle {
      color: #000000;
      opacity: 0.6;
      font-size: .373333rem;
      float: right;
    }
    .c-index-item-content-date {
      font-size: .32rem;
      margin-top: .533333rem;
    }
  }
</style>
