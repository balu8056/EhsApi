<<<<<<< HEAD
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    let authheader;
    try{authheader = req.get('Authorization').split(" ")[1];
    }catch{res.status(400).json({ message: "no token provided !!!" });}
    
    let deauthtoken;

    if (!authheader) {res.status(400).json({ message: "not logged in" });}
    try {deauthtoken = jwt.verify(authheader, process.env.SECRET);
    } catch (err) {}

    if (!deauthtoken) {
        res.status(400).json({ message: "invalid token!!!" });
    }
    req.emailid = deauthtoken.emailid;
    req.userid = deauthtoken.userid;

    next();
=======
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    let authheader;
    try{authheader = req.get('Authorization').split(" ")[1];
    }catch{res.status(400).json({ message: "no token provided !!!" });}
    
    let deauthtoken;

    if (!authheader) {res.status(400).json({ message: "not logged in" });}
    try {deauthtoken = jwt.verify(authheader, process.env.SECRET);
    } catch (err) {}

    if (!deauthtoken) {
        res.status(400).json({ message: "invalid token!!!" });
    }
    req.emailid = deauthtoken.emailid;
    req.userid = deauthtoken.userid;

    next();
>>>>>>> fb2248c4d67dfe709b73288f432c0bacffeca969
}