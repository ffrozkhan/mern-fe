import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Admin.css";
import CategoryTable from "./CategoryTable";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const menus = [
  { name: "Category", pathName: "/dashboard/admin/controls", id: 1 },
  { name: "Products", pathName: "/dashboard/admin/controls/products", id: 2 },
  { name: "Users", pathName: "/dashboard/admin/users", id: 3 },
  { name: "Items", pathName: "/dashboard/admin/items", id: 4 },
];

const AdminControls = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProductCategories = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/category/all-categories`
    );
    const allCategories = response.data.categories.map((item) => ({
      ...item,
      id: item._id,
    }));
    setCategories(allCategories);
    // console.log(allCategories);
  };
  useEffect(() => {
    getProductCategories();
  }, []);
  return (
    <div className="controlsParent">
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
      <div className="mainMenu">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Categories" {...a11yProps(0)} />
              <Tab label="Add New" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <CategoryTable categories={categories} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Two
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default AdminControls;
