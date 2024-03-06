import React from 'react';
import { Alert, Box, Card, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LikeButton from '../like-button/LikeButton';
import CommentButton from '../comment/comment-button/CommentButton';
import { TPost } from '../../types/TPost';
import PostUtils from '../../utils/post-utils';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { useNavigate } from 'react-router-dom';
import { TGroup } from 'lib/types/TGroup';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
interface Props {
    groupid: number;
    userid: number;
    memberOf: boolean;
}

function Group(props: Props) {
    const [getGroupInfoReqState, setGetGroupInfoReqState] = React.useState(RequestStateEnum.None);
    const [getGroupInfoErrMsg, setGetGroupInfoErrMsg] = React.useState('');
    const [groupInfo, setGroupInfo] = React.useState<TGroup | undefined>(undefined);
    const [getPostContentReqState, setGetPostContentReqState] = React.useState(RequestStateEnum.None);
    const [getPostContentErrMsge, setGetPostContentErrMsg] = React.useState('');
    const [postContent, setPostContent] = React.useState<string>('');
    const [getNumberOfMembersReqState, setGetNumberOfMembersReqState] = React.useState(RequestStateEnum.None);
    const [getNumberOfMembersErrMsg, setGetNumberOfMembersErrMsg] = React.useState('');
    const [numberOfMembers, setNumberOfMembers] = React.useState<number>(0);
    const [addUserToGroupReqState, setAddUserToGroupReqState] = React.useState(RequestStateEnum.None);
    const [addUserToGroupErrMsg, setAddUserToGroupErrMsg] = React.useState('');
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:3002/message-board';
    const groupMembersCountQueryParams: { [key: string]: boolean } = {
        count: true,
    };
    const postUrl = new URL(`${baseUrl}/post/group/${props.groupid}`);
    const groupInfoUrl = new URL(`${baseUrl}/group/${props.groupid}`);
    const groupMembersCountUrl = new URL(`${baseUrl}/user/${props.groupid}`);
    const addUserToGroupUrl = new URL(`${baseUrl}/user/${props.userid}/${props.groupid}`);
    Object.keys(groupMembersCountQueryParams).forEach((key) =>
        groupMembersCountUrl.searchParams.append(key, groupMembersCountQueryParams[key] as any)
    );

    React.useEffect(() => {
        setGetNumberOfMembersReqState(RequestStateEnum.InProgress);
        fetch(`${groupMembersCountUrl}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve group data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    setGetNumberOfMembersReqState(RequestStateEnum.Success);
                    setNumberOfMembers(data.response.count);
                }
            })
            .catch((err) => {
                setGetNumberOfMembersReqState(RequestStateEnum.Failure);
                setGetNumberOfMembersErrMsg(err.message);
                console.error(err);
            });
    }, [props.groupid]);

    React.useEffect(() => {
        setGetGroupInfoReqState(RequestStateEnum.InProgress);
        fetch(`${groupInfoUrl}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve group data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    setGetGroupInfoReqState(RequestStateEnum.Success);
                    console.log(data.response.group);
                    setGroupInfo(data.response.group);
                }
            })
            .catch((err) => {
                setGetGroupInfoReqState(RequestStateEnum.Failure);
                setGetGroupInfoErrMsg(err.message);
                console.error(err);
            });
    }, [props.groupid]);

    React.useEffect(() => {
        setGetPostContentReqState(RequestStateEnum.InProgress);
        fetch(`${postUrl}`, { method: 'GET' })
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
                    setGetPostContentReqState(RequestStateEnum.Success);
                    if (data.response.result[0].content) {
                        setPostContent(data.response.result[0].content);
                    } else {
                        setPostContent('No posts have been made to this group yet. Join and be the first!');
                    }
                }
            })
            .catch((err) => {
                setGetPostContentReqState(RequestStateEnum.Failure);
                setGetPostContentErrMsg(err.message);
                console.error(err);
            });
    }, [props.groupid]);

    const onJoinButtonPressed = (): void => {
        setAddUserToGroupReqState(RequestStateEnum.InProgress);
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
                navigate(`/group/${props.groupid}`);
            })
            .catch((err) => {
                setAddUserToGroupReqState(RequestStateEnum.Failure);
                setAddUserToGroupErrMsg(err.message);
                console.error(err);
            });
    };

    if (getGroupInfoReqState === RequestStateEnum.None || getGroupInfoReqState === RequestStateEnum.InProgress) {
        return <CircularProgress />;
    }

    if (groupInfo === undefined) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {getGroupInfoErrMsg}
            </Alert>
        );
    }

    return (
        <Card raised={true} sx={{ width: '100%', borderRadius: '24px', minWidth: '400px' }}>
            <Box display={'flex'} flexDirection={'column'} padding={'16px'} gap={'8px'}>
                <Stack alignContent={'center'} flexDirection={'row'}>
                    <Typography variant={'h5'} fontWeight={600} alignItems={'center'} display={'flex'}>
                        {groupInfo.name}
                    </Typography>
                    <IconButton color={'primary'} onClick={onJoinButtonPressed} sx={{ marginLeft: 'auto' }}>
                        <AddCircleIcon fontSize="medium" />
                    </IconButton>
                    {addUserToGroupReqState === RequestStateEnum.Failure ? (
                        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                            {addUserToGroupErrMsg}
                        </Alert>
                    ) : null}
                </Stack>
                <Stack justifyContent={'start'} flexDirection={'row'}>
                    <Typography variant={'h6'} fontWeight={600} alignItems={'center'} display={'flex'} sx={{ opacity: '50%' }}>
                        {groupInfo.description}
                    </Typography>
                </Stack>
                <Stack justifyContent={'start'} flexDirection={'row'}>
                    <Box display={'flex'} gap={'8px'} alignItems={'center'}>
                        <PeopleAltOutlinedIcon sx={{ opacity: '50%' }} />
                        <Typography variant={'h6'} fontWeight={600} sx={{ opacity: '50%' }}>
                            {numberOfMembers}
                        </Typography>
                    </Box>
                    <Box marginLeft={'auto'} display={'flex'} gap={'8px'} alignItems={'center'}>
                        <AccessTimeIcon sx={{ opacity: '50%' }} />
                        <Typography variant={'h6'} fontWeight={600} sx={{ opacity: '50%' }}>
                            {new Date(groupInfo.dateCreated).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Stack>
                <Typography variant={'h6'} fontWeight={600} alignItems={'center'} display={'flex'}>
                    Popular Post
                </Typography>
                <Typography variant={'body1'} fontWeight={400} alignItems={'center'} display={'flex'}>
                    {postContent}
                </Typography>
            </Box>
        </Card>
    );
}

export default Group;
