<template>
  <div class="c-comment-list-item">
    <img :src="info.user.web_url" alt="">
    <div class="c-comment-list-item-info">
      <p class="c-comment-list-item-info-top">
        <span>{{ info.user.user_name }}</span> 
        <span class="c-comment-list-item-info-date">{{ info.updated_at }}</span>
      </p>
      <p class="c-comment-list-item-info-content">{{ info.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentListItem',
  props: {
    info: {
      type: Object,
      default: {
        user: {},
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
    .c-comment-list-item {
      display: flex;
      border-bottom: .026667rem solid #eee;
      padding: .266667rem 0 .533333rem 0;
      img {
        width: .533333rem;
        height: .533333rem;
        border-radius: 50%;
        margin-right: .133333rem;
        position: relative;
        top: -2px;
      }
      .c-comment-list-item-info {
        flex: 1;
        .c-comment-list-item-info-top {
          font-size: .32rem;
          color: #808080;
          .c-comment-list-item-info-date {
            float: right;
          }
        }
        .c-comment-list-item-info-content {
           line-height: .666667rem;
           margin-top: .4rem;
           font-size: .32rem;
        }
      }
    }
  // }

</style>
