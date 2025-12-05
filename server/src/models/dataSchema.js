import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  drugname:{
    type: String,
    require: true,
  },
  apiname:{
    type: String,
    require: true,
  },
  group:{
    type: String,
    require: true,
  },
  chemicalstructure:{
    type: String,
    require: true,
  },
  modeofaction:{
    type: String,
    require: true,
  },
  useofdrug:{
    type: String,
    require: true,
  },
  toxoofdrug:{
    type: String,
    require: true,
  },
  typeoftoxicity:{
    type: String,
    require: true,
  },
  reasonoftoxicity:{
    type: String,
    require: true,
  },
  minconcentration:{
    type: String,
    require: true,
  },
  successrate:{
    type: String,
    require: true,
  },
  currentstatus:{
    type: String,
    require: true,
  },
  adrs:{
    type: String,
    require: true,
  },
})

const data=mongoose.model("data",DataSchema);
export default data;