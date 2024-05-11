import express from "express";
import * as userController from "../controllers/users.controller";
const router = express.Router();
router.all("/ping", (req, res) => {
  res.send("pong");
});
router.post("/user", userController.addUser);
// router.delete("/user/:id", userController.getUser);
router.post("/login", userController.login);
export default router;