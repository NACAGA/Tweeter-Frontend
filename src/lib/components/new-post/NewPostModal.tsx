import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Stack, TextField } from '@mui/material';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { set } from 'lodash';
import { Refresh } from '@mui/icons-material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: '32px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    userid: number;
    groupid: number;
    groupName: string;
}

export default function NewPostModal(props: Props) {
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');

    const baseUrl = 'http://localhost:3002/message-board';
    const createPostUrl = new URL(`${baseUrl}/post/${props.userid}/${props.groupid}`);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        fetch(createPostUrl, {
            method: 'POST',
            body: JSON.stringify({
                content: data.get('post-content'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot create group.');
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                if (data) {
                    setReqState(RequestStateEnum.Success);
                    const postCreatedEvent = new CustomEvent('postCreated', {});
                    window.dispatchEvent(postCreatedEvent);
                    props.onClose(undefined as unknown as React.MouseEvent<HTMLButtonElement>);
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.log(err.message);
            });
    };

    return (
        <div>
            <Modal open={props.open} onClose={props.onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box component="form" sx={style} onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Post to {props.groupName}
                    </Typography>
                    <TextField id="post-content" multiline label="Content" maxRows={6} fullWidth required name="post-content"></TextField>
                    <Stack direction={'row'} justifyContent={'flex-end'}>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </Stack>
                    {reqState === RequestStateEnum.Failure ? (
                        <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                            {errMsg}
                        </Alert>
                    ) : null}
                </Box>
            </Modal>
        </div>
    );
}
