import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userShema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverimage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userShema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    
    this.password  = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function 
(password){
  return await  bcrypt.compare(password, this.passsword)
}

userSchema.methods.genrateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIN: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function(){
    wt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIN: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userShema);
