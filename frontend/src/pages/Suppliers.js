import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/common/CustomModal";
import DataTable from "../components/common/DataTable";
import MultiSelect from "../components/common/MultiSelect";
import PrimaryButton from "../components/common/PrimaryButton";
import AddSupplier from "../components/dashboard/Supplier/AddSupplier";
import PageTitle from "../components/dashboard/PageTitle";
import {
  addNewSupplier,
  deleteSupplier,
  getSuppliers,
} from "../redux/suppliers/suppliersSlice";
import ActionMenu from "../components/dashboard/Supplier/ActionMenu";
import Header from "../components/dashboard/Header";
import { getAllProduct } from "../redux/products/productsSlice";

const localStorageKey = "coolSuppliersTable";
const Suppliers = () => {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(
    JSON.parse(
      localStorage.getItem(localStorageKey) ||
      '["id","name", "email","phone", "product","status","action"]'
    )
  );
  const { suppliers, isLoading, total, fetch } = useSelector(
    (state) => state.suppliers
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { allProducts, isAllLoading } = useSelector((state) => state.products);

  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    const params = { page: activePage, size: perPage };

    dispatch(getSuppliers(params));
  }, [dispatch, activePage, fetch, perPage]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  // if (users.isLoading || suppliers.isAllLoading) {
  //     return <h1>Loading...</h1>
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const products = selectedProducts.map(({ _id }) => _id);
    const supplierData = {
      id: data.get("id"),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      products,
    };
    dispatch(addNewSupplier(supplierData));
  };

  const deleteHandler = (id) => {
    dispatch(deleteSupplier(id));
  };

  const headings = [
    // {
    //   id: "id",
    //   align: "left",
    //   label: "ID",
    //   required: true,
    // },
    {
      id: "name",
      align: "left",
      label: "NAME",
      required: true,
    },
    {
      id: "email",
      align: "left",
      label: "EMAIL",
    },
    {
      id: "phone",
      align: "left",
      label: "PHONE",
    },
    {
      id: "products",
      align: "left",
      label: "PRODUCTS",
    },
    // {
    //   id: "status",
    //   align: "left",
    //   label: "STATUS",
    // },
    {
      id: "action",
      align: "right",
      label: "Action",
      required: true,
    },
    // ...(currentUser?.role === "admin"
    //   ? [
    //     {
    //       id: "action",
    //       align: "right",
    //       label: "Action",
    //       required: true,
    //     },
    //   ]
    //   : []),
  ];

  return (
    <Box>
      <Header>
        <PageTitle>Supplier</PageTitle>
        {/* <Typography sx={{ maxWidth: 710 }}>Sub title</Typography> */}
      </Header>
      <Box p={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <MultiSelect
            localStorageKey={localStorageKey}
            columns={columns}
            setColumns={setColumns}
            totalColumns={headings}
          />

          <CustomModal
            title={"Add a new Supplier"}
            action={
              <PrimaryButton sx={{ width: 150 }}>Add Supplier</PrimaryButton>
            }
          >
            <AddSupplier
              setSelectedProducts={setSelectedProducts}
              handleSubmit={handleSubmit}
              products={allProducts}
            />
          </CustomModal>
        </Box>

        <DataTable
          height="calc(100vh - 260px)"
          columns={columns}
          perPage={perPage}
          setPerPage={setPerPage}
          headings={headings}
          rows={suppliers}
          total={total}
          activePage={activePage}
          setActivePage={setActivePage}
          loading={isLoading}
          updateFields={{
            products: (item) => item.products?.length,
            status: (item) => (
              <Box
                sx={{
                  color:
                    item.status === "verified" ? "primary.main" : "inherit",
                }}
              >
                {item.status}
              </Box>
            ),
            action: (item) => (
              <ActionMenu
                deleteHandler={deleteHandler}
                id={item._id}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                products={allProducts}
              />
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Suppliers;
