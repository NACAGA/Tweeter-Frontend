import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CommentPost from './CommentPost';
import { TPost } from 'lib/types/TPost';
import { Alert, Button, CircularProgress, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Comment from './Comment';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import AddCommentButton from '../add-comment/AddCommentButton';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    anchor: Anchor;
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    postInfo: TPost;
    postid: number;
    userid: number;
}

const commentEndpointUrl = 'http://localhost:3002/message-board/comment/';

function CommentFlyout(props: Props) {
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');
    const [commentIds, setCommentIds] = React.useState<number[] | undefined>(undefined);
    const [commentsUpdated, setCommentsUpdated] = React.useState<boolean>(false);

    const refreshComments = () => {
        setCommentsUpdated(!commentsUpdated);
    };

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(`${commentEndpointUrl}post/${props.postid}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve post comments data from server.');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    const commentIds: number[] = data.response.comments.map((comment: any) => comment.id);
                    setReqState(RequestStateEnum.Success);
                    setCommentIds(commentIds.sort((a, b) => b - a));
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.postid, commentsUpdated]);

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

    if (commentIds === undefined) return null;

    return (
        <Drawer anchor={props.anchor} open={props.open} onClose={props.onClose}>
            <Box display={'flex'} flexDirection={'column'} width="50vw">
                <Stack padding={'16px'} sx={{ zIndex: 100 }}>
                    <Box>
                        <IconButton color="primary" onClick={props.onClose}>
                            <HighlightOffOutlinedIcon />
                        </IconButton>
                    </Box>
                    <CommentPost postInfo={props.postInfo} postid={0}></CommentPost>
                </Stack>
                <List
                    sx={{
                        padding: '24px 24px',
                        gap: '24px',
                        zIndex: 1,
                        overflow: 'auto',
                        flexGrow: 1,
                        marginBottom: '100px',
                    }}
                >
                    {commentIds.length <= 0 ? (
                        <Typography variant="body1" color="text.primary" textAlign={'center'}>
                            No comments on this post
                        </Typography>
                    ) : (
                        commentIds.map((commentId: number) => {
                            return (
                                <ListItem>
                                    <Comment commentid={commentId}></Comment>
                                </ListItem>
                            );
                        })
                    )}
                </List>
                <Stack
                    padding={'8px 24px'}
                    width={'50%'}
                    position={'fixed'}
                    sx={{ backgroundColor: 'background.paper', zIndex: 100, bottom: 0 }}
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                >
                    <Box>
                        <AddCommentButton postid={props.postid} userid={props.userid} refreshComments={refreshComments}></AddCommentButton>
                    </Box>
                </Stack>
            </Box>
        </Drawer>
    );
}

export default CommentFlyout;
