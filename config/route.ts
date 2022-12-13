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
      {
        name: 'Four',
        path: 'home/queryConfig',
        component: '@/pages/page/QueryConfig',
      },
      {
        name: 'Retrieval',
        path: 'home/Retrieval',
        component: '@/pages/page/Retrieval',
      },
      {
        name: 'FormListNested',
        path: 'home/formListNested',
        component: '@/pages/page/FormListNested',
      },
    ],
  },
];
