import { Schema, model, InferSchemaType } from "mongoose";

const AudioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    setAsBackground: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

type AudioType = InferSchemaType<typeof AudioSchema>;

export const AudioModel = model("musics", AudioSchema);
export type { AudioType };
