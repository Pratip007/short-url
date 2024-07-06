const User = require("../models/user");
const {v4 : uuidV4} = require('uuid');
const {setUser, getUser} =require('../service/auth')

async function userSignUp(req, res) {
  const { name, email, password } = req.body;

  // Check if email already exists in database
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already registered" });
  }

  await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');

};
// login
async function userLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email , password });
  if (!user) 
  return res.render("login", {
    error : "Invalid Username or password"
  });

  const sessionId = uuidV4();
  setUser(sessionId , user );
  res.cookie("uid" , sessionId)
  return res.redirect('/')
};

module.exports = {
  userSignUp,
  userLogin,
};
