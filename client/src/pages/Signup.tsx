import React from "react";
import { Button, Form, Input } from "antd";
import useSignup from "../hooks/useSignup";

const onFinish = async (signupMutation: any, values: any) => {
  await signupMutation(values)
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const { mutateAsync: signupMutation, status, reset } = useSignup();

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish.bind(null, signupMutation)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Signup form">
        <span className="ant-form-text">Welcome to Realestate App!</span>
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
