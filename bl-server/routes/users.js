const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require("../models/user_model");
var Group = require("../models/group_model");
const auth = require("../middleware/auth");

router.post('/register', async (req, res) => {
    try {
        let { username, email, password, passwordVerify, favFoods } = req.body;

        if (!email || !password || !username || !passwordVerify) // checkinf if all fields were submitted
            return res.status(400).json({ msg: "Not all fields completed" })
        if (password.length < 5) // checking if password is too short or not
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters long" })
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const userEmailExists = await User.findOne({ email: email }) // searching if a user with this email exists
        if (userEmailExists) // if user with this email exists, return error
            return res
                .status(400)
                .json({ msg: "An account with this email already exists" })
        // findOne is a built-in mongoose feature for models, which allows you to search for different model instances

        console.log("HEY, ABOUT TO FIND USER")
        const userUsernameExists = await User.findOne({ username: username }) // searching if a user with this username exists
        if (userUsernameExists) // if user with username exists, return error
            return res
                .status(400)
                .json({ msg: "An account with this username already exists" })
        console.log("HEY")
        const salt = await bcrypt.genSalt(); // "salting" a password into a random string for extra security
        console.log("GENERATED SALT")
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("HASHING PASSWORD")

        const newUser = new User({
            email,
            username,
            password: passwordHash,
            favFoods: [],
            groups: [],
            invitations: [],
            reviews: []
        })
        const savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("res.user", res.user);

        console.log(email, "hi")
        if (!email || !password) // if not sent the username/password
            return res.status(400).json({ msg: "Not all fields have been entered" })

        const emailExists = await User.findOne({ email: email }); // searching through database for this email
        if (!emailExists) // If no user exists
            return res
                .status(400)
                .json({ msg: "No such user exists with this email" })
        const user = await User.findOne({ email: email })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Incorrect password or username" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating a token to represent the user's unique _id, which will be used in the future in authorization to verify that the user is the user.
        console.log("token: ", token);
        console.log("user: ", user);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                favFoods: user.favFoods,
                groups: user.groups,
                invitations: user.invitations
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
      try {
        const user = await User.findById(req.user);
        const allUsers = await User.find({});
        const selectedProperties = ["username", "favFoods"]
        const basicAllUsersInfo = allUsers.map(({username, favFoods}) => ({username, favFoods}))
        console.log("basicAllUsersInfo", basicAllUsersInfo)
        res.json({
            username: user.username,
            id: user._id,
            favFoods: user.favFoods,
            groups: user.groups,
            invitations: user.invitations,
            email: user.email,
            allUsers: basicAllUsersInfo
        });
      } catch (err) {
          res.status(500).json({ error: err.message });
      }
  });

  router.patch("/addFavFood", async (req, res) => {
      try {
          const user = await User.findById(req.body.id); // finding user in database
          if (!user) {
              return res.status(404).json({ message: 'Cannot find user' }) // when user doesn't exist...
          }
          res.user = user;
          console.log("Before fav foods update", res.user.favFoods);
          var favArr = req.body.putArr; // getting the new array of favorite foods from the request
          if (req.body.putArr) {
              res.user.favFoods = favArr; // if exists, set the favorite foods for the user in the data base to the new one (i.e. the new array with the new favorte food(s))
          }
          const updatedUser = await res.user.save();
          console.log(res.user.favFoods);
          res.json(updatedUser);
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  })

  router.patch("/makeGroup", async (req, res) => { // group creation inside of users since a group must have at least one member in it; it's original creator
      try {
        const user = await User.findById(req.body.id); // finding user in database
          if (!user) {
              return res.status(404).json({ message: 'Cannot find user' }) // when user doesn't exist...
          }
          res.user = user;
          console.log("Before group created for user", res.user.groups);
          var groupName = req.body.groupName;
          var newGroupList = user.groups
          if (groupName) {
              user.groups = newGroupList; // adding new group name for user
              groupMembers = [user.username]
              const newGroup = new Group({
                groupName,
                groupMembers
            })
            const groupId = newGroup._id.toString()
            console.log("groupId", groupId)
            newGroupList.push({ groupName, groupId }) // adding new group name to list of groups for the user
            const savedGroup = await newGroup.save();
            const updatedUser = await user.save();
            res.json({ savedGroup, updatedUser });
            //   res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

  router.patch("/inviteToGroup", async (req, res) => { // Call will also be from User's GROUPS list req.body includes username of person inviting to group (inviteeUsername), the groupName invitation, the username of the inviter (inviterUsername)
      try {
        const invitee = await User.findOne({ username: req.body.inviteeUsername })
        console.log("INVITEE", invitee)
        const inviter = await User.findOne({ username: req.body.inviterUsername })
        console.log("INVITER", inviter)
        const invitation = {}
        invitation.groupName = req.body.groupName
        invitation.groupId = req.body.groupId
        invitation.inviter = req.body.inviterUsername
        console.log("INVITATION INVITER", invitation.inviter)
        const inviteList = invitee.invitations
        const groupList = invitee.groups
        console.log("GROUPLIST", groupList)
        console.log("invite", inviteList)
        if (inviteList.findIndex(x => x.groupId === req.body.groupId) !== -1)
            return res.status(400).json({ message: 'User has already been invited to group'}) // when user has already been invited to group
        if (groupList.findIndex(x => x.groupId === req.body.groupId) !== -1)
            return res.status(400).json({ message: 'User is already in group'}) // when user has already been invited to group
        inviteList.push(invitation) // adding invitation to user's list of invitation
        const updatedUser = await invitee.save();
        res.json({updatedUser})
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  })

  router.patch("/acceptInvite", async (req, res) => { // When using this api call, get req.body information from User and from USER'S INVITE LIST. USED WHEN ACCEPTING INVITATIOn
      try {
          console.log("USER ID", req.body.id)
          console.log("GROUP ID", req.body.groupId)
        const user = await User.findById(req.body.id); // finding user in database
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' }) // when user doesn't exist...
        }
        res.user = user;
        console.log("Before user added to group", res.user.groups);
        var groupName = req.body.groupName;
        var newGroupList = user.groups
        groupId = mongoose.Types.ObjectId(req.body.groupId)
        console.log("NEW GROUP ID (OBJECT)", groupId)
        var group = await Group.findById(groupId)
        console.log("GROUP HERE", group)
        if (group) {
            user.groups = newGroupList; // adding new group name for user
            groupMembers = group.groupMembers
            console.log("GROUP MEMBERS", groupMembers)
            console.log("USER'S USERNAME", user.username)
            username = user.username
            if (groupMembers.indexOf(user.username) !== -1) { // checking if user is already in the group...
                console.log("IN THE IF STATEMENT")
                return res.status(400).json("error, user already in group")
              }
              const inviteList = user.invitations
              const indexOfInvite = inviteList.findIndex(x => x.groupId === req.body.groupId)
              inviteList.splice(indexOfInvite, 1)
              groupMembers.push(user.username) // adding new user to the exsting group
              newGroupList.push({groupName, groupId}) // adding new group name to list of groups for the user
              group.groupMembers = groupMembers
              const savedGroup = await group.save();
              const updatedUser = await user.save();
              res.json({savedGroup, updatedUser});
            //   res.json(updatedUser);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.post("/changePassword", async (req, res) => {
    try {
        const { password, id } = req.body;
        console.log(password, id);

        if (!password) // checkinf if all fields were submitted
            return res.status(400).json({ msg: "Not all fields completed" })
        if (password.length < 5) // checking if password is too short or not
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters long" })
        

        const user = await User.findById(id);
        if (!user)
            return res
                .status(400)
                .json({ msg: "User not found" })

       res.user = user;
       const salt = await bcrypt.genSalt(); // "salting" a password into a random string for extra security       
       const passwordHash = await bcrypt.hash(password, salt);

       res.user.password = passwordHash;
       const updatedUser = await res.user.save();       
       res.json(updatedUser);
    }
    catch (err) {
        res.status(505).json({ error: err.message });
    }
})


  router.patch("/rejectInvite", async (req, res) => { // When using this api call, get req.body information from User and from USER'S INVITE LIST. USED WHEN ACCEPTING INVITATIOn
    try {
      const user = await User.findById(req.body.id); // finding user in database
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' }) // when user doesn't exist...
        }
        const inviteList = user.invitations
        const indexOfInvite = inviteList.findIndex(x => x.groupId === req.body.groupId)
        inviteList.splice(indexOfInvite, 1)
        const updatedUser = await user.save();
        res.json({updatedUser});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
})

module.exports = router;