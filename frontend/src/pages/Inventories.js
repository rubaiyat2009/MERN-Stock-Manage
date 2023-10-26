import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/common/CustomModal';
import DataTable from '../components/common/DataTable';
import MultiSelect from '../components/common/MultiSelect';
import PrimaryButton from '../components/common/PrimaryButton';
import AddProduct from '../components/dashboard/Product/AddProduct';
import SearchIcon from '@mui/icons-material/Search';
import PageTitle from '../components/dashboard/PageTitle';
import { addNewProduct, deleteProduct, getProducts } from '../redux/products/productsSlice';
import ActionMenu from '../components/dashboard/Product/ActionMenu';
import ToggleButton from '../components/common/ToggleButton';
import Header from '../components/dashboard/Header';
import { getProductsList } from '../redux/products/productsSlice';
import { getAllCategory } from '../redux/productCategory/productCategorySlice';
import { getAllUnit } from '../redux/productUnit/productUnitSlice';

import PreLoader from '../components/common/PreLoader';
import currency from '../utils/currencyFormat';



const headings = [
    {
        id: 'name',
        align: "left",
        label: 'PRODUCT',
        required: true
    },
    {
        id: 'unit',
        align: "left",
        label: 'UNIT'
    },
    {
        id: 'category',
        align: "left",
        label: 'CATEGORY'
    },
    {
        id: 'price',
        align: "right",
        label: 'LAST USED PRICE (RM)',
    },
    {
        id: 'action',
        align: "right",
        label: 'Action',
        required: true
    },
];
const localStorageKey = "coolInventoriesTable";
const Inventories = () => {
    const dispatch = useDispatch();
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["name", "category", "price","action"]'))
    const { products, isLoading, total, fetch } = useSelector(state => state.products);
    const { allProducts, isAllLoading } = useSelector(state => state.products);
    const { fetch: categoryFetch, categories } = useSelector(state => state.categories);
    const { fetch: unitFetch, units } = useSelector(state => state.units);

    const [activePage, setActivePage] = useState(1);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(50);
    useEffect(() => {
        const params = { page: activePage, size: perPage, search };
        if (search === "") {
            delete params.search;
        }
        dispatch(getProductsList(params));
    }, [dispatch, activePage, perPage, fetch, search])

    useEffect(() => {
        dispatch(getAllCategory())
        dispatch(getAllUnit())
    }, [dispatch, categoryFetch, unitFetch])
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const productData = {
            name: data.get('name'),
            category: data.get('category'),
            price: data.get('price'),
            unit: data.get('unit'),
        }
        dispatch(addNewProduct(productData))
    }

    let timeOutId;
    const handleSearch = (e) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            setSearch((e.target.value || "").toUpperCase());
            setActivePage(1);
        }, 500);
    };

    return (
        <Box>
            <Header>
                <PageTitle>Inventory Stock</PageTitle>
                {/* <Typography sx={{ maxWidth: 710 }}>Sub title</Typography> */}
            </Header>
            <Box p={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
                        <TextField
                            onChange={handleSearch}
                            size="small"
                            label={<Box component={"span"} sx={{ display: "flex", alignItems: "center", mt: "-3px" }}><SearchIcon />&nbsp;Search Inventory</Box>}
                            sx={{ width: "20%", minWidth: 200, ml: 2 }}
                        />
                    </Box>
                    <CustomModal title={"Add a New Product"} action={<PrimaryButton sx={{ width: 150 }}>Add Product</PrimaryButton>}>
                        <AddProduct categories={categories} units={units} handleSubmit={handleSubmit} />
                    </CustomModal>

                </Box>


                {
                    isLoading ? <PreLoader /> :
                        <DataTable
                            inventory
                            height='calc(100vh - 260px)'
                            columns={columns}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            headings={headings}
                            rows={products}
                            total={total}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            loading={isLoading}
                            updateFields={{
                                "category": (item) => (
                                    item.category?.name
                                ),
                                "unit": (item) => (
                                    item.unit?.name
                                ),
                                "price": (item) => (
                                    <>{currency.format(item.price)}</>
                                ),
                                "action": (item) => (
                                    <ActionMenu product={item} id={item._id} />
                                )

                            }}
                        />
                }
            </Box>
        </Box>
    );
};

export default Inventories;