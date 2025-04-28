import express from "express";
import cors from "cors";

import apiRouter from "./src/api/router/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(apiRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
