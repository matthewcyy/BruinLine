import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import logo from '../../../images/BLINE LOGO OUTLINED.png';
import axios from 'axios';
import UserContext from "../../../context/userContext"

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function Profile() {
    const { userData, setUserData } =  useContext(UserContext);
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [groups, setGroups] = useState([]);
    const [favorites, setFavorites]  = useState([]); // Do the same for other data
    const [invitations, setInvitations] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState();

    const updateUserData = async () => {
        if(userData.user) {
            setUsername(userData.user.username)
            setEmail(userData.user.email)
            setPassword(userData.user.password)
            setGroups(userData.user.groups)
            setFavorites(userData.user.favFoods)
            setInvitations(userData.user.invitations)
            setId(userData.user.id);
        }
    }

    useEffect(() => {
        updateUserData();
    }, [userData])

    const rejectInvite = async (groupId) => {
        try {
            const reqBody = {}
            reqBody.id = id
            reqBody.groupId = groupId
            debugger;
            const indexOfInvite = invitations.findIndex(x => x.groupId === groupId)
            // console.log("INVITE'S INDEX", indexOfInvite)
            var invitationsCopy = invitations
            invitationsCopy.splice(indexOfInvite, 1)
            setInvitations([...invitationsCopy])
            const patchReq = await axios.patch("http://localhost:5000/users/rejectInvite", reqBody)
        } catch (err) {
            console.log("ERROR", err.response.data.msg)
        }
    }

    const acceptInvite = async (groupId, groupName) => {
        try {
            debugger;
            const reqBody = {}
            reqBody.groupId = groupId
            reqBody.groupName = groupName
            var newGroups = groups
            newGroups.push(reqBody)
            setGroups([...newGroups])
            reqBody.id = id
            const indexOfInvite = invitations.findIndex(x => x.groupId === groupId)
            // console.log("INVITE'S INDEX", indexOfInvite)
            var invitationsCopy = invitations
            invitationsCopy.splice(indexOfInvite, 1)
            setInvitations([...invitationsCopy])
            const patchReq = await axios.patch("http://localhost:5000/users/acceptInvite", reqBody)
        } catch (err) {
            console.log("ERROR", err.response.data.msg)
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        e.target.reset();
        try{
            const requestBody = {password, id};
            await axios.post("http://localhost:5000/users/changePassword", requestBody);
            setPassword("");
            alert("Password has been changed!")
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };


    return (
        <div class="container">
            <h2 class="title">Profile</h2>
            <div class="ProfilePictureContainer">
                <img src={logo} class="profilePicture" />
            </div>
            <div class="infoBoard">
                <div class="subInfo">
                    <p class="infoTitle">Username: {username}</p>
                    <p class="infoTitle">Email: {email}</p>
                    <div class="password">
                        <form onSubmit={submit}>
                            <input type="password" id="newPassword" onChange={obj => setPassword(obj.target.value)}/>
                            <input type="submit" id="submitNewPassword" value="Update Password" />
                        </form>
                    </div>
                    <br />
                    <div class="foods">
                        <p class="infoTitle">Favorite foods:</p>
                        <ul>
                            {favorites.map(foodName => {
                                return <li class="infoList">{foodName}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div class="subInfo">
                    <div class="groups">
                        <p class="infoTitle">Groups:</p>
                        <ul>
                            {groups.map(group => {
                                return <li class="infoList">{group.groupName}</li>
                            })}
                        </ul>
                    </div>
                    <br />
                    <Grid container spacing={0.5}>
                        <Grid item xs={12} class="infoTitle">Invitations:</Grid>
                        {
                            invitations.map((invite) => (
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing = {0.5}>
                                                <Grid item xs={4}>
                                                    <Box sx={{fontSize:"1.0rem"}}>
                                                        Group: {invite.groupName}
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Box sx={{fontSize:"1.0rem"}}>
                                                        From: {invite.inviter}
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <Button variant="contained" onClick={() => rejectInvite(invite.groupId)}>
                                                        Reject
                                                    </Button>
                                                    {/* <IconButton onClick={() => rejectInvite()}>
                                                        <CancelIcon style={{color: 'red'}} />
                                                    </IconButton> */}
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Button variant="contained" onClick={() => acceptInvite(invite.groupId, invite.groupName)}>
                                                        Accept
                                                    </Button>
                                                    {/* <IconButton onClick={() => acceptInvite()}>
                                                        <CheckBoxIcon style={{color: 'green'}} />
                                                    </IconButton> */}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                    {/* <div class="invitations">
                        <p class="infoTitle">Invitations:</p>
                        <ul>
                            {invitations.map(invite => {
                                return <li class="infoList">{invite}</li>
                            })}
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default Profile;