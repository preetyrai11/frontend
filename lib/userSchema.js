import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      default: "This is my Bio",
    },
    phoneNumber: {
       type: String,
    }
  },
  { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;












