import express from "express";
import { userCreate, authUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/createuser", userCreate);
route.post("/login", authUser);

export default route;
