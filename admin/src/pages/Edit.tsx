import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  useGetPropertyByIdQuery,
  useUpdatePropertyMutation,
} from "../store/propertyApiSlice";

const Edit: React.FC = () => {
  const { id } = useParams();
  const {
    data: property,
    isError,
    error,
    isLoading,
  } = useGetPropertyByIdQuery(id!);
  const [update, { isLoading: updateLoading }] = useUpdatePropertyMutation();
  const [form] = Form.useForm();
  const [showInfo, setShowInfo] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async (values: any) => {
    await update(values);
    form.setFieldsValue(values);
    setShowInfo(true);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowInfo(false);
  };
  
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (isLoading || updateLoading) {
    return <Spin />;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      {showInfo && (
        <Alert
          message="Update successful!"
          type="success"
          closable={true}
          onClose={onClose}
        ></Alert>
      )}
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={property?.data}
      >
        <Form.Item
          name={["id"]}
          label="ID"
          hidden={true}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["address"]}
          label="Address"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["city"]} label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={["area"]}
          label="Area"
          rules={[{ required: true, type: "number", min: 0, max: 9999 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["bedroom"]}
          label="Bedroom"
          rules={[{ required: true, type: "number", min: 0, max: 9 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["bathroom"]}
          label="bathroom"
          rules={[{ required: true, type: "number", min: 0, max: 9 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["carpark"]}
          label="Carpark"
          rules={[{ required: true, type: "number", min: 0, max: 9 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["postcode"]}
          label="postcode"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["price"]}
          label="Price"
          rules={[{ required: true, type: "number", min: 0, max: 99999999 }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name={["description"]}
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea maxLength={100} />
        </Form.Item>
        <Form.Item name={["state"]} label="State" rules={[{ required: true }]}>
          <Select placeholder="Please select a state">
            <Select.Option value="VIC">VIC</Select.Option>
            <Select.Option value="NSW">NSW</Select.Option>
            <Select.Option value="QLD">QLD</Select.Option>
            <Select.Option value="WA">WA</Select.Option>
            <Select.Option value="SA">SA</Select.Option>
            <Select.Option value="TAS">TAS</Select.Option>
            <Select.Option value="ACT">ACT</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={["status"]}
          label="Status"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a status">
            <Select.Option value="FORSALE">FORSALE</Select.Option>
            <Select.Option value="RENT">RENT</Select.Option>
            <Select.Option value="SOLD">SOLD</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="http://192.168.56.101:3001/property/upload" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
