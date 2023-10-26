import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LayersIcon from '@mui/icons-material/Layers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Logout from '../Auth/Logout';

const menuItem = [
    {
        label: "Dashboard",
        Icon: DashboardIcon,
        path: "/dashboard"
    },
    {
        label: "Bookings",
        Icon: CalendarMonthIcon,
        path: "bookings"
    },
    {
        label: "Bookings By Node",
        Icon: CalendarMonthIcon,
        path: "booking-by-node"
    },
    {
        label: "Users",
        Icon: PeopleIcon,
        path: "users"
    },
    {
        label: "Registered Vehicles",
        Icon: DirectionsCarIcon,
        path: "vehicles"
    },
    {
        label: "Registered Vehicles By Node",
        Icon: DirectionsCarIcon,
        path: "vehicle-by-node"
    },
    {
        label: "Ryd-e Fleet",
        Icon: LayersIcon,
        path: "ryd-e-fleet"
    },
    {
        label: "My Investment",
        Icon: PaidIcon,
        path: "my-investment"
    },
]


const MenuItems = () => {
    const { pathname } = useLocation();
    return (
        <Box sx={{
            "& a": {
                color: "text.primary",
                textDecoration: "none"
            },
            "& .menuItem": {
                marginBottom: "1px",
                '&:hover': {
                    bgcolor: "primary.main",
                    color: "#fff",
                    '& .icon': {
                        color: "#fff"
                    }
                },
                "&.active": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    '& .icon': {
                        color: "#fff"
                    }
                }
            }
        }}>
            {
                menuItem.map(({ label, Icon, path }) => (
                    <Link to={path} key={path}>
                        <ListItemButton className={`menuItem ${pathname === path ? "active" : (pathname.includes(path) && path !== "/dashboard") ? "active" : ""}`}>
                            <ListItemIcon>
                                <Icon className='icon' />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </Link>
                ))
            }
            <Logout />
        </Box>
    )
}

export default MenuItems;