import React from "react";
import {
  useDeletePropertyMutation,
  useGetPropertiesQuery,
} from "../store/propertyApiSlice";
import { Button, Space, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Property } from "../models/perperty";
import { Link, useNavigate } from "react-router-dom";

const PropertyList: React.FC = () => {
  const {
    data: response,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetPropertiesQuery();
  const [deleteMutatioin, { isLoading: isDeleteLoading }] =
    useDeletePropertyMutation();
  const navigate = useNavigate();

  if (isLoading || isDeleteLoading) {
    return <Spin />;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  const deleteHandler = async (id: string) => {
    await deleteMutatioin(id);
    refetch();
  };

  const addHandler = () => {
    navigate("add");
  };

  const columns: ColumnsType<Property> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <Link to={`/edit/${text}`}>{text}</Link>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => <Link to={`/edit/${record.id}`}>{text}</Link>,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text, record) => <Link to={`/edit/${record.id}`}>{text}</Link>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Link to={`/edit/${record.id}`}>{text}</Link>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={deleteHandler.bind(null, record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={addHandler} style={{ position: "absolute", right: '20px' }}>
          Add new property
        </Button>
        <h1>Property List</h1>
      </div>
      <Table columns={columns} dataSource={response?.data} rowKey="id" />
    </>
  );
};

export default PropertyList;
