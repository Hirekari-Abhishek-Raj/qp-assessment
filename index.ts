import express,{Express,Request,Response} from "express";
import bodyParser from "body-parser";
import publicRoutes from "./src/routes/public"
import apiRoutes from "./src/routes/api"
import {auth} from "./src/routes/auth"
import session from "express-session";
require("dotenv").config()
const app: Express = express();
const key:any = process.env.SECRET_KEY
app.use(
  session({
    secret: key,
    saveUninitialized: true,
    resave: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hi")
});

app.listen(8000, () => {
  console.log("Port is running on 8000...");
});

app.use(bodyParser.json())
app.use("/api",auth,apiRoutes)
app.use("/",publicRoutes)
