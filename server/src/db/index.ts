import { DB_NAME } from "../constants.ts";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
    console.log("MongoDB Connected :", conn.connection.host);
  } catch (err) {
    console.log("MongoDB Connection Error :", err);
    process.exit(1);
  }
};

export { connectDB };
