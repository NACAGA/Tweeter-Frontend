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
import SidebarAction from './SidebarAction';
import NewGroupModal from '../new-group/NewGroupModal';

function Sidebar() {
    const [closed, setClosed] = useState(false);
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const sidebarWidth = closed ? 88 : 256;

    const toggleCreateGroupModal = () => {
        setCreateGroupModalOpen((prev) => !prev);
    };

    const handleClick = () => {
        setClosed((prev) => !prev);
    };

    return (
        <div className={closed ? 'sidebar sidebar--closed' : 'sidebar'} style={{ width: `${sidebarWidth}px`, transition: 'width 200ms' }}>
            <SidebarHeader icon="menu" onClick={handleClick} />
            <SidebarLink href="/" title="Home" icon="home" iconOnly={closed} />
            <SidebarLink href="/join-groups" title="Join Groups" icon="search" iconOnly={closed} />
            <SidebarLink href="/my-groups" title="My Groups" icon="group" iconOnly={closed} />
            <SidebarAction title="Create Group" icon="addCircle" iconOnly={closed} onClick={toggleCreateGroupModal} />
            <SidebarAction title="New Post" icon="addPage" iconOnly={closed} />
            <SidebarLink href="/profile" title="Profile" icon="person" iconOnly={closed} />
            <NewGroupModal userid={1} open={createGroupModalOpen} onClose={toggleCreateGroupModal} />
        </div>
    );
}

export default Sidebar;
