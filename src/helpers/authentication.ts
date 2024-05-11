var jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
export async function generateToken(body: {}) {
  var token = jwt.sign(body, SECRET_KEY);
  return token;
}

export async function verifyToken(token: string) {
  var decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
}


