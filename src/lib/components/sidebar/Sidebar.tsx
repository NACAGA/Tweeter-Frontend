import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SidebarLink from './SidebarLink';
import SidebarHeader from './SidebarHeader';
import './Sidebar.scss';

function Sidebar() {
    const [closed, setClosed] = useState(false);
    const sidebarWidth = closed ? 88 : 256;

    const handleClick = () => {
        setClosed((prev) => !prev);
    };

    return (
        <div className={closed ? 'sidebar sidebar--closed' : 'sidebar'} style={{ width: `${sidebarWidth}px`, transition: 'width 200ms' }}>
            <SidebarHeader icon="menu" onClick={handleClick} />
            <SidebarLink href="/" title="Home" icon="home" iconOnly={closed} />
            <SidebarLink href="/join-groups" title="Join Groups" icon="search" iconOnly={closed} />
            <SidebarLink href="/my-groups" title="My Groups" icon="group" iconOnly={closed} />
            <SidebarLink href="/creategroup" title="Create Group" icon="addCircle" iconOnly={closed} />
            <SidebarLink href="/newpost" title="New Post" icon="addPage" iconOnly={closed} />
            <SidebarLink href="/profile" title="Profile" icon="person" iconOnly={closed} />
        </div>
    );
}

export default Sidebar;
