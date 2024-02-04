import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Alert, Container } from '@mui/material';
import { VerifySessionTokenOrRedirect } from 'general/VerificationUtil';
import { SupervisedUserCircleOutlined } from '@mui/icons-material';
import { RequestStateEnum } from 'lib/enums/RequestStateEnum';

function ChangeUsername() {
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');
    //const [isVerified, setIsVerified] = React.useState(false);
    const navigate = useNavigate();

    //VerifySessionTokenOrRedirect(navigate, setIsVerified);

    //window.location.search = "";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await fetch('http://localhost:3000/user-authentication/change-username', {
            method: 'PATCH',
            body: JSON.stringify({
                username: data.get('username'),
                sessionToken: sessionStorage.getItem('sessionToken'),
                new_username: data.get('new_username'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.code === 200) {
                    navigate('/chat');
                    setReqState(RequestStateEnum.Success);
                } else {
                    setErrMsg(data.message);
                    setReqState(RequestStateEnum.Failure);
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                console.log(err.message);
            });
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SupervisedUserCircleOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Change Username
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container maxWidth="sm" spacing={2}>
                    <Grid item xs={12}>
                        <TextField required fullWidth id="username" label="Current User Name" name="username" autoComplete="username" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth id="new_username" label="New User Name" name="new_username" autoComplete="username" />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Change Username
                </Button>
                {reqState === RequestStateEnum.Failure ? (
                    <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                        {errMsg}
                    </Alert>
                ) : null}
            </Box>
        </Container>
    );
}

export default ChangeUsername;
