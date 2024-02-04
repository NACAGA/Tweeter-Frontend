import React, { ReactElement } from 'react';
import { IconName, IconNameEnum } from 'lib/enums/IconNameEnum';
import './Sidebar.scss';

interface props {
    icon: IconName;
    onClick: () => void;
}

function SidebarHeader(props: props): ReactElement {
    const handleClick = () => {
        props.onClick();
    };

    return (
        <div className="sidebar__header" onClick={handleClick}>
            {IconNameEnum[props.icon]}
        </div>
    );
}

export default SidebarHeader;
