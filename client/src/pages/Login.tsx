import React from "react";
import { Button, Form, Input } from "antd";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { updateLoginStatus } from "../store/loginStatus.slice";
import { useDispatch } from "react-redux";

const onFinish = async (loginMutation: Function, navigate: Function, dispatch: Function, values: any) => {
  const {status, token} = await loginMutation(values)
  if((status === 0) && token) {
    localStorage.setItem("token", token)
    dispatch(updateLoginStatus(true))
    navigate("/")
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const { mutateAsync: loginMutation, status, reset } = useLogin();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish.bind(null, loginMutation, navigate, dispatch)}
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
