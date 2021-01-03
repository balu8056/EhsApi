const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  let authheader
    try { 
authheader = req.get('Authorization').split(' ')[1]
    }catch { res.status(400).json({ message: 'no token provided !!!' })}

  let deauthtoken

    if (!authheader) { res.status(400).json({ message: 'not logged in' })}
  try { deauthtoken = jwt.verify(authheader, `${process.env.SECRET}` || 'NaveenKmrBala')} catch (err) {}

  if (!deauthtoken) {
    res.status(400).json({ message: 'invalid token!!!' })
    }
  req.emailid = deauthtoken.emailid
    req.userid = deauthtoken.userid

    next()
}