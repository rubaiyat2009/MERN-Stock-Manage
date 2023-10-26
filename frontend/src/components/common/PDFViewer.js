import { Box, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();
function PDFViewer({ url }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <Box sx={{ border: "2px solid #ddd" }}>
                <Document

                    file={url} // Replace with your external PDF URL
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </Box>
            <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button sx={{ color: "#fff" }} variant='contained' onClick={() => window.open(url)}>Download PDF</Button>
            </Box>
            <Box sx={{
                mt: 3,
                display: "flex", justifyContent: "center", alignItems: "center", gap: 1, '& svg': {
                    height: 20, width: 20
                }
            }}>
                <IconButton onClick={() => setPageNumber(pre => (pre > 1 ? pre - 1 : pre))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                </IconButton>
                <p>
                    Page {pageNumber} of {numPages}
                </p>

                <IconButton onClick={() => setPageNumber(pre => (pre < numPages ? pre + 1 : pre))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                </IconButton>
            </Box>
        </div>
    );
}

export default PDFViewer;
