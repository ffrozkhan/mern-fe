import React, { useState, useEffect } from "react";
import "./ProductsStyle.css";
import axios from "axios";

const AddProduct = ({ setValue }) => {
  const [previewSrc, setPreviewSrc] = useState("https://images.unsplash.com/photo-1585144860106-998ca0f2922a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9ubGluZSUyMHNob3BwaW5nfGVufDB8fDB8fHww");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelcetedCategory] = useState("");

  const onSubmitProduct = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const formDataObject = Object.fromEntries(formData.entries());
    const response = axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "http://localhost:2000/api/v1/products/new-product",
      data: { ...formDataObject, price: parseInt(formDataObject.price) },
    })
      .then(() => {
        setValue(0);
        alert("New Product Added");
      })
      .catch(() => {
        alert("Request Failed");
      });
  };

  const getCategoryOptions = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/category/all-categories`
    );
    setCategoryOptions(response.data.categories);
  };
  useEffect(() => {
    getCategoryOptions();
  }, []);
  console.log(categoryOptions);

  return (
    <div className="productsContainer">
      <div className="formContainer">
        <form onSubmit={onSubmitProduct}>
          <div className="fieldContainer">
            <div className="labelDiv">
              <label htmlFor="title">Product Title</label>
            </div>
            <div className="inputDiv">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title.."
              />
            </div>
          </div>
          <div className="fieldContainer">
            <div className="labelDiv">
              <label htmlFor="price">Price</label>
            </div>
            <div className="inputDiv">
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Price.."
              />
            </div>
          </div>
          <div className="fieldContainer">
            <div className="labelDiv">
              <label htmlFor="description">Description</label>
            </div>
            <div className="inputDiv">
              <textarea
                name="description"
                id="description"
                type="text"
                placeholder="Description.."
              />
            </div>
          </div>
          <div className="fieldContainer">
            <div className="labelDiv">
              <label htmlFor="category">Category</label>
            </div>
            <div className="inputDiv">
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelcetedCategory(e.target.value)}
              >
                <option value="">Select</option>
                {categoryOptions &&
                  categoryOptions.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="fieldContainer">
            <div className="labelDiv">
              <label htmlFor="image">Upload</label>
            </div>
            <div className="inputDiv">
              <input
                onChange={(e) => {
                  setPreviewSrc(URL.createObjectURL(e.target.files[0]));
                }}
                id="image"
                name="image"
                type="file"
                accept="image/jpeg"
              />
            </div>
          </div>
          <div className="submitContainer">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="imageContainer">
        <img src={previewSrc} alt="" />
      </div>
    </div>
  );
};

export default AddProduct;
