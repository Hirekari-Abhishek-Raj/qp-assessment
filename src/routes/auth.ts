const { verifyToken } = require("../helpers/authentication");
export async function auth(req:any, res:any, next:any) {
  try {      
    const verify = await verifyToken(req?.headers?.authorization);
    req.session.user_id = verify?.id;
    req.session.is_admin = verify?.is_admin;
  } catch (error) {
    console.log(error);
    return res.send({ code: 401, message: "Invalid Token" });
  }
  next();
}

export async function isAdmin(req:any, res:any, next:any) {
  try {      
    if(!req.session.is_admin){
      throw new Error("This action cannot be performed by this user")
    }
  } catch (error:any) {
    return res.send({ code: 401, message: error.message });
  }
  next();
}

export async function isNotAdmin(req:any, res:any, next:any) {
  try {      
    if(req.session.is_admin){
      throw new Error("This action cannot be performed by this Admin")
    }
  } catch (error:any) {
    return res.send({ code: 401, message: error.message });
  }
  next();
}
