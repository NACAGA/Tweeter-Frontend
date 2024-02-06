import { Button, Typography } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    liked: boolean;
    likes: number;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Like(props: Props) {
    return (
        <Button
            startIcon={props.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            color={props.liked ? 'primary' : 'gray'}
            onClick={props.onClick}
            variant="outlined"
            sx={{ border: '2px solid' }}
        >
            {props.likes}
        </Button>
    );
}

export default Like;
