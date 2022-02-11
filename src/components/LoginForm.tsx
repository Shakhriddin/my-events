import React, {ChangeEventHandler, FC, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {rules} from '../utils/rules';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';

const LoginForm: FC = (): JSX.Element => {
  const {logIn} = useActions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, error} = useTypedSelector(state => state.auth);

  const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    logIn(username, password);
  };

  return (
    <Form
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      initialValues={{remember: true}}
      autoComplete='off'
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[rules.required('Please input your username!')]}
      >
        <Input
          value={username}
          onChange={handleUsernameChange}
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username' />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[rules.required('Please input your password!')]}
      >
        <Input
          value={password}
          onChange={handlePasswordChange}
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      {
        error && (
          <div className='login__error'>
            {error}
          </div>)
      }

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
