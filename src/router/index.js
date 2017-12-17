import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index';
import Music from '@/page/Music';
import MusicDetail from '@/page/MusicDetail';
import Reading from '@/page/reading';

Vue.use(Router);

export default new Router({
  mode: 'history', // h5History模式
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
    },
    {
      path: '/music/:id',
      name: 'MusicDetail',
      component: MusicDetail,
    },
    {
      path: '/reading',
      name: 'Reading',
      component: Reading,
    },
  ],
});
