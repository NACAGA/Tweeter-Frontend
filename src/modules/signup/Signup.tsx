import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RequestStateEnum } from '../../lib/types/enums/RequestStateEnum';

function Signup() {
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setReqState(RequestStateEnum.InProgress);

        const data = new FormData(event.currentTarget);
        await fetch('http://localhost:3000/user-authentication/create-user', {
            method: 'POST',
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password'),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 201) {
                    navigate('/login?account_created=true');
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

    let reqInProgress = reqState === RequestStateEnum.InProgress;

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            disabled={reqInProgress}
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={reqInProgress}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                <Button disabled={reqInProgress} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                {reqState === RequestStateEnum.Failure ? (
                    <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                        {errMsg}
                    </Alert>
                ) : null}
            </Box>
        </Box>
    );
}

export default Signup;
