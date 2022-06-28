import React from 'react';
import { history } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import PV from './injectStore';
import Button from '@mui/material/Button';
import routes from '../../../config/route'

// const IconMap = {
//   smile: <SmileOutlined />,
//   heart: <HeartOutlined />,
// };

const defaultMenus = [
  {
    name: 'one',
    path: '/home',
    routes: [
      {
        name: 'one-one',
        path: 'home/one',
      },
      {
        name: 'one-two',
        path: 'home/two',
      },
      {
        name: 'ListForm',
        path: 'home/ListForm',
      },
      {
        name: 'Three',
        path: 'home/Three',
      },
      {
        name: 'four',
        path: 'home/four',
      },
    ],
  },
  
];

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

export default ({ children }: any) => (
  <PV>
   
    {history.location.pathname !== '/home/home/Three' ? (
      <ProLayout
        contentStyle={{ backgroundColor: 'white' }}
        title=""
        logo={
          <Button variant="contained" onClick={() => history.push('/home')}>
            Hello
          </Button>
        }
        style={{
          height: '100vh',
          backgroundColor: 'white',
        }}
        fixSiderbar
        location={{
          pathname: '/home',
        }}
        menu={{request:()=>loopMenuItem(defaultMenus)}}
        // menuRender={(props:any)=>{
        //   console.log('location',props.children.props.location)
        //   console.log(props.children.props.location.pathname!=='/home/home/Three')
        //   return true
        // }}
        menuItemRender={(item: any, dom) => (
          <div onClick={() => history.push(item.path)}>{dom}</div>
        )}
      >
        {children}
      </ProLayout>
    ) : (
      <> { children }</>
    )}
  </PV>
);
