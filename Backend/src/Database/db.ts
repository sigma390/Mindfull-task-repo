import mongoose, { ConnectOptions, Mongoose, Schema, Types } from "mongoose";



//user schema
// Define the User interface
type SocialEntity = "LinkedInProfile" | "Friend" | "JobPosting" | "others";
interface User {
    _id:string
    name: string;
    password:string;
    email: string;
    phone: string;
    gender: string;
    chbk1: SocialEntity;
    city: string;
    state: string;
    imageUrl:string;
    lastModified: Date;
  }

const userSchema = new Schema<User>(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String },
      phone: { type: String, required: true },
      gender: { type: String, required: true },
      chbk1: { type: String, enum: ["LinkedInProfile", "Friend", "JobPosting", "others"], required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      imageUrl: {type:String},
      lastModified: { type: Date, default: Date.now }, // Track modification time
    },
    { timestamps: true } // Optional: Adds createdAt and updatedAt fields
    
  );
  
  // Create a Mongoose model based on the schema
  const UserModel = mongoose.model<User>("User", userSchema);
  
  export default UserModel;