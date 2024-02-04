import './App.css';

import React from 'react';
import { CssBaseline, Switch, ThemeProvider, createTheme } from '@mui/material';
import { router } from './modules';
import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Main from 'modules/main/Main';
import MainLayout from 'layouts/MainLayout';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: '#000000',
            secondary: '#6D6D6D',
        },
        primary: {
            main: '#97D2FB',
            light: '#B0E0FD',
            dark: '#6EAED9',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#80FFE8',
            light: '#A6FFEF',
            dark: '#4DE5D2',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#db3633',
            light: '#e6504d',
            dark: '#bc2626',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#26bc26',
            light: '#76d170',
            dark: '#009a0a',
            contrastText: '#FFFFFF',
        },
        action: {
            hoverOpacity: 0.11,
        },
    },
    typography: {
        fontFamily: ['inter', 'droidSerif'].join(','),
        h1: { fontSize: 60 },
        h2: { fontSize: 48 },
        h3: { fontSize: 34 },
        h4: { fontSize: 24 },
        h5: { fontSize: 20 },
        h6: { fontSize: 18 },
        subtitle1: {
            fontSize: 18,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant === 'outlined' && {
                        borderWidth: 3,
                        borderRadius: 5,
                        '&:hover': { borderWidth: 3, borderRadius: 5 },
                    }),
                }),
            },
        },
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    );
}

export default App;
