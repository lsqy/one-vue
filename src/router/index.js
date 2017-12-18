import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index';
import Music from '@/page/music';
import MusicDetail from '@/page/musicDetail';
import Reading from '@/page/reading';
import Movie from '@/page/movie';
import MovieDetail from '@/page/movieDetail';

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
    {
      path: '/movie',
      name: 'Movie',
      component: Movie,
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail,
    },
  ],
});
