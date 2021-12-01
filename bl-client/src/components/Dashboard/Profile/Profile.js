import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import logo from "../../../images/logo.png";
import axios from "axios";
import UserContext from "../../../context/userContext";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Profile() {
  const { userData, setUserData } = useContext(UserContext);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [groups, setGroups] = useState([]);
  const [favorites, setFavorites] = useState([]); // Do the same for other data
  const [invitations, setInvitations] = useState([]);
  const [id, setId] = useState();
  const [error, setError] = useState();

  const updateUserData = async () => {
    if (userData.user) {
      setUsername(userData.user.username);
      setEmail(userData.user.email);
      setPassword(userData.user.password);
      setGroups(userData.user.groups);
      setFavorites(userData.user.favFoods);
      setInvitations(userData.user.invitations);
      setId(userData.user.id);
    }
  };

  useEffect(() => {
    updateUserData();
  }, [userData]);

  const rejectInvite = async (groupId) => {
    try {
      const reqBody = {};
      reqBody.id = id;
      reqBody.groupId = groupId;
      const indexOfInvite = invitations.findIndex((x) => x.groupId === groupId);
      // console.log("INVITE'S INDEX", indexOfInvite)
      var invitationsCopy = invitations;
      invitationsCopy.splice(indexOfInvite, 1);
      setInvitations([...invitationsCopy]);
      const patchReq = await axios.patch(
        "http://localhost:5000/users/rejectInvite",
        reqBody
      );
    } catch (err) {
      console.log("ERROR", err.response.data.msg);
    }
  };

  const acceptInvite = async (groupId, groupName) => {
    try {
      const reqBody = {};
      reqBody.groupId = groupId;
      reqBody.groupName = groupName;
      var newGroups = groups;
      newGroups.push(reqBody);
      setGroups([...newGroups]);
      reqBody.id = id;
      const indexOfInvite = invitations.findIndex((x) => x.groupId === groupId);
      // console.log("INVITE'S INDEX", indexOfInvite)
      var invitationsCopy = invitations;
      invitationsCopy.splice(indexOfInvite, 1);
      setInvitations([...invitationsCopy]);
      const patchReq = await axios.patch(
        "http://localhost:5000/users/acceptInvite",
        reqBody
      );
    } catch (err) {
      console.log("ERROR", err.response.data.msg);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      const requestBody = { password, id };
      await axios.post(
        "http://localhost:5000/users/changePassword",
        requestBody
      );
      setPassword("");
      alert("Password has been changed!");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div class="container">
      <h2 class="title">Profile</h2>
      <div class="ProfilePictureContainer">
        <img src={logo} class="profilePicture" />
      </div>
      <Grid container justify="space-between" align="center" sx={{ p: 3 }}>
        {/* <div class="infoBoard"> */}
        <Grid item xs={6} marginTop="0.5rem" sx={{ p: 2 }}>
          {/* <div class="subInfo"> */}
          <Card style={{ borderColor: "#2c7dc3" }}>
            <CardContent>
              <Grid container justify="space-between" sx={{ ml: 5, mr: 5 }}>
                <Grid item xs={12} align="left">
                  <p class="infoTitle">Username: {username}</p>
                </Grid>{" "}
                <Grid item xs={12} align="left">
                  <p class="infoTitle">Email: {email}</p>
                </Grid>
                <Grid item xs={12}>
                  <div class="password">
                    <form onSubmit={submit}>
                      <Grid container justify="space-between">
                        <Grid item xs={4} align="left">
                          <FormControl>
                            <InputLabel htmlFor="component-outlined">
                              Password
                            </InputLabel>
                            <OutlinedInput
                              id="newpassword"
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              label="Pasword"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} align="left" sx={{ m: 1 }}>
                          <Button
                            type="submit"
                            value="Update Password"
                            form="password"
                            id="submitNewPassword"
                            primary={true}
                            variant="contained"
                            size="x-large"
                          >
                            Update Password
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                </Grid>
                <br />
                <Grid item xs={12} align="left">
                  {/* <div class="foods"> */}
                  <p class="infoTitle">Favorite foods:</p>
                  <ul>
                    {favorites.map((foodName) => {
                      return <li class="infoList">{foodName}</li>;
                    })}
                  </ul>
                  {/* </div> */}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} marginTop="0.5rem" sx={{ p: 2 }}>
          <Card style={{ borderColor: "#2c7dc3" }} align="left">
            <CardContent sx={{ ml: 5, mr: 5 }}>
              <div class="groups">
                <p class="infoTitle">Groups:</p>
                <ul>
                  {groups.map((group) => {
                    return <li class="infoList">{group.groupName}</li>;
                  })}
                </ul>
              </div>
              <br />
              <Grid container spacing={0.5}>
                <Grid item xs={12} class="infoTitle">
                  Invitations:
                </Grid>
                {invitations.map((invite) => (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid
                          container
                          spacing={0.5}
                          justify="space-between"
                          sx={{ bm: 2.5 }}
                        >
                          <Grid item xs={4}>
                            <Box sx={{ fontSize: "1.0rem" }}>
                              Group: {invite.groupName}
                            </Box>
                          </Grid>
                          <Grid item xs={5} align="right" sx={{ bp: 0.5 }}>
                            <Button
                              variant="contained"
                              onClick={() =>
                                acceptInvite(invite.groupId, invite.groupName)
                              }
                              size="small"
                            >
                              Accept
                            </Button>
                          </Grid>
                          <Grid item xs={2} align="right" sx={{ tp: 0.5 }}>
                            <Button
                              variant="contained"
                              onClick={() => rejectInvite(invite.groupId)}
                              size="small"
                            >
                              Reject
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          spacing={0.5}
                          justify="space-between"
                          sx={{ tm: 2 }}
                        >
                          <Grid item xs={6} align="left">
                            <Box sx={{ fontSize: "1.0rem" }}>
                              From: {invite.inviter}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/* <div class="invitations">
                        <p class="infoTitle">Invitations:</p>
                        <ul>
                            {invitations.map(invite => {
                                return <li class="infoList">{invite}</li>
                            })}
                        </ul>
                    </div> */}
            </CardContent>
          </Card>
        </Grid>
        {/* </div> */}

        {/* </div> */}
      </Grid>
    </div>
  );
}
export default Profile;
