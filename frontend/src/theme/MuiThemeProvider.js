import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const MuiThemeProvider = ({ children }) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#004225"
            },
            secondary: {
                main: "#000000"
            },
            success: {
                main: "#44E22A"
            },
            warning: {
                main: "#FFC047"
            },
            error: {
                main: "#E22A2A"
            },
            text: {
                primary: "#636363"
            }

        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            h3: {
                fontSize: 24,
                fontWeight: 600,
                lineHeight: "28px"
            },
            body1: {
                fontSize: 14
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;