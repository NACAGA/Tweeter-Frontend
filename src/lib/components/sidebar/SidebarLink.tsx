import React, { ReactElement } from 'react';
import { IconName, IconNameEnum } from 'lib/enums/IconNameEnum';
import './Sidebar.scss';
import { Link, NavLink } from 'react-router-dom';

interface Props {
    href: string;
    title: string;
    icon: IconName;
    iconOnly?: boolean;
}

function SidebarLink(props: Props): ReactElement {
    return (
        <NavLink
            type="button"
            to={props.href}
            className={({ isActive }) => (isActive ? 'sidebar-link sidebar-link--active' : 'sidebar-link')}
        >
            <div className={`sidebar-link__container ${props.iconOnly ? 'sidebar-link__container--closed' : ''}`}>
                <span className="sidebar-link__icon">{IconNameEnum[props.icon]}</span>
                {props.iconOnly ? '' : <span className="sidebar-link__title">{props.title}</span>}
            </div>
        </NavLink>
    );
}

export default SidebarLink;
