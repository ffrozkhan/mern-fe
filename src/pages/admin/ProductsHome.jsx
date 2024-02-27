import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsHome = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/products/allProducts`
    );
    setProducts(response.data.products);
    // console.log(response.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      {products &&
        products.map((item, index) => {
          return <ProductCard item={item} key={index} />;
        })}
    </div>
  );
};

export default ProductsHome;
