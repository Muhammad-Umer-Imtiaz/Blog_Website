import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: { type: mongoose.Schema.Types.ObjectId, required: true }
    , name: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    isApproved: {
        type: Boolean, default:false, required: true
    },

}, { timestamps: true });
export const Comment = mongoose.model("Comment", commentSchema)