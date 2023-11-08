import couponModel from "../../DB/Models/couponModel.js";

export const createCoupon = async (req, res) => {
    const { name, amount } = req.body;
    if (await couponModel.findOne({ name })) {
        return res.status(409).json({message: `coupon ${name} is already exist!`})
    }
    const coupon = await couponModel.create({name, amount});
    return res.status(201).json({ message:"success", coupon})
};
export const getCoupons = async (req, res) => {
    const coupons = await couponModel.find();
    return res.status(200).json({ message: "success", coupons });
};
export const updateCoupon = async (req, res) => {
    const couponId = req.params.id
    const coupon = await couponModel.findById(couponId)
    if (!coupon) {
        return res.status(409).json({message:"coupon not found"})
    }
    if (req.body.name) {
        if (await couponModel.findOne({ name: req.body.name })) {
        }
        coupon.name = req.body.name;
    }
    if (req.body.amount) {
        coupon.amount = req.body.amount;
    }
    coupon.save();
    return res.status(200).json({message:"success", coupon})
}
export const softDeleteCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id, isDeleted: false}, {isDeleted: true}, {new: true})
    if (!coupon) {
        return res.status(400).json({ message: "coupon not found!" });
    }
    return res.status(200).json({ message: "success", coupon });
}
export const forceDeleteCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndDelete({ _id: id, isDeleted: true });
    if (!coupon) {
        return res.status(400).json({ message: "coupon not found!" });
    }
    return res.status(200).json({ message: "coupon was deleted successfully" });
};
export const restoreCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModel.findOneAndUpdate({_id:id, isDeleted: true}, {isDeleted: false}, {new: true})
    if (!coupon) {
        return res.status(400).json({ message: "coupon not found!" });
    }
    return res.status(200).json({ message: "success", coupon });
};
