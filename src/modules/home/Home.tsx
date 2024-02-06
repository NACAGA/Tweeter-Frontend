import { Stack } from '@mui/material';
import Post from '../../lib/components/post/Post';
import { Height } from '@mui/icons-material';

function Home() {
    return (
        <Stack gap={'24px'} padding={'64px 64px'} sx={{ height: 'fit-content' }}>
            <Post postid={1}></Post>
            <Post postid={1}></Post>
            <Post postid={1}></Post>
            <Post postid={1}></Post>
        </Stack>
    );
}

export default Home;
