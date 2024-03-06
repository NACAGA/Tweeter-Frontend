import { Alert, Box, Button, CircularProgress, Fab, Typography } from '@mui/material';
import React from 'react';
import NewPostModal from './NewPostModal';

interface Props {
    userid: number;
    groupid: number;
    groupname: string;
}

function NewPostButton(props: Props) {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <Box position={'fixed'} bottom={24} right={12}>
            <Button variant="contained" color={'primary'} onClick={toggleModal}>
                Create a Post
            </Button>
            <NewPostModal
                onClose={toggleModal}
                open={modalOpen}
                groupid={props.groupid}
                userid={props.userid}
                groupName={props.groupname}
            ></NewPostModal>
        </Box>
    );
}

export default NewPostButton;
