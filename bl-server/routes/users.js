const router = require('express').Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var food = require("../models/food_model");
var User = require("../models/user_model");

router.post('/register', async (req, res) => {
    try {
        let { username, email, password, passwordVerify, favFoods } = req.body;

        if (!email || !password || !username || !passwordVerify) // checkinf if all fields were submitted
            return res.status(400).json({ msg: "Not all fields completed" })
        if (password.length < 5) // checking if password is too short or not
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters long"})
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const userEmailExists = await User.findOne({ email: email}) // searching if a user with this email exists
        if (userEmailExists) // if user with this email exists, return error
            return res
                .status(400)
                .json({ msg: "An account with this email already exists"})
        // findOne is a built-in mongoose feature for models, which allows you to search for different model instances

        console.log("HEY, ABOUT TO FIND USER")
        const userUsernameExists = await User.findOne({ username: username}) // searching if a user with this username exists
        if (userUsernameExists) // if user with username exists, return error
            return res
                .status(400)
                .json({ msg: "An account with this username already exists"})
        console.log("HEY")
        const salt = await bcrypt.genSalt(); // "salting" a password into a random string for extra security
        console.log("GENERATED SALT")
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("HASHING PASSWORD")

        const newUser = new User({
            email,
            username,
            password: passwordHash,
            favFoods
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
        console.log(res.user);

        console.log(email, "hi")
        if (!email || !password) // if not sent the username/password
            return res.status(400).json({ msg: "Not all fields have been entered" })
        
        const emailExists = await User.findOne({ email: email}); // searching through database for this email
        if (!emailExists) // If no user exists
            return res
                .status(400)
                .json({ msg: "No such user exists with this email" })
        const user = await User.findOne({ username: email })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Incorrect password or username"})
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating a token to represent the user's unique _id, which will be used in the future in authorization to verify that the user is the user.
        console.log("token: ", token);
        console.log("user: ", user);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                favFoods: user.favFoods
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;