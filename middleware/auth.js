const { getUser } = require("../service/auth");

async function restrictLogInUseronly(req, res, next) {
  
  const userUid = res.cookies?.uid;

  if (!userUid) return res.redirect("./login");
  const user = await getUser(userUid); // assuming getUser is an async function

  if (!user) return res.redirect("./login");

  req.user = user;
  next();
}

module.exports = { restrictLogInUseronly };
