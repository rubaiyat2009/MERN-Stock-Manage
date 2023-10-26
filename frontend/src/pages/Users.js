import { Box, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/common/CustomModal';
import DataTable from '../components/common/DataTable';
import MultiSelect from '../components/common/MultiSelect';
import PrimaryButton from '../components/common/PrimaryButton';
import Header from '../components/dashboard/Header';
import PageTitle from '../components/dashboard/PageTitle';
import AddUser from '../components/dashboard/User/AddUser';
import DeleteConfirmation from '../components/dashboard/User/DeleteConfirmation';
import EditUser from '../components/dashboard/User/EditUser';
import { addUser, deleteSingleUser, getUserList } from '../redux/users/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ToggleButton from '../components/common/ToggleButton';

const headings = [
    {
        id: 'name',
        align: "left",
        label: 'Name',
        required: true
    },
    {
        id: 'email',
        align: "left",
        label: 'Email',
        required: true
    },
    {
        id: 'role',
        align: "left",
        label: 'Role',
    },
    {
        id: 'status',
        align: "left",
        label: 'Status',
    },
    {
        id: 'created_at',
        align: "left",
        label: 'Date Added',
    },
    {
        id: 'action',
        align: "left",
        label: 'Action',
        required: true
    },
];
const localStorageKey = "coolUserTable"
const Users = () => {
    const dispatch = useDispatch();
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["name", "email", "role","status","created_at", "action"]'))
    const { users, total, isLoading, fetch } = useSelector(state => state.users);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [sort, setSort] = useState(false);
    useEffect(() => {
        dispatch(getUserList({ page: activePage, size: perPage, sort: sort ? "dsc" : "asc" }))
    }, [dispatch, fetch, activePage, perPage, sort])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            role: data.get('role'),
            status: data.get('status'),
            telephone: data.get("telephone"),
        }
        dispatch(addUser(userData))
    }

    const deleteHandler = (id) => {
        dispatch(deleteSingleUser(id));
    }

    return (
        <Box>
            <Header>
                <PageTitle>Manage Users</PageTitle>
                {/* <Typography sx={{ maxWidth: 710 }}>Sub title</Typography> */}
            </Header>
            <Box p={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ToggleButton value={sort} setValue={setSort} /> &nbsp;&nbsp;&nbsp;
                        <CustomModal title={"Add a new user"} action={<PrimaryButton sx={{ width: 150 }}>Add User</PrimaryButton>}>
                            <AddUser handleSubmit={handleSubmit} />
                        </CustomModal>
                    </Box>

                </Box>

                <DataTable
                    total={total}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    columns={columns}
                    headings={headings}
                    rows={users}
                    loading={isLoading}
                    updateFields={{
                        "name": (item) => (
                            <Box component={"span"}> {item.firstName} {item.lastName}</Box>
                        ),
                        "created_at": (item) => (
                            <>{new Date(item.created_at).toLocaleDateString("en-MY")}</>
                        ),
                        "status": (item) => (
                            item.status === "verified" ? <Box component={"span"} sx={{ color: "primary.main" }}>{item.status}</Box> : item.status
                        ),
                        "action": (item) => (
                            <Box component={"span"} sx={{ display: "flex" }}>
                                <CustomModal title="Edit User" action={
                                    <IconButton>
                                        <EditIcon sx={{ color: "primary.main" }} />
                                    </IconButton>
                                }>
                                    <EditUser id={item._id} />
                                </CustomModal>
                                <CustomModal title={"Are you sure to delete?"} sx={{ maxWidth: 400, borderRadius: "0px" }} action={
                                    <IconButton>
                                        <Delete sx={{ color: "error.main" }} />
                                    </IconButton>
                                }>
                                    <DeleteConfirmation deleteHandler={() => deleteHandler(item._id)} />
                                </CustomModal>
                            </Box>
                        )

                    }}
                />
            </Box>
        </Box>
    );
};

export default Users;