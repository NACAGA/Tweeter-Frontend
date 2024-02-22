import { Alert, Box, Button, CircularProgress, Fab, Typography } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { method, set } from 'lodash';

interface Props {
    mediaid: number;
    mediaType: 'post' | 'comment';
    userid: number;
}

function Like(props: Props) {
    const [likeCountReqState, setLikeCountReqState] = React.useState(RequestStateEnum.None);
    const [userLikedReqState, setUserLikedReqState] = React.useState(RequestStateEnum.None);
    const [toggleLikeReqState, setToggleLikeReqState] = React.useState(RequestStateEnum.Success);
    const [likeCountErrMsg, setLikeCountErrorMessage] = React.useState('');
    const [userLikedErrMsg, setUserLikedErrorMessage] = React.useState('');
    const [toggleLikeErrMsg, setToggleLikeErrorMessage] = React.useState('');
    const [numberOfLikes, setNumberOfLikes] = React.useState<number>(0);
    const [liked, setLiked] = React.useState<boolean>(false);

    const baseUrl = 'http://localhost:3002/message-board/like';
    const likeCountQueryParams: { [key: string]: boolean } = {
        count: true,
    };
    const likeCountUrl = new URL(`${baseUrl}/${props.mediaType}/${props.mediaid}`);
    const userLikedUrl = new URL(`${baseUrl}/${props.mediaType}/${props.mediaid}`);
    const toggleLikeUrl = new URL(`${baseUrl}/${props.userid}/${props.mediaType}/${props.mediaid}`);
    Object.keys(likeCountQueryParams).forEach((key) => likeCountUrl.searchParams.append(key, likeCountQueryParams[key] as any));

    React.useEffect(() => {
        setLikeCountReqState(RequestStateEnum.InProgress);
        fetch(`${likeCountUrl}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve like count data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    const numberOfLikes: number = data.response.count;
                    setLikeCountReqState(RequestStateEnum.Success);
                    setNumberOfLikes(numberOfLikes);
                }
            })
            .catch((err) => {
                setLikeCountReqState(RequestStateEnum.Failure);
                setLikeCountErrorMessage(err.message);
                console.error(err);
            });
    }, [props.mediaid]);

    React.useEffect(() => {
        setUserLikedReqState(RequestStateEnum.InProgress);
        fetch(`${userLikedUrl}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve like data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    const liked: boolean =
                        data.response.result.length === 0 ? false : data.response.result.some((like: any) => like.user_id === props.userid);
                    setUserLikedReqState(RequestStateEnum.Success);
                    setLiked(liked);
                }
            })
            .catch((err) => {
                setUserLikedReqState(RequestStateEnum.Failure);
                setUserLikedErrorMessage(err.message);
                console.error(err);
            });
    }, []);

    const toggleLike = (): void => {
        setToggleLikeReqState(RequestStateEnum.InProgress);
        fetch(`${toggleLikeUrl}`, {
            method: 'POST',
        })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot toggle like data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .then(async () => {
                setToggleLikeReqState(RequestStateEnum.Success);
                setNumberOfLikes(liked ? numberOfLikes - 1 : numberOfLikes + 1);
                setLiked(!liked);
            })
            .catch((err) => {
                setToggleLikeReqState(RequestStateEnum.Failure);
                setToggleLikeErrorMessage(err.message);
                console.error(err);
            });
    };

    if (
        likeCountReqState === RequestStateEnum.InProgress ||
        userLikedReqState === RequestStateEnum.InProgress ||
        likeCountReqState === RequestStateEnum.None ||
        userLikedReqState === RequestStateEnum.None
    ) {
        return (
            <Fab size="small" variant="extended" color={'white'} disabled={true}>
                <CircularProgress />
            </Fab>
        );
    }

    if (likeCountReqState === RequestStateEnum.Failure || userLikedReqState === RequestStateEnum.Failure) {
        return (
            <Box>
                <Fab size="small" variant="extended" color={'white'} disabled={true}>
                    <CircularProgress />
                </Fab>
                {likeCountReqState === RequestStateEnum.Failure ? (
                    <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                        {likeCountErrMsg}
                    </Alert>
                ) : null}
                {userLikedReqState === RequestStateEnum.Failure ? (
                    <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                        {userLikedErrMsg}
                    </Alert>
                ) : null}
            </Box>
        );
    }

    if (toggleLikeReqState === RequestStateEnum.InProgress || toggleLikeReqState === RequestStateEnum.None) {
        return (
            <Fab size="small" variant="extended" color={liked ? 'primary' : 'white'} disabled={true}>
                {liked ? <FavoriteIcon sx={{ mr: 1 }} /> : <FavoriteBorderIcon sx={{ mr: 1 }} />}
                <Typography variant="body1" fontWeight={'600'}>
                    {numberOfLikes}
                </Typography>
            </Fab>
        );
    }

    if (toggleLikeReqState === RequestStateEnum.Failure) {
        return (
            <Box>
                <Fab size="small" variant="extended" color={liked ? 'primary' : 'white'} disabled={true}>
                    {liked ? <FavoriteIcon sx={{ mr: 1 }} /> : <FavoriteBorderIcon sx={{ mr: 1 }} />}
                    <Typography variant="body1" fontWeight={'600'}>
                        {numberOfLikes}
                    </Typography>
                </Fab>
                <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                    {toggleLikeErrMsg}
                </Alert>
            </Box>
        );
    }

    return (
        <Fab size="small" variant="extended" color={liked ? 'primary' : 'white'} onClick={toggleLike}>
            {liked ? <FavoriteIcon sx={{ mr: 1 }} /> : <FavoriteBorderIcon sx={{ mr: 1 }} />}
            <Typography variant="body1" fontWeight={'600'}>
                {numberOfLikes}
            </Typography>
        </Fab>
    );
}

export default Like;
