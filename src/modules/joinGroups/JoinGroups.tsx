import Group from 'lib/components/group/Group';
import PostUtils from 'lib/utils/post-utils';
import AddCommentButton from 'lib/components/comment/add-comment/AddCommentButton';
import React from 'react';
import { RequestStateEnum } from 'lib/types/enums/RequestStateEnum';
import { set } from 'lodash';
import { Alert, CircularProgress, Grid, Stack, Typography } from '@mui/material';

interface Props {
    userid: number;
}

function JoinGroups(props: Props) {
    const [groupIds, setGroupIds] = React.useState<number[] | undefined>(undefined);
    const [reqState, setReqState] = React.useState(RequestStateEnum.None);
    const [errMsg, setErrMsg] = React.useState('');

    const baseUrl = 'http://localhost:3002/message-board';
    const groupsUserIsntInQueryParams: { [key: string]: boolean } = {
        notIn: true,
    };
    const getGroupsUserIsntInEndpointUrl = new URL(`${baseUrl}/user/groups/${props.userid}`);
    Object.keys(groupsUserIsntInQueryParams).forEach((key) =>
        getGroupsUserIsntInEndpointUrl.searchParams.append(key, groupsUserIsntInQueryParams[key] as any)
    );

    React.useEffect(() => {
        setReqState(RequestStateEnum.InProgress);
        fetch(`${getGroupsUserIsntInEndpointUrl}`, { method: 'GET' })
            .then((response) => {
                if (response.status === 500) {
                    throw new Error('Internal Server Error: Cannot retrieve group data from server.');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(async (data) => {
                if (data) {
                    const groupIds: number[] = data.response.groups.map((group: any) => group.id);
                    setReqState(RequestStateEnum.Success);
                    setGroupIds(groupIds);
                }
            })
            .catch((err) => {
                setReqState(RequestStateEnum.Failure);
                setErrMsg(err.message);
                console.error(err);
            });
    }, [props.userid]);

    if (reqState === RequestStateEnum.None || reqState === RequestStateEnum.InProgress) {
        return <CircularProgress />;
    }

    if (reqState === RequestStateEnum.Failure) {
        return (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
                {errMsg}
            </Alert>
        );
    }

    if (groupIds === undefined) return null;

    return (
        <Grid container spacing={2} padding={'64px 64px'} sx={{ height: 'fit-content' }}>
            {groupIds.length <= 0 ? (
                <Typography variant="body1" color="text.primary" textAlign={'center'}>
                    No groups were found
                </Typography>
            ) : (
                groupIds.map((groupid: number) => {
                    return (
                        <Grid item xs={6}>
                            <Group groupid={groupid} userid={props.userid} memberOf={false}></Group>
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
}

export default JoinGroups;
