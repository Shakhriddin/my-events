import React, {FC, useLayoutEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../router';
import {Layout} from 'antd';
import '../styles/App.scss';
import AppHeader from './AppHeader';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import {IUser} from '../models/IUser';
import {storage} from '../utils/storage';

const App: FC = (): JSX.Element => {
  const {Content, Footer} = Layout;
  const {isAuth} = useTypedSelector(state => state.auth);
  const routing = useRoutes(isAuth ? privateRoutes : publicRoutes);
  const {setIsAuth, setUser} = useActions();

  useLayoutEffect(() => {
    if (storage('user')) {
      const {auth, username} = storage('user');

      setIsAuth(auth);
      setUser({username} as IUser);
    }
  }, []);

  return (
    <Layout className='app layout'>

      <AppHeader />

      <Content>
        {routing}
      </Content>

      <Footer className='footer'>
        All rights reserved 2022&copy;
      </Footer>
    </Layout>
  );
};

export default App;
