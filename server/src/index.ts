import dotenv from "dotenv";
import { connectDB } from "./db/index.ts";
import { app } from "./app.ts";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
