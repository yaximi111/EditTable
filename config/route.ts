import { defineConfig } from 'umi';

export default [
  { name: 'login', path: '/login', component: './Login' },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: '@/pages/Layouts',
    routes: [
      { name: 'home', path: '/home', component: '@/pages/home' },
      {
        name: 'one',
        path: 'home/one',
        component: '@/pages/page/one',
      },
      {
        name: 'two',
        path: 'home/two',
        component: '@/pages/page/two',
      },
      {
        name: 'ListForm',
        path: 'home/ListForm',
        component: '@/pages/page/ListForm',
      },
      {
        name: 'ListForm',
        path: 'home/Three',
        component: '@/pages/page/Three',
      },
      {
        name: 'Four',
        path: 'home/Four',
        component: '@/pages/page/Four',
      },
    ],
  },
 
];
