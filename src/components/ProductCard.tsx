import React from "react";

import { Product } from "./ProductList";
import { Card, Tag } from "antd";

type ProductCardType = {
  item?: Product;
};

const ProductCard = ({ item }: ProductCardType) => {
  return (
    <Card title={item?.name} bordered={false}>
      ID: {item?.id}
      <br />
      Year: {item?.year}
      <br />
      Pantone Value: {item?.pantone_value}
      <br />
      Color: <Tag color={item?.color}>{item?.color}</Tag>
    </Card>
  );
};

export default ProductCard;
