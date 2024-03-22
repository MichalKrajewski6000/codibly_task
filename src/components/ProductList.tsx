import React, { useEffect, useState } from "react";
import { Table, Spin, Modal, InputNumber, Input } from "antd";
import type { TableProps } from "antd";
import ProductStore from "../utilities/ProductStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Alert } from "@mui/material";

export type Product = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

type ColumnsType<T extends object> = TableProps<T>["columns"];
const columns: ColumnsType<Product> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
];
const ProductList = () => {
  const [error, setError] = useState(null);
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const page = params.get("page");
  const id = params.get("id");

  const { totalCount, allProducts } = ProductStore;

  const [isVisible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    ProductStore.getProducts(page, id).catch((err: any) => {
      setError(err.message);
    });
  }, []);

  const pageChangeHandler = (e: any) => {
    window.location.href = `/products?page=${e.current}`;
  };

  const filterHandler = () => {
    if (selectedId) window.location.href = `/products?id=${selectedId}`;
    else window.location.href = `/products/?page=1`;
  };

  const changeNumberHandler = (value: number | null) => {
    setSelectedId(value ? value : 0);
  };

  if (ProductStore.isLoading) return <Spin />;

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <InputNumber
        min={1}
        controls={false}
        placeholder="Filter ID"
        type="number"
        style={{
          width: "10vw",
          marginLeft: "10vw",
        }}
        onChange={changeNumberHandler}
        onPressEnter={filterHandler}
      />
      <Table
        style={{
          marginLeft: "10vw",
          marginRight: "10vw",
        }}
        dataSource={allProducts}
        pagination={{
          current: parseInt(page as string) ? parseInt(page as string) : 1,
          pageSize: 5,
          position: ["bottomRight"],
          total: totalCount,
        }}
        onChange={pageChangeHandler}
        columns={columns}
        rowKey={(record) => {
          return record.id;
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setVisible(true);
              ProductStore.getProductById(record.id).catch((err: any) => {
                setError(err.message);
              });
            },
            style: {
              backgroundColor: record.color,
            },
          };
        }}
      />
      <Modal open={isVisible} onCancel={() => setVisible(false)} footer={null}>
        <ProductCard item={ProductStore.currentProduct} />
      </Modal>
    </>
  );
};

export default observer(ProductList);
