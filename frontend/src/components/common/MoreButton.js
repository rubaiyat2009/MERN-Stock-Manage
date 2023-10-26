import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
const MoreButton = ({ id, detailsPath }) => {
    return (
        <Link to={`/dashboard/${detailsPath}/${id}`}>
            <IconButton sx={{ boxShadow: "none", height: 30, width: 30, minHeight: "unset", bgcolor: "primary.main", "&:hover": { bgcolor: "primary.main" } }} size="small" aria-label="add">
                <VisibilityIcon sx={{ color: "#fff", fontSize: 18 }} />
            </IconButton>
        </Link>
    );
};

export default MoreButton;