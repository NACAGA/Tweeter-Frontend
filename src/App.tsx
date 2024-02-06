import './App.css';

import React from 'react';
import { CssBaseline, Palette, Switch, ThemeProvider, createTheme } from '@mui/material';
import { router } from './modules';
import { BrowserRouter, Router, RouterProvider } from 'react-router-dom';
import Main from 'modules/main/Main';
import MainLayout from 'layouts/MainLayout';
import { lightTheme } from './lib/themes/lightTheme';

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
