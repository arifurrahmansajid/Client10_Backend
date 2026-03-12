import mongoose from "mongoose";
import dotenv from "dotenv";
import { ImageModel } from "./db/schema/images.schema";
import { VideoModel } from "./db/schema/video.schema";
import { AudioModel } from "./db/schema/audio.schema";
import { GIFModel } from "./db/schema/gif.schema";

dotenv.config();

async function run() {
  try {
    const dbUrl = process.env.DB;
    await mongoose.connect(dbUrl!);
    console.log("Connected to DB");

    const models = [ImageModel, VideoModel, AudioModel, GIFModel];

    for (const model of models) {
      // 1. Any file with NO user should be PUBLIC
      const res1 = await (model as any).updateMany(
        { 
          $or: [{ user: null }, { user: { $exists: false } }], 
          isPublic: false 
        },
        { $set: { isPublic: true } }
      );
      console.log(`Fixed ${model.modelName} (No User -> Public):`, res1.modifiedCount);

      // 2. Ensure only ONE background is set per context
      // This is harder to fix automatically without knowing which one is intended.
      // But we can at least make sure they correspond to the backgroundType.
    }

    console.log("Migration completed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
run();
