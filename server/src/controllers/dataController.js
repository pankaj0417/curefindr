import Data from "../models/dataSchema.js";

// data create

export const dataCreate = async (req, res) => {
  try {
    const {
      drugname,
      apiname,
      group,
      chemicalstructure,
      modeofaction,
      useofdrug,
      toxoofdrug,
      typeoftoxicity,
      reasonoftoxicity,
      minconcentration,
      successrate,
      currentstatus,
      adrs,
      chemicalstructureImage,
      modeofactionImage,
    } = req.body;

    const data = await Data.create({
      drugname,
      apiname,
      group,
      chemicalstructure,
      modeofaction,
      useofdrug,
      toxoofdrug,
      typeoftoxicity,
      reasonoftoxicity,
      minconcentration,
      successrate,
      currentstatus,
      adrs,
      chemicalstructureImage,
      modeofactionImage,
    });

    res.status(201).json({ message: "Data created successfully", data });
  } catch (error) {
    console.error("Error in creating data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all data
export const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: allData });
  } catch (error) {
    console.error("Error in fetching data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// search data by drugname or apiname
export const searchData = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      const allData = await Data.find();
      return res
        .status(200)
        .json({ message: "Data fetched successfully", data: allData });
    }

    const data = await Data.find({
      $or: [
        { drugname: { $regex: query, $options: "i" } },
        { apiname: { $regex: query, $options: "i" } },
        { group: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({ message: "Data fetched successfully", data });
  } catch (error) {
    console.error("Error in searching data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res
      .status(200)
      .json({ message: "Image uploaded successfully", url: imageUrl });
  } catch (error) {
    console.error("Error uploading image", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
