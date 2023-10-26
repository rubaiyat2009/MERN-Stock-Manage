import { Box, Typography } from '@mui/material';
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PaymentsIcon from '@mui/icons-material/Payments';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';
const links = [
    {
        label: "Add an inventory",
        path: "/dashboard/inventories",
        Icon: InventoryIcon
    },
    // {
    //     label: "Class consumption",
    //     path: "/dashboard/outlets",
    //     Icon: PaymentsIcon
    // },
    {
        label: "My suppliers",
        path: "/dashboard/suppliers",
        Icon: HandshakeIcon
    },
    {
        label: "Manage users",
        path: "/dashboard/users",
        Icon: GroupIcon
    },
]

const QuickLinks = () => {
    return (
        <Box sx={{ p: 4, mb: 2, background: "linear-gradient(180deg, #138D77 0%, #2B4A45 100%)", borderRadius: "10px", boxShadow: "0px 0px 51px 5px rgba(0, 0, 0, 0.04)" }}>
            <Typography variant='h3' sx={{ color: "#fff", mb: 2 }}>Shortcuts</Typography>
            {
                links.map(({ label, path, Icon }) => (
                    <Box key={label} component={Link} to={path} sx={{ py: 1, display: "flex", color: "#fff", textDecoration: "none", borderBottom: "1px solid #fff" }}>
                        <Icon />&nbsp; {label}
                    </Box>
                ))
            }
        </Box>
    );
};

export default QuickLinks;