import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();
  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      setServerError(undefined);
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (response?.status === 200) {
        router.replace(
          (router.query?.callbackUrl as string) || '/'
        );
        return;
      }
      setServerError(
        response?.error || 'Login failed, please try again'
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='grid h-screen place-items-center'>
      <Form
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: '30%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400' />
        </Form.Item>

        {serverError?.trim() && (
          <div className='ant-form-item-explain ant-form-item-explain-connected css-dev-only-do-not-override-snbxjq'>
            <div className='ant-form-item-explain-error text-red-500'>
              Please input your password!
            </div>
          </div>
        )}

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            className='w-full'
            htmlType='submit'
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
