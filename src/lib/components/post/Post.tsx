import React from 'react';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

interface Props {
    postid: number;
}

type PostObject = {
    username: string;
    date: Date;
    content: string;
    memberOf: boolean;
    groupName: string;
    likes: number;
    comments: number;
    userLiked: boolean;
};

const createPost = (
    username: string,
    date: Date,
    content: string,
    memberOf: boolean,
    groupName: string,
    likes: number,
    comments: number,
    userLiked: boolean
) => ({
    username: username,
    date: date,
    content: content,
    memberOf: memberOf,
    groupName: groupName,
    likes: likes,
    comments: comments,
    userLiked: userLiked,
});

function Post(props: Props) {
    const [post, setPost] = React.useState<PostObject | undefined>(undefined);
    const [height, setHeight] = React.useState<number>(2);

    React.useEffect(() => {
        // fetch post from server
        const content =
            'Unicorns, with their ethereal grace, tread lightly, leaving a faint shimmer in their wake. They remind us that beauty is transient, and must be approached with the utmost gentleness and respect. #UnicornWhispers #MagicInDelicacy 🦄✨';
        setPost(createPost('Stephen Speilberg', new Date(), content, false, 'Unicorn Enthusiests', 0, 0, false));
    }, [props.postid]);

    const onJoinButtonPressed = () => {
        if (post === undefined) return;
        setPost({ ...post, memberOf: true });
    };

    const onLikeButtonPressed = () => {
        if (post === undefined) return;
        setPost({ ...post, userLiked: !post.userLiked });
    };

    const onCommentButtonPressed = () => {
        if (post === undefined) return;
        setPost({ ...post, comments: post.comments + 1 });
    };

    const onPostClicked = () => {
        if (post === undefined) return;
    };

    if (post === undefined) return null;
    return (
        <Card
            raised={true}
            sx={{ width: 'fit-content', borderRadius: '24px', cursor: `${post.memberOf ? 'pointer' : 'default'}` }}
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
                    <Typography
                        color="text.primary"
                        variant="h5"
                        fontWeight={'600'}
                        display={'flex'}
                        alignItems={'center'}
                        marginLeft={'auto'}
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
                    <CommentButton onClick={onCommentButtonPressed} comments={post.comments}></CommentButton>
                    <LikeButton onClick={onLikeButtonPressed} liked={post.userLiked} likes={post.likes}></LikeButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Post;
