// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'E:/code/mobx/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "name": "login",
    "path": "/login",
    "component": require('E:/code/mobx/src/pages/Login').default,
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/login",
    "exact": true
  },
  {
    "path": "/home",
    "component": require('@/pages/Layouts').default,
    "routes": [
      {
        "name": "home",
        "path": "/home",
        "component": require('@/pages/home').default,
        "exact": true
      },
      {
        "name": "one",
        "path": "/home/home/one",
        "component": require('@/pages/page/one').default,
        "exact": true
      },
      {
        "name": "two",
        "path": "/home/home/two",
        "component": require('@/pages/page/two').default,
        "exact": true
      },
      {
        "name": "ListForm",
        "path": "/home/home/ListForm",
        "component": require('@/pages/page/ListForm').default,
        "exact": true
      },
      {
        "name": "ListForm",
        "path": "/home/home/Three",
        "component": require('@/pages/page/Three').default,
        "exact": true
      },
      {
        "name": "Four",
        "path": "/home/home/Four",
        "component": require('@/pages/page/Four').default,
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
