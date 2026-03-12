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
    
    const models = [
      { name: "Image", model: ImageModel },
      { name: "Video", model: VideoModel },
      { name: "GIF", model: GIFModel },
      { name: "Audio", model: AudioModel }
    ];

    for (const m of models) {
      const bgs = await (m.model as any).find({ setAsBackground: true });
      console.log(`--- ${m.name} Backgrounds ---`);
      bgs.forEach((bg: any) => {
        console.log(`URL: ${bg.url || bg.name}, User: ${bg.user}, isPublic: ${bg.isPublic}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
run();
