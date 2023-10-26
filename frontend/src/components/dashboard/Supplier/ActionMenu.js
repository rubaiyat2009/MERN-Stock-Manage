import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import { Box, IconButton, ListItemButton, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomModal from "../../common/CustomModal";
import DeleteConfirmation from "../User/DeleteConfirmation";
// import EditProduct from './Product/EditProduct';
import { useDispatch } from "react-redux";
import {
  deleteSupplier,
  updateSupplier,
} from "../../../redux/suppliers/suppliersSlice";
import AddSupplier from "./AddSupplier";

export default function ActionMenu({
  id,
  item,
  products,
  lastSupplier,
  selectedProducts,
  setSelectedProducts,
}) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;
  const deleteHandler = (id) => {
    dispatch(deleteSupplier(id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const products = selectedProducts.map(({ _id }) => _id);
    const supplierData = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      status: data.get("status"),
      products,
    };
    dispatch(updateSupplier({ id, data: supplierData }));
  };

  return (
    <div>
      <IconButton
        aria-describedby={ids}
        variant="contained"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        id={ids}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ minWidth: 170 }}>
          <CustomModal
            title={"Edit Supplier"}
            action={
              <ListItemButton>
                <ListItemText>Edit Supplier</ListItemText>
              </ListItemButton>
            }
          >
            <AddSupplier
              edit
              id={id}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              lastSupplier={lastSupplier}
              handleSubmit={handleEdit}
              products={products}
            />
          </CustomModal>

          <CustomModal
            title={"Are you sure to delete?"}
            sx={{ maxWidth: 400, borderRadius: "0px" }}
            action={
              <ListItemButton>
                <ListItemText sx={{ color: "error.main" }}>
                  Remove List
                </ListItemText>
              </ListItemButton>
            }
          >
            <DeleteConfirmation deleteHandler={() => deleteHandler(id)} />
          </CustomModal>
        </Box>
      </Popover>
    </div>
  );
}
