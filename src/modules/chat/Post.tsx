import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent } from "@mui/material";

type Props = {
    title: string;
    description: string;
};

function Post(props: Props) {
    return (
        <Card variant="outlined">
            <CardContent sx={{ textAlign: "left" }}>
                <Typography gutterBottom variant="h3" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    );
}

export default Post;
