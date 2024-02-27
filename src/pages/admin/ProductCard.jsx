import React from "react";
import Rating from "@mui/material/Rating";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./Card.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const ProductCard = ({ item, beingUsed }) => {
  return (
    <div className="cardParent">
      <div className="image">
        <img
          src={`http://localhost:2000/api/v1/products/product-photo/${item._id}`}
          alt=""
        />
      </div>
      <div className="description">
        <h2>{item.title.slice(0, 15) + ".."}</h2>
        {/* <Rating
          name="read-only"
          value={item.rating.rate}
          readOnly
          precision={0.1}
        /> */}
      </div>
      <div className="price">
        <div>
          <b>$ {item.price}</b>
        </div>
        <div>
          {beingUsed === "home" ? (
            <AddShoppingCartIcon />
          ) : (
            <DeleteRoundedIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
