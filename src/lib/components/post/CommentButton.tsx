import { Button, Typography } from '@mui/material';
import React from 'react';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';

interface Props {
    comments: number;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Like(props: Props) {
    return (
        <Button
            variant="outlined"
            startIcon={<ChatBubbleOutlinedIcon />}
            color={'secondary'}
            onClick={props.onClick}
            sx={{ border: '2px solid' }}
        >
            {props.comments}
        </Button>
    );
}

export default Like;
