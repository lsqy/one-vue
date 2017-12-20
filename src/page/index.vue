<template>
  <div class="one-index-page">
     <div class="one-index-item" v-for="contentItem in contentList" :key="contentItem.id" @click="goDetail(contentItem.category, contentItem.item_id)">
          <!--摄影-->
          <template v-if="contentItem.category == '0'">
            <photo-item :contentItem="contentItem" />
          </template>
          <!--文章/ONE STORY 连载 影视 问答-->
          <template v-if="contentItem.category == '1' || contentItem.category == '2' || contentItem.category == '3'  || contentItem.category == '5' ">
            <index-item :contentItem="contentItem" />
          </template>      
          <!--音乐-->
          <template v-if="contentItem.category == '4'">
            <music-item :contentItem="contentItem" />
          </template>       
          <!--广告-->
          <template v-if="contentItem.category == '6'">
            <a :href="contentItem.ad_linkurl" target="_blank">
              <img :src="contentItem.img_url" alt="advertising" class="one-index-item-img__advertising">
            </a>
          </template>    
          <!--文章-->
          <template v-if="contentItem.category == '60'">
            <p class="one-index-item-tag">— {{ contentItem.share_list.wx ? contentItem.share_list.wx.title.split(' ')[0] : 'ONE STORY' }} —</p>
            <div class="one-index-item-title spec">
              <p class="one-index-item-title-name">{{ contentItem.title }}</p>
              <p class="one-index-item-title-author">{{ contentItem.share_list.wx ? contentItem.share_list.wx.desc.split(' ')[0] : '' }}</p>
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
import PhotoItem from '@/components/PhotoItem';
import IndexItem from '@/components/IndexItem';
import MusicItem from '@/components/MusicItem';

export default {
  name: 'index',
  data() {
    return {
      contentList: [],
    };
  },
  components: {
    'photo-item': PhotoItem,
    'index-item': IndexItem,
    'music-item': MusicItem,
  },
  mounted() {
    const self = this;
    const listSingleUrl = `${this.$_config.apiBaseURL}/onelist`;
    self.axios.get(listSingleUrl).then((res) => {
      console.log('content_list', res.data.data.content_list);
      self.contentList = res.data.data.content_list;
    }, () => {

    });
  },
  methods: {
    goDetail(category, itemId) {
      switch (category) {
        // - 0 代表摄影/插画
        // - 1 代表文章/ONE STORY
        // - 2 代表连载
        // - 3 代表问答
        // - 4 代表音乐
        // - 5 代表电影/影视
        // - 6 广告
        case '1':
          this.$router.push({
            name: 'ReadingDetail',
            params: {
              id: itemId,
            },
          });
          break;
        case '2':
          this.$router.push({
            name: 'SerialDetail',
            params: {
              id: itemId,
            },
          });
          break;
        case '3':
          this.$router.push({
            name: 'QuestionDetail',
            params: {
              id: itemId,
            },
          });
          break;
        case '4':
          this.$router.push({
            name: 'MusicDetail',
            params: {
              id: itemId,
            },
          });
          break;
        case '5':
          this.$router.push({
            name: 'MovieDetail',
            params: {
              id: itemId,
            },
          });
          break;
        default:
          console.log(10);
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
    .one-index-item-img__advertising {
      display: block;
      width: 100%;
      height: auto;
      margin-bottom: .213333rem;
    }
  }
</style>