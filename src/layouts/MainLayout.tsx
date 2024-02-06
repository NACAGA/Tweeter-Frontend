import Sidebar from 'lib/components/sidebar/Sidebar';
import './Layouts.scss';
import { Outlet } from 'react-router-dom';

function MainLayout({ children }: any) {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-layout__content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
