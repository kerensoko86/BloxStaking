import express from "express";
import blockRoter from "./routes/block.route";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use("/", blockRoter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
