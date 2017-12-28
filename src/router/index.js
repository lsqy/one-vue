import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index';
import Music from '@/page/music';
import MusicDetail from '@/page/musicDetail';
import Reading from '@/page/reading';
import ReadingDetail from '@/page/readingDetail';
import QuestionDetail from '@/page/questionDetail';
import SerialDetail from '@/page/serialDetail';
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
      path: '/reading/:id',
      name: 'ReadingDetail',
      component: ReadingDetail,
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
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
    },
    {
      path: '/serial/:id',
      name: 'SerialDetail',
      component: SerialDetail,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from);
    console.log('savedPosition', savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
