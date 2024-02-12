import { Palette, Theme, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palettele {
        gray: Palette['primary'];
        white: Palette['primary'];
    }

    interface PaletteOptions {
        gray: PaletteOptions['primary'];
        white: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
    }
}
declare module '@mui/material/Card' {
    interface CardPropsColorOverrides {
        gray: true;
    }
}

declare module '@mui/material/Fab' {
    interface FabPropsColorOverrides {
        gray: true;
        white: true;
    }
}

export const lightTheme: Theme = createTheme({
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
            main: '#5CF3D8',
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
        gray: {
            main: '#DCDCDC',
            light: '#ECECEC',
            dark: '#BCBCBC',
            contrastText: '#97D2FB',
        },
        white: {
            main: '#FFFFFF',
            light: '#B0E0FD',
            dark: '#EDEDED',
            contrastText: '#DCDCDC',
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
