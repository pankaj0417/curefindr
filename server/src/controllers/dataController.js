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
