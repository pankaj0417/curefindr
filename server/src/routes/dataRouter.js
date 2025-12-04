import express from "express";
import {
  dataCreate,
  getAllData,
  searchData,
} from "../controllers/dataController.js";

const dataRoute = express.Router();

dataRoute.post("/createdata", dataCreate);
dataRoute.get("/alldata", getAllData);
dataRoute.get("/search", searchData);

export default dataRoute;
  