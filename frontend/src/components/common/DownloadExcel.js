import { Button } from '@mui/material';
import React from 'react';
import { downloadExcel } from 'react-export-table-to-excel';

const DownloadExcel = ({ sx, header = [], body = [], fileName = "download", sheet = "sheet1" }) => {



    function handleDownloadExcel() {

        downloadExcel({
            fileName,
            sheet,
            tablePayload: {
                header,
                body
            }
        });
    }
    return (
        <Button sx={{ color: "#fff", ml: 1, mt: 2, ...sx }} variant='contained' onClick={handleDownloadExcel}>
            Download Excel
        </Button>
    );
};

export default DownloadExcel;