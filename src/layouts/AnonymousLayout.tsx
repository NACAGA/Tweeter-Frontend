import { Router, BrowserRouter, Outlet } from 'react-router-dom';

function AnonymousLayout({ children }: any) {
    return (
        <div className="anonymous-layout">
            <Outlet />
        </div>
    );
}

export default AnonymousLayout;
