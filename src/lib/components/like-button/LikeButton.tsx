import { Button } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    mediaid: number;
    mediaType: 'post' | 'comment';
}

const testApiUrl = 'https://42a48506-601b-4617-9bf6-0ac9e4602e0d.mock.pstmn.io';

function Like(props: Props) {
    const [numberOfLikes, setNumberOfLikes] = React.useState<number>(0);
    const [liked, setLiked] = React.useState<boolean>(false);

    React.useEffect(() => {
        // fetch(`${testApiUrl}/like/${props.mediaType}/${props.mediaid}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setNumberOfLikes(data.response.likes.length);
        //     });
        setNumberOfLikes(0);
    }, [props.mediaid]);

    React.useEffect(() => {
        // fetch(`${testApiUrl}/like/${props.mediaType}/${props.mediaid}/user`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setLiked(data.response.liked);
        //     })
        //     .catch((err) => {});
        setLiked(false);
    }, []);

    const toggleLike = (): void => {
        // fetch(`${testApiUrl}/like/${props.mediaType}/${props.mediaid}`, {
        //     method: liked ? 'DELETE' : 'POST',
        // }).catch((err) => {});
        setNumberOfLikes(liked ? numberOfLikes - 1 : numberOfLikes + 1);
        setLiked(!liked);
    };

    return (
        <Button
            startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            color={liked ? 'primary' : 'gray'}
            onClick={toggleLike}
            variant="outlined"
            sx={{ border: '2px solid' }}
        >
            {numberOfLikes}
        </Button>
    );
}

export default Like;
