import bcrypt from "bcryptjs";
import userModel from "../../DB/Models/userModel.js";
import cloudinary from "../Services/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Services/email.js";
;
export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({message: "email already in use !"})
    }
    const hashedPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
      { folder: `${process.env.APP_NAME}/users` }
  );
    const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);
    await sendEmail(email, "Confirm Email", `<a href='http//localhost:3000/auth/confirmEmail/${token}'>Verify</a>`)
    const createUser = await userModel.create({ userName, email, password: hashedPass, image: {secure_url, public_id}});
    return res.status(201).json({message: "success", createUser})
};
export const confirmEmail = async (req, res) => {
  const { token } = req.params
  const decoded = jwt.verify(token, process.env.CONFIRMEMAILSECRET);
  if (!decoded) {
    return res.status(404).json({ message: "Invalid authorization" });
  }
  const user = await userModel.findOneAndUpdate({email: decoded.email, confirmEmail: false}, {confirmEmail: true})
  if (!user) {
    return res.status(400).json({ message: "Invalid verify your email |OR| your email was verified" });
  }
  return res.status(200).json({ message: "your email is verified successfully"});
}
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "data invalid" });
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "data invalid" });
  }
  const token = jwt.sign({ id: user._id, role: user.role, status: user.status },
    process.env.LOGIN_SECRET, { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    process.env.LOGIN_SECRET
    , { expiresIn: 60 * 60 * 24 * 30 });
  return res.status(200).json({ message: "success", token, refreshToken });
};
