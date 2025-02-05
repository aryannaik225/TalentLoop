import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["job-seeker", "recruiter"], required: true },
    resume: { type: String }, // Link to uploaded resume
    skills: { type: [String], default: [] }, // Skills for job-seekers
    company: { type: String }, // Only for recruiters
    jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Jobs posted by recruiters
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Jobs applied by job-seekers
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);