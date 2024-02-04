import { Router, BrowserRouter, Outlet } from 'react-router-dom';

function AnonymousLayout({ children }: any) {
    return <div className="main-layout">{children}</div>;
}

export default AnonymousLayout;
