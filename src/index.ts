import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import connectDB from "./config/db";
import tasksRoutes from '~/modules/task/task.routes';
import errorHandler from "./middlewares/error";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use(morgan("dev"));

app.use("/api", tasksRoutes);

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
