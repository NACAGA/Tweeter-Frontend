import { Alert, Button, CircularProgress, Fab, Typography } from '@mui/material';
import React from 'react';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import CommentFlyout from '../comment-flyout/CommentFlyout';
import { TPost } from 'lib/types/TPost';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { set } from 'lodash';
import AddCommentModal from './AddCommentModal';

interface Props {
    postid: number;
    sx?: any;
    userid: number;
    refreshComments: () => void;
}

function AddCommentButton(props: Props) {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const toggleModal = () => {
        if (modalOpen) {
            props.refreshComments();
        }
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <Button variant="contained" color={'secondary'} onClick={toggleModal}>
                Add a Comment
            </Button>
            <AddCommentModal onClose={toggleModal} open={modalOpen} postid={props.postid} userid={props.userid}></AddCommentModal>
        </div>
    );
}

export default AddCommentButton;
