import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export const withMediaQuery = (arg: string) => (Component: any) => (props: any) => {
    const mediaQuery = useMediaQuery(arg);
    return <Component mediaQuery={mediaQuery} {...props} />;
};

export const withIsSmaller = (breakpoint: number | Breakpoint) => (Component: any) => (props: any) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down(breakpoint));
    return <Component isSmall={isSmall} {...props} />;
};

export const withIsLarger = (breakpoint: number | Breakpoint) => (Component: any) => (props: any) => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up(breakpoint));
    return <Component isLarge={isLarge} {...props} />;
};
