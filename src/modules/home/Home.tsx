import { Alert, CircularProgress, ListItem, Stack, Typography } from '@mui/material';
import Post from '../../lib/components/post/Post';
import { Height } from '@mui/icons-material';
import React from 'react';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';

interface Props {
    daysBack: number;
}

const postEndpointUrl = 'http://localhost:3002/message-board/post/';

function Home(props: Props) {
    const [postIds, setPostIds] = React.useState<number[] | undefined>(undefined);
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(`${postEndpointUrl}date/${props.daysBack}`, { method: 'GET' })
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
    }, []);

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

    if (postIds === undefined) return null;

    return (
        <Stack gap={'24px'} padding={'64px 64px'} sx={{ height: 'fit-content' }}>
            {postIds.length <= 0 ? (
                <Typography variant="body1" color="text.primary" textAlign={'center'}>
                    No posts were found
                </Typography>
            ) : (
                postIds.map((postId: number) => {
                    return <Post postid={postId} userid={1}></Post>;
                })
            )}
        </Stack>
    );
}

export default Home;
