import React from 'react';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LikeButton from '../like-button/LikeButton';
import CommentButton from '../comment/comment-button/CommentButton';
import { TPost } from '../../types/TPost';
import PostUtils from '../../utils/post-utils';

interface Props {
    postid: number;
}

function Post(props: Props) {
    const [post, setPost] = React.useState<TPost | undefined>(undefined);
    const [height, setHeight] = React.useState<number>(2);

    React.useEffect(() => {
        // fetch post from server
        const content =
            'Unicorns, with their grace, tread lightly, leaving a faint shimmer in their wake. They remind us that beauty is transient, and must be approached with the utmost gentleness and respect. #UnicornWhispers #MagicInDelicacy 🦄✨';
        setPost(PostUtils.createPost('Stephen Speilberg', new Date(), content, false, 'Unicorn Enthusiests'));
    }, [props.postid]);

    const onJoinButtonPressed = () => {
        if (post === undefined) return;
        setPost({ ...post, memberOf: true });
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
                    <CommentButton postid={1} postInfo={post}></CommentButton>
                    <LikeButton mediaType="post" mediaid={props.postid}></LikeButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Post;
