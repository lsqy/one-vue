<template>
  <div class="music-detail-page">
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
    <div class="music-detail-content" v-html="musicDetail.story">
    </div>
    <div class="music-detail-content-footer">
        <p>{{ musicDetail.charge_edt }}</p>
        <p>{{ musicDetail.copyright }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      musicDetail: {},
    };
  },
  mounted() {
    console.log(this.$route.params);
    const { id } = this.$route.params;
    this.getDetail(id);
  },
  methods: {
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

<style lang="scss" scoped>
  .music-detail-page {
    height: 100%;
    color: #323232;
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
        margin-top: .8rem;
        text-align: center;
        font-weight: bold;
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
            margin: 0 0 .533333rem 0;
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
        p {
            margin: .533333rem;
        }
    }
  }
</style>