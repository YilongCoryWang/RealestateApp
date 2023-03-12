import React from "react";
import { Button, Form, Input } from "antd";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const onFinish = async (loginMutation: Function, navigate: Function, values: any) => {
  const {status, token} = await loginMutation(values)
  if((status === 0) && token) {
    localStorage.setItem("token", token)
    navigate("/")
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type LoginProps = {
  submitHandler?: (values: any)=>void
}

const Login: React.FC<LoginProps> = (props) => {
  const { mutateAsync: loginMutation, status, reset } = useLogin();
  const navigate = useNavigate()

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={props.submitHandler ? props.submitHandler : onFinish.bind(null, loginMutation, navigate)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Login form">
        <span className="ant-form-text">Welcome back!</span>
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
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
