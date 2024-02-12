import { Alert, Button, CircularProgress, Fab, Typography } from '@mui/material';
import React from 'react';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import CommentFlyout from '../comment-flyout/CommentFlyout';
import { TPost } from 'lib/types/TPost';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { set } from 'lodash';

interface Props {
    postid: number;
    postInfo: TPost;
    userid: number;
}

const commentEndpointUrl = 'http://localhost:3002/message-board/comment/';

function CommentButton(props: Props) {
    const [flyoutOpen, setFlyoutOpen] = React.useState<boolean>(false);
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');
    const [commentCount, setCommentCount] = React.useState<number | undefined>(undefined);

    const toggleDrawer = () => setFlyoutOpen(!flyoutOpen);

    React.useEffect(() => {
        fetch(`${commentEndpointUrl}post/${props.postid}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve comment data from server.');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    setReqState(RequestStateEnum.Success);
                    const commentCount: number = data.response.comments.length;
                    setCommentCount(commentCount);
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.postid]);

    if (reqState === RequestStateEnum.None || reqState === RequestStateEnum.InProgress) {
        return <CircularProgress />;
    }

    if (reqState === RequestStateEnum.Failure) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {errMsg}
            </Alert>
        );
    }

    if (commentCount === undefined) return null;

    return (
        <div>
            <Fab color={'secondary'} onClick={toggleDrawer} size="small" variant="extended">
                <ChatBubbleOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1" fontWeight={'600'}>
                    {commentCount}
                </Typography>
            </Fab>
            <CommentFlyout
                anchor={'right'}
                onClose={toggleDrawer}
                open={flyoutOpen}
                postInfo={props.postInfo}
                postid={props.postid}
                userid={props.userid}
            ></CommentFlyout>
        </div>
    );
}

export default CommentButton;
