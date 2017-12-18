<template>
  <div class="c-photo-item">
    <div class="c-photo-item-title">
      <p class="c-photo-item-title-date">{{ formatDate(contentItem.post_date) }}</p>
      <p class="c-photo-item-title-volume">{{ contentItem.volume }}</p> 
    </div>  
    <div class="c-photo-item-img">
      <img :src="contentItem.img_url" alt="">
    </div>
    <p class="c-photo-item-author">{{ contentItem.title }} | {{ contentItem.pic_info }}</p>
    <p class="c-photo-item-content">{{ contentItem.forward }}</p>
    <p class="c-photo-item-author">{{ contentItem.words_info }}</p>
  </div>
</template>

<script>
export default {
  name: 'PhotoItem',
  props: {
    contentItem: {
      type: Object,
      default: {
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
  .c-photo-item {
    background-color: #fff;
    padding-bottom: .666667rem;
    margin-bottom: .213333rem;
    .c-photo-item-title {
      margin: 0 .533333rem;
      .c-photo-item-title-date {
        color: #000000;
        opacity: 0.6;
        font-size: .533333rem;
        line-height: .586667rem;
        text-align: center;
        padding-top: .426667rem;
        font-family: 'Courier New';
      }
      .c-photo-item-title-volume {
        margin-top: .106667rem;
        color: #808080;
        text-align: center;
        font-size: .266667rem;
        line-height: .373333rem;
      }
    }
    .c-photo-item-img {
      position: relative;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        margin: .4rem 0;
      }
    }
    .c-photo-item-author {
      text-align: center;
      color: #808080;
      font-size: .266667rem;
      line-height: .373333rem;
    }
    .c-photo-item-content {
      color: #000000;
      opacity: 0.6;
      font-size: .373333rem;
      line-height: .693333rem;
      margin: .533333rem;
      margin-bottom: .48rem;
    }
  }
</style>
