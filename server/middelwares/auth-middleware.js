const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddelware = async (req , res , next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token HTTP, authorization denied' });
    }
    
    const jwtToken = token.replace("Bearer", "").trim();
     
    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        // getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
    
        req.token = token;
        req.user = userData;
        req.userID = userData._id;
        next();
      } 
      catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
      };
};

module.exports = authMiddelware;