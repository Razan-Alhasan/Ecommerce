import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 4,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    confirmEmail: {
        type: Bollean,
        default: false,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "InActive"]
    },
    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
    }
}, {
    timestamps: true
});
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
