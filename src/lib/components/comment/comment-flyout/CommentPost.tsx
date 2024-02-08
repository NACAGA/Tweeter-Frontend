import { Box, Stack, Typography } from '@mui/material';
import { TPost } from 'lib/types/TPost';
import LikeButton from 'lib/components/like-button/LikeButton';

interface Props {
    postInfo: TPost;
    postid: number;
}

function CommentPost(props: Props) {
    return (
        <Stack borderBottom={`2px solid black`} height="fit-content" flexDirection={'column'} gap={'16px'} padding={'8px 24px'}>
            <Stack alignContent={'ceneter'} flexDirection={'row'} padding={'0 0'}>
                <Typography color="text.primary" variant="h5" fontWeight={'600'} alignItems={'center'} display={'flex'}>
                    {props.postInfo.username}
                </Typography>
                <Typography color="text.primary" variant="h5" fontWeight={'600'} alignItems={'center'} display={'flex'} marginLeft={'auto'}>
                    {new Date(props.postInfo.date).toLocaleDateString()}
                </Typography>
            </Stack>
            <Box padding={'0 0'}>
                <Typography color="text.primary" variant="body1" textAlign={'left'}>
                    {props.postInfo.content}
                </Typography>
            </Box>
            <Stack marginLeft={'auto'}>
                <LikeButton mediaid={props.postid} mediaType={'post'}></LikeButton>
            </Stack>
        </Stack>
    );
}

export default CommentPost;
