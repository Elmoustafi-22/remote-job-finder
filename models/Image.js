import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
});

// Check if the model is already defined to avoid OverwriteModelError
export const Image =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
