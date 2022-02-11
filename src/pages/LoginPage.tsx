import React, {FC} from 'react';
import {Card, Layout, Row} from 'antd';
import LoginForm from '../components/LoginForm';

const LoginPage: FC = (): JSX.Element => {

  return (
    <Layout>
      <Row
        justify='center'
        align='middle'
        className='login__row'
      >
        <Card
          bordered={false}
        >
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
};

export default LoginPage;