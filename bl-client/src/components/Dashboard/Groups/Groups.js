import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../../context/userContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import GroupCard from "./GroupCard";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

function Groups() {
  const { userData, setUserData } = useContext(UserContext);

  const [allUsers, setAllUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [inviter, setInviter] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [groupMemberProp, setGroupMemberProp] = useState([]);
  const updateStates = async () => {
    if (userData.user) {
      console.log("USERDATA", userData.user);
      console.log("STUFF", userData.user.allUsers);
      setAllUsers(userData.user.allUsers);
      setGroups(userData.user.groups);
      setInviter(userData.user.username);
      console.log("GROUPS", groups);
      console.log("ALLUSERS", allUsers);
    }
  };

  const makeGroup = async () => {
    try {
      const reqBody = {};
      reqBody.groupName = newGroupName;
      var copyReqBody = reqBody;
      reqBody.id = userData.user.id;
      const groupCreateResponse = await axios.patch(
        "http://localhost:5000/users/makeGroup",
        reqBody
      );
      debugger;
      var groupMemberObj = {}
      groupMemberObj.username = userData.user.username
      groupMemberObj.vote = ""
      copyReqBody.groupMembers = [groupMemberObj]
      copyReqBody.votes = { DeNeve: 0, Epicuria: 0, Feast: 0, bPlate: 0 };
      var groupsCopy = groups;
      setGroupMemberProp([copyReqBody]);
      copyReqBody.groupId = groupCreateResponse.data.savedGroup._id;
      groupsCopy.push(copyReqBody);
      await setGroups(groupsCopy);
      setNewGroupName("");
    } catch (err) {
      console.log("ERROR", err.response.data.msg);
    }
  };

  useEffect(() => {
    updateStates();
  }, [userData]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Groups</h1>
      {userData.user ? ( 
      <div>     
        <Grid container spacing={0.5} margin="auto">
        {groups.map((group) => (
        <Grid item xs={4}>
        <Box
          textAlign="center"
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: 1,
            borderWidth: 2,
            borderColor: "grey.500",
          }}
          display="block"
        >
          <GroupCard
            groupObj={group}
            inviter={inviter}
            style={{ margin: "auto" }}
            members={groupMemberProp}
          />
        </Box>
        </Grid>
        ))}
        </Grid>
        <div style={{ width: "50%", margin: "2rem auto" }}>
        <Card style={{ borderColor: "#2c7dc3" }}>
          <CardContent>
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "0.75rem",
              }}
            >
              Make a Group
            </Box>
            <Grid item xs={12} marginTop="0.5rem">
              <TextField
                label="New Group Name"
                variant="outlined"
                size="Normal"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} marginTop="0.5rem">
              <Button onClick={() => makeGroup()} variant="contained">
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
        </div>
        </div>
      ) : (<h2>Please login to use Groups</h2>)}
    </div>
  );
}
export default Groups;
