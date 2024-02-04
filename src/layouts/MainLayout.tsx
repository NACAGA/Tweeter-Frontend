import Sidebar from 'lib/components/sidebar/Sidebar';
import './Layouts.scss';
import { Outlet } from 'react-router-dom';

function MainLayout({ children }: any) {
    return (
        <div className="main-layout">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default MainLayout;
