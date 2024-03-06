import React from 'react';
import { Alert, Box, Card, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LikeButton from '../like-button/LikeButton';
import CommentButton from '../comment/comment-button/CommentButton';
import { TPost } from '../../types/TPost';
import PostUtils from '../../utils/post-utils';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { useNavigate } from 'react-router-dom';
import { add } from 'lodash';
interface Props {
    postid: number;
    userid: number;
}

const postEndpointUrl = 'http://localhost:3002/message-board/post/';
const groupEndpointUrl = 'http://localhost:3002/message-board/group/';
const userEndpointUrl = 'http://localhost:3002/message-board/user/';

async function getGroupName(groupid: number): Promise<string> {
    const requestResult = await fetch(`${groupEndpointUrl}${groupid}`, { method: 'GET' });
    if (!requestResult.ok) {
        throw new Error(`HTTP error! status: ${requestResult.status}`);
    }
    const data = await requestResult.json();
    return data.response.group.name;
}

async function getUserInGroup(groupid: number, userid: number): Promise<boolean> {
    const requestResult = await fetch(`${userEndpointUrl}${groupid}`, { method: 'GET' });
    if (!requestResult.ok) {
        throw new Error(`HTTP error! status: ${requestResult.status}`);
    }
    const data = await requestResult.json();
    const users = data.response.users;
    return users.some((user: any) => user.id === userid);
}

function Post(props: Props) {
    const [getPostContentReqState, setGetPostContentReqState] = React.useState(RequestStateEnum.None);
    const [getPostContentErrMsge, setGetPostContentErrMsg] = React.useState('');
    const [addUserToGroupReqState, setAddUserToGroupReqState] = React.useState(RequestStateEnum.None);
    const [addUserToGroupErrMsg, setAddUserToGroupErrMsg] = React.useState('');
    const [groupid, setGroupId] = React.useState<number>(-1);
    const [post, setPost] = React.useState<TPost | undefined>(undefined);
    const [height, setHeight] = React.useState<number>(2);
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:3002/message-board';
    const addUserToGroupUrl = new URL(`${baseUrl}/user/${props.userid}/${groupid}`);

    React.useEffect(() => {
        setGetPostContentReqState(RequestStateEnum.InProgress);
        fetch(`${postEndpointUrl}${props.postid}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve post data from server.');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    const post = data.response.posts[0];
                    const date = new Date(post.postedOn);
                    const groupid = post.group;
                    return Promise.all([getGroupName(groupid), getUserInGroup(groupid, props.userid)]).then(([groupName, userInGroup]) => {
                        setGroupId(groupid);
                        setGetPostContentReqState(RequestStateEnum.Success);
                        setPost(PostUtils.createPost(post.id, 'jimbo', date, post.content, userInGroup, groupName, post.group));
                    });
                }
            })
            .catch((err) => {
                setGetPostContentReqState(RequestStateEnum.Failure);
                setGetPostContentErrMsg(err.message);
                console.error(err);
            });
    }, [props.postid]);

    const addUserToGroup = (): void => {
        setAddUserToGroupReqState(RequestStateEnum.InProgress);
        if (groupid === -1) {
            setAddUserToGroupReqState(RequestStateEnum.Failure);
            setAddUserToGroupErrMsg('Unable to get the group id');
            return;
        }
        fetch(`${addUserToGroupUrl}`, { method: 'POST' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot add user to group.');
                }
                if (response.status === 409) {
                    throw new Error('User is already a member of this group.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .then(async () => {
                setAddUserToGroupReqState(RequestStateEnum.Success);
            })
            .catch((err) => {
                setAddUserToGroupReqState(RequestStateEnum.Failure);
                setAddUserToGroupErrMsg(err.message);
                console.error(err);
            });
    };

    const onJoinButtonPressed = () => {
        if (post === undefined) return;
        addUserToGroup();
        setPost({ ...post, memberOf: true });
    };

    const onPostClicked = () => {
        if (post === undefined) return;
        navigate(`/group/${post?.groupid}`);
    };

    if (getPostContentReqState === RequestStateEnum.None || getPostContentReqState === RequestStateEnum.InProgress) {
        return (
            <Card>
                <CircularProgress />
            </Card>
        );
    }

    if (getPostContentReqState === RequestStateEnum.Failure) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {getPostContentErrMsge}
            </Alert>
        );
    }

    if (!post) return null;
    return (
        <Card
            raised={true}
            sx={{ width: '100%', borderRadius: '24px', cursor: `${post.memberOf ? 'pointer' : 'default'}`, minWidth: '400px' }}
            onClick={post.memberOf ? onPostClicked : undefined}
            onMouseEnter={() => {
                post.memberOf ? setHeight(4) : setHeight(2);
            }}
            onMouseLeave={() => {
                setHeight(2);
            }}
            elevation={height}
        >
            <Box display={'flex'} flexDirection={'column'} padding={'8px'}>
                <Stack alignContent={'center'} flexDirection={'row'} padding={'8px 16px'} gap={'4px'}>
                    <Typography color="text.primary" variant="h5" fontWeight={'600'} alignItems={'center'} display={'flex'}>
                        {!post.memberOf ? post.groupName : post.username}
                    </Typography>
                    {!post.memberOf && (
                        <IconButton color={'primary'} onClick={onJoinButtonPressed}>
                            <AddCircleIcon fontSize="medium" />
                        </IconButton>
                    )}
                    {addUserToGroupReqState === RequestStateEnum.Failure ? (
                        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                            {addUserToGroupErrMsg}
                        </Alert>
                    ) : null}
                    <Typography
                        color="text.primary"
                        variant="body1"
                        display={'flex'}
                        alignItems={'center'}
                        marginLeft={'auto'}
                        fontWeight={600}
                    >
                        {new Date(post.date).toLocaleDateString()}
                    </Typography>
                </Stack>

                <Stack flexDirection={'row'} padding={'0 16px'}>
                    <Typography color="text.primary" variant="h5" fontWeight={600} sx={{ opacity: '50%' }}>
                        {!post.memberOf ? post.username : post.groupName}
                    </Typography>
                </Stack>

                <Box padding={'0px 16px'}>
                    <Typography color="text.primary" variant="body1" textAlign={'left'}>
                        {post.content}
                    </Typography>
                </Box>
                <Box display="flex" padding={'8px 16px'} justifyContent={'space-between'} alignContent={'center'}>
                    <CommentButton postid={props.postid} postInfo={post} userid={props.userid}></CommentButton>
                    <LikeButton mediaType="post" mediaid={props.postid} userid={props.userid}></LikeButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Post;
