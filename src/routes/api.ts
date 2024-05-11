import express from "express";
import * as groceriesController from '../controllers/groceries.controller'
import * as cartController from '../controllers/cart.controller'
import * as billController from '../controllers/bill.controller'
import * as userController from '../controllers/users.controller'
import { isAdmin,isNotAdmin } from "./auth";
const router = express.Router();
router.all("/ping", (req, res) => {
  const session: any = req.session
  console.log(session.user_id);
  
  res.send("pong");
});
//User Operations
router.put("/user/:id", userController.updateUser);
router.get("/user/:id", userController.getUser);
router.get("/user",isAdmin, userController.allUsers);

//Grocery Operations
router.post("/grocery",isAdmin, groceriesController.addGroceries);
router.put("/grocery/:id",isAdmin, groceriesController.updateGroceries);
router.get("/grocery/:id", groceriesController.getGrocery);
router.get("/grocery", groceriesController.allGrocery);
router.delete("/grocery/:id",isAdmin, groceriesController.deleteGrocery);

//Cart Operations
router.post("/cart_item",isNotAdmin, cartController.addItems);
router.delete("/cart_item/:id",isNotAdmin, cartController.removeItems);
router.put("/cart_item/:id",isNotAdmin, cartController.updateItems);
router.get("/cart_item",isNotAdmin, cartController.cartItems);

//Bill Operations
router.post("/bill",isNotAdmin, billController.submitOrder);
router.get("/bill",isNotAdmin, billController.getAllBills);
router.get("/bill/:id",isNotAdmin, billController.getBillDetails);

export default router;