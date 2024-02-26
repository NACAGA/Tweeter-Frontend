// Layouts
import MainLayout from 'layouts/MainLayout';
import AnonymousLayout from 'layouts/AnonymousLayout';

// Pages
import Home from './home/Home';
import Login from 'modules/login/Login';
import ChangeUsername from './changeUsername/ChangeUsername';
import ChangePassword from './changePassword/ChangePassword';
import Signup from 'modules/signup/Signup';
import JoinGroups from './joinGroups/JoinGroups';
import MyGroups from './myGroups/MyGroups';
import Profile from './profile/Profile';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home daysBack={20} /> },
            { path: 'change-username', element: <ChangeUsername /> },
            { path: 'change-password', element: <ChangePassword /> },
            { path: 'join-groups', element: <JoinGroups /> },
            { path: 'my-groups', element: <MyGroups /> },
            { path: 'profile', element: <Profile /> },
        ],
    },
    {
        element: <AnonymousLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
        ],
    },
]);
