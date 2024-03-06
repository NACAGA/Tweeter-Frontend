import { Alert, Box, Grid, Stack, Typography, Button } from '@mui/material';
import { url } from 'inspector';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import Post from '../../lib/components/post/Post';
import React from 'react';
import { useParams } from 'react-router-dom';
import GroupUtils from '../../lib/utils/group-utils';
import NewPostButton from 'lib/components/new-post/NewPostButton';
import { group } from 'console';

interface Props {
    userid: number;
}

function GroupPosts(props: Props) {
    const [groupInfo, setGroupInfo] = React.useState<any>();
    const [getGroupInfoReqState, setGetGroupInfoReqState] = React.useState(RequestStateEnum.None);
    const [getGroupInfoErrMsg, setGetGroupInfoErrMsg] = React.useState('');
    const [userIsInGroup, setUserIsInGroup] = React.useState<boolean>(false);
    const [postIds, setPostIds] = React.useState<number[] | undefined>(undefined);
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');

    const [postCreatedTrigger, setPostCreatedTrigger] = React.useState<number>(0);

    const { id } = useParams();

    const baseUrl = 'http://localhost:3002/message-board';
    const getPostsFromAGroupEndpoint = new URL(`${baseUrl}/post/group/${id}`);
    const getGroupInfoEndpoint = new URL(`${baseUrl}/group/${id}`);
    const userIsInGroupEndpoint = new URL(`${baseUrl}/user/groups/${props.userid}`);

    React.useEffect(() => {
        fetch(userIsInGroupEndpoint, { method: 'GET' })
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
                    const groupIds: number[] = data.response.groups.map((group: any) => group.id);
                    setUserIsInGroup(groupIds.includes(Number(id)));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [props.userid]);

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(getGroupInfoEndpoint, { method: 'GET' })
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
                    const group = data.response.group;
                    const groupInfo: any = GroupUtils.createGroup(group.name, group.dateCreated, group.description);
                    setGetGroupInfoReqState(RequestStateEnum.Success);
                    setGroupInfo(groupInfo);
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.userid]);

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(getPostsFromAGroupEndpoint, { method: 'GET' })
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
                    const postIds: number[] = data.response.posts.map((post: any) => post.id);
                    setReqState(RequestStateEnum.Success);
                    setPostIds(postIds.sort((a, b) => b - a));
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.userid, postCreatedTrigger]);

    React.useEffect(() => {
        const handlePostCreated = () => {
            setPostCreatedTrigger((prev) => prev + 1);
        };

        window.addEventListener('postCreated', handlePostCreated);

        return () => {
            window.removeEventListener('postCreated', handlePostCreated);
        };
    }, []);

    if (!userIsInGroup) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                You are not a member of this group. Join it to see it's posts
            </Alert>
        );
    }

    if (getGroupInfoReqState === RequestStateEnum.None || getGroupInfoReqState === RequestStateEnum.InProgress) {
        return null;
    }

    if (getGroupInfoReqState === RequestStateEnum.Failure) {
        return null;
    }

    if (reqState === RequestStateEnum.None || reqState === RequestStateEnum.InProgress) {
        return null;
    }

    if (reqState === RequestStateEnum.Failure) {
        return null;
    }

    if (postIds === undefined) return null;

    return (
        <Stack sx={{ height: 'fit-content' }} padding={'64px 64px'} gap={'12px'}>
            <Typography variant="h2" fontWeight={600} color="text.primary" textAlign={'left'}>
                {groupInfo.name}
            </Typography>
            <Box display={'flex'}>
                <Typography variant="h4" textAlign={'left'} fontWeight={600} sx={{ opacity: '50%' }}>
                    {groupInfo.description}
                </Typography>
                <Typography variant="h4" marginLeft={'auto'} textAlign={'right'} fontWeight={600} sx={{ opacity: '50%' }}>
                    Created On: {new Date(groupInfo.dateCreated).toDateString()}
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ height: 'fit-content' }}>
                {postIds.length <= 0 ? (
                    <Alert severity="info" sx={{ mt: 5 }}>
                        No posts have been made in this group yet. Be the first!
                    </Alert>
                ) : (
                    postIds.map((postid: number) => {
                        return (
                            <Grid item xs={12}>
                                <Post postid={postid} userid={props.userid}></Post>
                            </Grid>
                        );
                    })
                )}
            </Grid>
            <NewPostButton userid={props.userid} groupid={Number(id)} groupname={groupInfo.name} />
        </Stack>
    );
}

export default GroupPosts;
