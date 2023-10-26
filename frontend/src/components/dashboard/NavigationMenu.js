import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import Add from '@mui/icons-material/Add';
import Logout from '../Auth/Logout';
import { useSelector } from 'react-redux';
const menuItem = [
    {
        label: "Dashboard",
        Icon: DashboardIcon,
        path: "/dashboard"
    },
    // {
    //     label: "Outlet",
    //     Icon: StoreMallDirectoryOutlinedIcon,
    //     path: "outlets"
    // },
    {
        label: "Suppliers",
        Icon: Inventory2OutlinedIcon,
        path: "suppliers"
    },
    {
        label: "Inventories",
        Icon: InventoryOutlinedIcon,
        path: "inventories"
    },
    {
        label: "Users",
        Icon: PeopleAltOutlinedIcon,
        path: "users"
    }
]


const NavigationMenu = ({ open }) => {
    const { pathname } = useLocation();
    const { currentUser } = useSelector(state => state.auth);
    const [isAdmin, setIsAdmin] = React.useState(false);
    React.useEffect(() => {
        if (currentUser?.role === "admin" || currentUser?.role === "readonlyAdmin") {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [currentUser])
    return (
        <Box sx={{
            "& a": {
                color: "text.primary",
                textDecoration: "none"
            },
            "& .menuItem": {
                marginBottom: "1px",
                '&:hover': {
                    color: "secondary.main",
                    '& .icon': {
                        color: "secondary.main"
                    }
                },
                "&.active": {
                    color: "secondary.main",
                    '& .icon': {
                        color: "secondary.main"
                    }
                }
            }
        }}>
            {/* <Box sx={{ textAlign: "center", my: 3 }}>
                <Button variant="contained" sx={{ color: "#fff" }}><Add /> {open ? "Add New" : ""}</Button>
            </Box> */}
            {
                menuItem.map(({ label, Icon, path }) => (
                    (!isAdmin && label === "Users") ||
                    <Link to={path} key={path}>
                        <ListItemButton sx={{ pl: open ? 6 : 3, transition: "0.3s" }} className={`menuItem ${pathname === path ? "active" : (pathname.includes(path) && path !== "/dashboard") ? "active" : ""}`}>
                            <ListItemIcon>
                                <Icon className='icon' />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </Link>
                ))
            }
            <Logout open={open} />
        </Box>
    )
}

export default NavigationMenu;