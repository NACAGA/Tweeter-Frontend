import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const withNavigate = (Component: any) => (props: any) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
};

export const withParams = (Component: any) => (props: any) => {
    const params = useParams();
    return <Component params={params} {...props} />;
};
