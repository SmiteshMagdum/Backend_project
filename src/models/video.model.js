import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
        type: String, //clouadnary model
        required: [true , "Video is required"]

    },
    thumbnail: {
        type: String, //clouadnary model
        required: [true , "Thumbnail is required"]
    },
    title: {
        type: String, 
        required: [true , "Title is required"]
    },
    description: {
        type: String, 
        required: [true , "description is required"]
    },
    duration: {
        type: Number, 
        required: [true , "duration  is required"]
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.mmodel("Video", videoSchema);
