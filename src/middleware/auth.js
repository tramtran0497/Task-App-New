const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async(req, res, next) => {
    try{
        // take token from header params
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById({_id: decoded.id, "tokens": token});
        
        if(!user) throw new Error();
        req.user = user;
        next();
    } catch(error) {
        res.status(401).send({error: "Please authenticate!"});
    }
    
};

module.exports = auth
