<template>
  <div class="c-author-item">
      <p>作者</p>
      <hr class="c-author-item-separate-line">
      <div class="c-author-item-detail">
          <img :src="authorInfo.web_url" alt="">
          <div class="c-author-item-detail-info">
              <p>{{ authorInfo.user_name }}</p>
              <p class="c-author-item-detail-desc">{{ authorInfo.desc }}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoItem',
  props: {
    authorInfo: {
      type: Object,
      default() {
        return {

        };
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
  .c-author-item  {
      font-size: .4rem;
      margin: .533333rem;
      .c-author-item-separate-line {
          border: .053333rem solid #000;
          margin: .386667rem 0;
          width: 1.866667rem;
      }
      .c-author-item-detail {
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
          .c-author-item-detail-info {
              flex: 1;
          }
          .c-author-item-detail-desc {
              color: #808080;
              font-size: .266667rem;
          }
      }
  }
</style>
