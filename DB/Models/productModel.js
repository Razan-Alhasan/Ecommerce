import mongoose, { Schema, model, Types } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    finalPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        default: 1
    },
    discount: {
        type: Number,
        default:0
    },
    sellersCount: {
        type: Number,
        default:0
    },
    mainImage: {
        type: Object,
        required: true,
    },
    subImages: [{
        type: Object,
        required: true,
    }],
    status: {
        type: String,
        default: "Active",
        enum: ["Active", "InActive"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    colors: [String],
    sizes: [{
        type: String,
        enum: ['s', 'm', 'lg', 'xl']
    }],
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    subCategoryId: { type: Types.ObjectId, ref: "subCategory", required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User", required: true }
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.models.Product || model("Product", productSchema);
export default productModel;
