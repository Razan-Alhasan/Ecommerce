import mongoose, { Schema, model, Types } from "mongoose";
const subCategorySchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        image: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: "Active",
            enum: ["Active", "InActive"],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    }
    },
    {
        timestamps: true,
    }
);
const subCategoryModel =
  mongoose.models.SubCategory || model("SubCategory", subCategorySchema);
export default subCategoryModel;
