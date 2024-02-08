import { Button, Typography } from '@mui/material';
import React from 'react';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import CommentFlyout from '../comment-flyout/CommentFlyout';
import { TPost } from 'lib/types/TPost';

interface Props {
    postid: number;
    postInfo: TPost;
}

function Like(props: Props) {
    const [flyoutOpen, setFlyoutOpen] = React.useState<boolean>(false);

    const toggleDrawer = () => setFlyoutOpen(!flyoutOpen);

    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<ChatBubbleOutlinedIcon />}
                color={'secondary'}
                onClick={toggleDrawer}
                sx={{ border: '2px solid' }}
            >
                22
            </Button>
            <CommentFlyout anchor={'right'} onClose={toggleDrawer} open={flyoutOpen} postInfo={props.postInfo}></CommentFlyout>
        </div>
    );
}

export default Like;
