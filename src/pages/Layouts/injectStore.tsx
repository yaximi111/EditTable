import React from 'react';
import { Provider } from 'mobx-react';
import stores from '../stores'
const Layout: React.FC = ({ children }) => {

  return <Provider {...stores}>{children}</Provider>
};

export default Layout;
