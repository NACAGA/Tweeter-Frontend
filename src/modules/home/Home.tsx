import { Stack } from '@mui/material';
import Post from '../../lib/components/post/Post';
import { Height } from '@mui/icons-material';

function Home() {
    return (
        <Stack gap={'24px'} padding={'64px 64px'} sx={{ height: 'fit-content' }}>
            <Post postid={1} userid={1}></Post>
            <Post postid={2} userid={1}></Post>
            <Post postid={3} userid={1}></Post>
            <Post postid={5} userid={1}></Post>
        </Stack>
    );
}

export default Home;
