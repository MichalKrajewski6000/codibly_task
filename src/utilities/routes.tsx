import React from "react";
import ProductList from "../components/ProductList";
import { Navigate } from "react-router-dom";
// import ProductCard from "../components/ProductCard";

const routes = [
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/",
    element: <Navigate to="/products?page=1" />,
  },
  {
    path: "*",
    element: <Navigate to="/products?page=1" />,
  },
];

export default routes;
