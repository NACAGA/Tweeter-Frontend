import React, { ReactElement } from 'react';
import { IconName, IconNameEnum } from 'lib/types/enums/IconNameEnum';
import './Sidebar.scss';
import { Link, NavLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

interface Props {
    onClick?: () => void;
    title: string;
    icon: IconName;
    iconOnly?: boolean;
}

function SidebarAction(props: Props): ReactElement {
    return (
        <Button
            onClick={props.onClick}
            sx={{
                justifyContent: 'start',
                width: '100%',
                height: 'fit-content',
                fontSize: '20px',
                textDecoration: 'none',
                padding: '0px 2px',
                textTransform: 'capitalize',
            }}
        >
            <div className={`sidebar-link__container ${props.iconOnly ? 'sidebar-link__container--closed' : ''}`}>
                <span className="sidebar-link__icon">{IconNameEnum[props.icon]}</span>
                {props.iconOnly ? '' : <span className="sidebar-link__title">{props.title}</span>}
            </div>
        </Button>
    );
}

export default SidebarAction;
