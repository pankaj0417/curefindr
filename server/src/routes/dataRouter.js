import express from "express";
import {
  dataCreate,
  getAllData,
  searchData,
  uploadImage,
  upload,
} from "../controllers/dataController.js";

const dataRoute = express.Router();

dataRoute.post("/createdata", dataCreate);
dataRoute.get("/alldata", getAllData);
dataRoute.get("/search", searchData);
dataRoute.post("/upload-image", upload.single("image"), uploadImage);

export default dataRoute;
