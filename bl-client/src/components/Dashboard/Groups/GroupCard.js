import React, { useState, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function GroupCard(props) {
    const [groupMembers, setGroupMembers] = useState([])
    const [inviteeUsername, setInviteeUsername] = useState("")

    console.log("WHAT")
    const getGroupMembers = async () => {
        const reqBody = {}
        reqBody.groupId = props.groupObj.groupId
        console.log("HEY", reqBody)
        const getResponse = await axios.post('http://localhost:5000/groups/getGroupMembers', reqBody);
        setGroupMembers(getResponse.data.groupMembers)
    }

    const inviteUser = async () => {
        const reqBody = {}
        reqBody.inviteeUsername = inviteeUsername
        reqBody.inviterUsername = props.inviter
        reqBody.groupName = props.groupObj.groupName
        reqBody.groupId = props.groupObj.groupId
        setInviteeUsername("")
        const getResponse = await axios.patch('http://localhost:5000/users/inviteToGroup', reqBody);
    }

    useEffect(() => {
        if (props.members.length !== 0)
        {
            setGroupMembers(props.members)
        }
        getGroupMembers()
    }, [])
    console.log("HIHIHI")
    return (
        <Box xs={12}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={0.5}>
                        <Grid item xs={12}>
                            <Box sx={{fontSize:"1.5rem", fontWeight:"bold", textAlign:"left"}}>
                                {props.groupObj.groupName}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{fontSize:"1.25rem", fontWeight:"bold", textAlign:"left", marginTop:"0.5rem"}}>
                                <u>Group Members:</u>
                            </Box>
                            <Grid container spacing={0.5}>
                                {
                                    groupMembers.map((member) => (
                                        <Grid item xs={3}>
                                            <Box sx={{fontSize:"1.15rem", fontWeight:"normal", textAlign:"left"}}>
                                                {member}
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField label="Invite a member by username" variant="outlined" fullWidth size="small" value={inviteeUsername} onChange={(e) => setInviteeUsername(e.target.value)}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => inviteUser()} variant="contained">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default GroupCard;