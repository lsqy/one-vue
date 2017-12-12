import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Music from '@/page/Music';
import MusicDetail from '@/page/MusicDetail';

Vue.use(Router);

export default new Router({
  mode: 'history', // h5History模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
  ],
});
