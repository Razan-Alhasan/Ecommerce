import bcrypt from "bcryptjs";
import userModel from "../../DB/Models/userModel.js";
import cloudinary from "../Services/cloudinary.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Services/email.js";
import { customAlphabet } from "nanoid";
export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return next(new Error("email already in use !", { cause : 409}))
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
export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.CONFIRMEMAILSECRET);
  if (!decoded) {
    return next(new Error("Invalid authorization", {cause : 400}))

  }
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmEmail: false },
    { confirmEmail: true }
  );
  if (!user) {
    return next(new Error("Invalid verify your email |OR| your email was verified", { cause : 400 }));
  }
  return res.redirect(process.env.LOGINFRONTEND);
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("data invalid", { cause : 400 }));
  }
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new Error("data invalid", { cause : 400 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("please verify your email", { cause : 400 }));
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
export const sendCode = async (req, res, next) => {
  const { email } = req.body;
  const isUser = await userModel.findOne({ email });
  if (!isUser) {
    return next(new Error("user not found!", { cause : 400 }));
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
export const resetPassword = async (req, res, next) => {
  const { email, password, code } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("not register account !", { cause : 404 }));
  }
  if (user.sendCode != code) {
    return next(new Error("invalid code !", { cause : 404 }));
  }
  const pass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
  user.password = pass;
  user.save();
  return res.status(200).json({ message: "success" });
};
