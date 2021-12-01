const router = require('express').Router();
const mongoose = require('mongoose');
var Group = require("../models/group_model");

router.patch('/vote', async (req, res) => {
    try { // req.body needs: groupId, dining hall
        var group = await Group.findById(req.body.groupId)
        const username = req.body.username
        var userVoteIndex = group.groupMembers.findIndex(x => x.username === username)
        group.groupMembers[userVoteIndex].vote = req.body.diningHall
        if (!group)
            return res.status(400).json({ msg: "Cannot find group" })
        const groupVotes = group.votes
        groupVotes[req.body.diningHall] += 1
        if (req.body.oldDininghall)
        {
            groupVotes[req.body.oldDininghall] = --groupVotes[req.body.oldDininghall]
        }
        const savedGroup = await group.save();
        res.json({savedGroup})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.patch('/removeVote', async (req, res) => {
    try { // req.body needs: groupId, dining hall
        const group = await Group.findById(req.body.groupId)
        const username = req.body.username
        var userVoteIndex = group.groupMembers.findIndex(x => x.username === username)
        group.groupMembers[userVoteIndex].vote = ""
        if (!group)
            return res.status(400).json({ msg: "Cannot find group" })
        const groupVotes = group.votes
        groupVotes[req.body.diningHall] = --groupVotes[req.body.diningHall]
        if (req.body.oldDininghall)
        {
            groupVotes[req.body.oldDininghall] = --groupVotes[req.body.oldDininghall]
        }
        const savedGroup = await group.save();
        res.json({savedGroup})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.post('/getVotes', async(req, res) => {
    try {
        const group = await Group.findById(req.body.groupId)
        const username = req.body.username
        if (!group)
            return res.status(400).json({ msg: "Cannot find group" })
        const Votes = group.votes
        var userVoteIndex = group.groupMembers.findIndex(x => x.username === username)
        const userVote = group.groupMembers[userVoteIndex].vote
        res.json({Votes, userVote})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.post('/getGroupMembers', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupId)
        if (!group)
            return res.status(400).json({ msg: "Cannot find group" })
        const groupMembers = group.groupMembers
        res.json({groupMembers})
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

// arr.map(json => await axios.post("https://localhost:5000/addFood", json))

module.exports = router;