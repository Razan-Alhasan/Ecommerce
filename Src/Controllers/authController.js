import bcrypt from "bcryptjs";
import userModel from "../../DB/Models/userModel.js";
import cloudinary from "../Services/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Services/email.js";
import { customAlphabet } from "nanoid";
export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "email already in use !" });
  }
  const hashedPass = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/users` }
  );
  const token = jwt.sign({ email }, process.env.CONFIRMEMAILSECRET);
  await sendEmail(
    email,
    "Confirm Email",
    `<a href='${req.protocol}//${req.headers.host}/auth/confirmEmail/${token}'>Verify</a>`
  );
  const createUser = await userModel.create({
    userName,
    email,
    password: hashedPass,
    image: { secure_url, public_id },
  });
  return res.status(201).json({ message: "success", createUser });
};
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.CONFIRMEMAILSECRET);
  if (!decoded) {
    return res.status(404).json({ message: "Invalid authorization" });
  }
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return res
      .status(400)
      .json({
        message: "Invalid verify your email |OR| your email was verified",
      });
  }
  return res.redirect(process.env.LOGINFRONTEND);
};
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
  const token = jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    process.env.LOGIN_SECRET,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, status: user.status },
    process.env.LOGIN_SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  );
  return res.status(200).json({ message: "success", token, refreshToken });
};
export const sendCode = async (req, res) => {
  const { email } = req.body;
  const isUser = await userModel.findOne({ email });
  if (!isUser) {
    return res.status(400).json({ message: "user not found!" });
  }
  let code = customAlphabet("1234567890abcdABCD", 6);
  code = code();
  const user = await userModel.findOneAndUpdate(
    { email },
    { sendCode: code },
    { new: true }
  );
  const html = `<h2> your code is : ${code}</h2> <br> <p>FOR YOUR SECURITY PLEASE DO NOT SHARE THIS CODE WITH ANYONE</p>`;
  await sendEmail(email, "Reset Password", html);
  return res.redirect(process.env.RESETPASSWORDFORM);
};
export const resetPassword = async (req, res) => {
  const { email, password, code } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "not register account !" });
  }
  if (user.sendCode != code) {
    return res.status(404).json({ message: "invalid code !" });
  }
  const pass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  user.password = pass;
  user.save();
  return res.status(200).json({ message: "success" });
};
