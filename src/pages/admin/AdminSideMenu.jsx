import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";

const menus = [
  { name: "Category", pathName: "/dashboard/admin/controls", id: 1 },
  { name: "Products", pathName: "/dashboard/admin/controls/products", id: 2 },
  { name: "Users", pathName: "/dashboard/admin/users", id: 3 },
  { name: "Items", pathName: "/dashboard/admin/items", id: 4 },
];
const AdminSideMenu = () => {
  return (
    <div className="sideMenu">
      {menus.map((item) => {
        return (
          <div key={item.id}>
            <h2 className="menuItem">
              <Link to={item.pathName}>{item.name}</Link>
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default AdminSideMenu;
