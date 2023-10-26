import {
  Autocomplete,
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSupplier } from "../../../redux/suppliers/suppliersSlice";
import PreLoader from "../../common/PreLoader";
import PrimaryButton from "../../common/PrimaryButton";
import { nanoid } from "nanoid";

const AddSupplier = ({
  handleSubmit,
  products = [],
  setSelectedProducts,
  edit,
  id,
}) => {
  const dispatch = useDispatch();
  const { supplierDetails, isDetailsLoading } = useSelector(
    (state) => state.suppliers
  );
  useEffect(() => {
    if (edit) {
      dispatch(getSingleSupplier(id));
    }
  }, [edit, id, dispatch]);

  const handleProducts = (e, value) => {
    setSelectedProducts(value);
  };


  if (isDetailsLoading) {
    return (
      <Box sx={{ height: "55vh" }}>
        <PreLoader />
      </Box>
    );
  }
  return (
    <Box id="add-supplier-form" sx={{ p: 3 }} component={"form"} onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid item md={6} xs={12}>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>ID:</Typography>
          <TextField
            defaultValue={edit ? supplierDetails?.id : nanoid(11)}
            size="small"
            margin="dense"
            name="id"
            inputProps={{ readOnly: true }}
            fullWidth
            required
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Name:</Typography>
          <TextField
            defaultValue={edit ? supplierDetails?.name : ""}
            size="small"
            margin="dense"
            name="name"
            type="text"
            fullWidth
            required
          />
        </Grid>
        {/* {edit && (
          <Grid item md={6} xs={12}>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Status:
            </Typography>
            <TextField
              select
              defaultValue={edit ? supplierDetails?.status : ""}
              size="small"
              margin="dense"
              name="status"
              type="text"
              fullWidth
              required
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
            </TextField>
          </Grid>
        )} */}

        <Grid item md={6} xs={12}>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Email:</Typography>
          <TextField
            defaultValue={edit ? supplierDetails?.email : ""}
            size="small"
            margin="dense"
            name="email"
            type="email"
            fullWidth
            required
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
            Phone Number:
          </Typography>
          <TextField
            defaultValue={edit ? supplierDetails?.phone : ""}
            size="small"
            margin="dense"
            name="phone"
            type="text"
            fullWidth
            required
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography mt={2} sx={{ fontSize: 18, color: "secondary.main" }}>
            Products
          </Typography>
          <Autocomplete
            size="small"
            multiple
            id="tags-outlined"
            onChange={handleProducts}
            options={products}
            getOptionLabel={(option) => option.name}
            defaultValue={
              edit
                ? products?.filter(({ _id }) =>
                  supplierDetails?.products?.find((pd) => pd._id === _id)
                )
                : []
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                // label="filterSelectedOptions"
                placeholder="choose product"
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "right", mt: 3 }}>
        <PrimaryButton sx={{ width: 150 }} type="submit">
          {edit ? "Update" : "Add"} Supplier
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default AddSupplier;