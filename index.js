import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";

//Routes
import AuthRoute from "./Router/AuthRouter.js";
import ProductRoute from "./Router/ProductRouter.js";

const app = express();
dotenv.config;
app.use(cors());
const port = process.env.PORT;
app.use(bodyParser.json());

app.listen(port | 4500, () => {
  console.log("listening");
});

// Middleware function to log user requests in a file
const logger = (req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(logEntry, "hi");
  fs.appendFile("requests.log", logEntry + "\n", (err) => {
    if (err) console.log(err);
  });
  next();
};

app.use(logger);

//Usage of Route
app.use("/auth", AuthRoute);
app.use("/book", ProductRoute);
