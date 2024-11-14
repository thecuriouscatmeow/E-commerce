const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, (saltOrRounds = 10))
    });
    try{
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch(e){
        return res.status(500).json(e);
    }
};

exports.login = async (re, res) => {
    try{
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json({message: "User not found"});

        const inputPassword = req.body.password;

        const originalPassword = await bcrypt.compare(
            inputPassword,
            user.password
        );

        originalPassword != inputPassword && res.status(401).json({message: "Password is incorrect"});

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            "secret",
            { expiresIn: "3d" }
        );

        const { password, ...other } = user._doc;
        res.status(200).json({...other, accessToken}); 

    } catch(e){
        return res.status(500).json(e);
    }
}