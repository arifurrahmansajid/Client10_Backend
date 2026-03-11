import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "./db/schema/user.schema";

dotenv.config();

async function run() {
  try {
    const dbUrl = process.env.DB;
    await mongoose.connect(dbUrl!);
    const users = await UserModel.find({}).limit(5);
    users.forEach(u => {
      console.log(`User: ${u.email}, backgroundType: ${u.backgroundType}`);
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
run();
