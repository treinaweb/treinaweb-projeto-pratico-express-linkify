import express, { Request, Response } from "express";
import router from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Server runing on http://localhost:3000`);
});
