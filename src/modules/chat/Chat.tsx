import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifySessionTokenOrRedirect } from "general/VerificationUtil";

function Chat() {
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    VerifySessionTokenOrRedirect(navigate, setIsVerified);

    let description =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus rutrum tellus pellentesque. Morbi leo urna molestie at elementum. Arcu risus quis varius quam quisque id. Tellus in metus vulputate eu scelerisque. Donec ultrices tincidunt arcu non sodales. Id aliquet risus feugiat in ante metus. Aliquam sem et tortor consequat id porta. Fermentum dui faucibus in ornare. Felis imperdiet proin fermentum leo vel orci porta non. Commodo ullamcorper a lacus vestibulum sed.";

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 8,
                mb: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h2">
                Posts
            </Typography>
            <Stack spacing={2} mt={2}>
                <Post title="Title" description={description} />
                <Post title="Title" description={description} />
                <Post title="Title" description={description} />
                <Post title="Title" description={description} />
                <Post title="Title" description={description} />
                <Post title="Title" description={description} />
            </Stack>
        </Container>
    );
}

export default Chat;
