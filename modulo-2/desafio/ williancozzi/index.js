import express from "express";
import gradesRouter from "./routes/grades.js";

global.fileName = "grades.json";

const app = express();
app.use(express.json());

app.use("/grade", gradesRouter);

app.listen(3000, () => {
  console.log("API started!");
});
