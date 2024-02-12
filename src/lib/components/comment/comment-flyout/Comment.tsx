import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { TComment } from '../../../types/TComment';
import React from 'react';
import CommentUtils from 'lib/utils/comment-utils';
import { Alert, Box, Card, CircularProgress, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { inherits } from 'util';
import LikeButton from 'lib/components/like-button/LikeButton';

interface Props {
    commentid: number;
}

const commentEndpointUrl = 'http://localhost:3002/message-board/comment/';

function Comment(props: Props) {
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');
    const [comment, setComment] = React.useState<TComment | undefined>(undefined);

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(`${commentEndpointUrl}${props.commentid}`, { method: 'GET' })
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
                    const comment = data.response.comments[0];
                    setReqState(RequestStateEnum.Success);
                    setComment(CommentUtils.createComment('jimbo', comment.date, comment.content));
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.commentid]);

    if (reqState === RequestStateEnum.InProgress) {
        return (
            <Box>
                <CircularProgress />
            </Box>
        );
    }

    if (reqState === RequestStateEnum.Failure) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {errMsg}
            </Alert>
        );
    }

    if (!comment) return null;

    return (
        <Stack gap={'16px'} flexDirection={'row'} alignItems={'center'} width={'100%'}>
            <Stack height={'24px'} width={'24px'} color={'#BCBCBC'}>
                <ArrowForwardIosIcon />
            </Stack>
            <Box borderTop="1px dashed #BCBCBC" width="32px" height={'0px'} justifyContent={'flex-start'}></Box>
            <Card raised={true} sx={{ width: '100%', borderRadius: '16px', minWidth: '400px' }}>
                <Stack padding={'8px'} gap={'8px'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" fontWeight={600}>
                            {comment.username}
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                            {new Date(comment.date).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Box width={'fit-content'}>
                        <Typography variant="body1">{comment.content}</Typography>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <LikeButton mediaid={props.commentid} mediaType={'comment'}></LikeButton>
                    </Box>
                </Stack>
            </Card>
        </Stack>
    );
}

export default Comment;
