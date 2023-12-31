import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const RequestState = {
    None: 0,
    InProgess: 1,
    Success: 2,
    Failure: 3,
};

function Signup() {
    const [reqState, setReqState] = React.useState(RequestState.None);
    const [errMsg, setErrMsg] = React.useState("");

    const navigate = useNavigate();

    const queryParameters = new URLSearchParams(window.location.search);
    const accountCreated = queryParameters.get("account_created") || false;

    //window.location.search = "";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await fetch("http://localhost:3000/user-authentication/login-user", {
            method: "POST",
            body: JSON.stringify({
                username: data.get("username"),
                password: data.get("password"),
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // fix later like this, requires backend rework https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js
                sessionStorage.setItem("sessionToken", data.sessionToken);

                if (data.code === 200) {
                    navigate("/chat");
                    setReqState(RequestState.Success);
                } else {
                    setErrMsg(data.message);
                    setReqState(RequestState.Failure);
                }
            })
            .catch((err) => {
                setReqState(RequestState.Failure);
                console.log(err.message);
            });
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField required fullWidth id="username" label="User Name" name="username" autoComplete="username" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth name="password" label="Password" type="password" id="password" />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Log In
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="signup" variant="body2">
                            Don't have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
                {reqState === RequestState.Failure ? (
                    <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                        {errMsg}
                    </Alert>
                ) : null}
                {accountCreated ? (
                    <Alert severity="success" sx={{ mt: 3, mb: 2 }}>
                        Account Successfully Created
                    </Alert>
                ) : null}
            </Box>
        </Box>
    );
}

export default Signup;
