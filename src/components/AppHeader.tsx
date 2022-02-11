import React, {FC} from 'react';
import {Layout, Menu, Row} from 'antd';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const AppHeader: FC = (): JSX.Element => {
  const {isAuth, user} = useTypedSelector(state => state.auth);
  const {logOut} = useActions();

  return (
    <Layout.Header className='header'>
      <Row justify='space-between'>
        {isAuth
          ?
          <>
            <div className='header__user'>
              {user.username || 'User'}
            </div>
            <Menu
              theme='dark'
              mode='horizontal'
              selectable={false}
            >
              <Menu.Item
                key={1}
                onClick={logOut}
              >
                Log out
              </Menu.Item>
            </Menu>
          </>
          :
          <Menu
            theme='dark'
            mode='horizontal'
            selectable={false}
          >
            <Menu.Item key={1}>
              Log in
            </Menu.Item>
          </Menu>
        }
      </Row>
    </Layout.Header>
  );
};

export default AppHeader;
