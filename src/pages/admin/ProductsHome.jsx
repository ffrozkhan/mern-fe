import React, { useState, useEffect } from "react";
import "./ProductsStyle.css";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Chip from "@mui/material/Chip";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function EditToolbar(props) {
  const { setValue } = props;

  const handleClick = () => {
    setValue(1);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const ProductsHome = ({ setValue }) => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  console.log(selectedProduct);

  const handleEditClick = (id, row) => () => {
    setOpen(true);
    setSelectedProduct({
      ...row,
      category: row.category._id,
      image: `http://localhost:2000/api/v1/products/product-photo/${row._id}`,
    });
  };

  const handleSaveClick = (id) => () => {};

  const handleDeleteClick = (id) => () => {
    console.log(id);
  };

  const columns = [
    {
      field: "title",
      headerName: "Product Name",
      width: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
    },

    {
      field: "description",
      headerName: "Description",
      width: 180,
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
      renderCell: (params) => params.row.category.name,
    },
    {
      field: "image",
      headerName: "Product Image",
      width: 180,
      renderCell: (params) => (
        <div className="photoMainContainer">
          <Chip label="View Image" />{" "}
          <div className="photoContainer">
            <img
              className="product-image"
              src={`http://localhost:2000/api/v1/products/product-photo/${params.row._id}`}
              alt=""
            />
          </div>
        </div>
      ),
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const getAllProducts = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/products/allProducts`
    );
    const allProducts = response.data.products.map((item) => {
      item.id = item._id;
      return item;
    });
    setProducts(allProducts);
  };

  const getProductCategories = async () => {
    const response = await axios.get(
      `http://localhost:2000/api/v1/category/all-categories`
    );
    const allCategories = response.data.categories.map((item) => ({
      ...item,
      id: item._id,
    }));
    setCategoryOptions(allCategories);
    // console.log(allCategories);
  };
  const onSubmitProduct = (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const formDataObject = Object.fromEntries(formData.entries());
    const response = axios({
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: `http://localhost:2000/api/v1/products/edit-product/${selectedProduct._id}`,
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
  useEffect(() => {
    getAllProducts();
    getProductCategories();
  }, []);
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={products}
        columns={columns}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setValue },
        }}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Edit - ${selectedProduct.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
                        defaultValue={selectedProduct.title}
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
                        defaultValue={selectedProduct.price}
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
                        defaultValue={selectedProduct.description}
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
                        defaultValue={selectedProduct.category}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            category: e.target.value,
                          })
                        }
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
                          setSelectedProduct({
                            ...selectedProduct,
                            image: URL.createObjectURL(e.target.files[0]),
                          });
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
                <img src={selectedProduct.image} alt="" />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsHome;
