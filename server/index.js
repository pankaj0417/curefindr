import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import route from "./src/routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://oncox-fjdo.onrender.com",
    credentials: true,
  })
);

app.use("/api/user", route);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port} `);
});
