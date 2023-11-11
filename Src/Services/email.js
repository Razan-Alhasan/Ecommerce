import nodemailer from "nodemailer";
export async function sendEmail (to, subject, html){
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.USERPASS,
  },
});

  const info = await transporter.sendMail({
    from: `"R-Shop 👻" <${process.env.USEREMAIL}>`, 
    to, 
    subject, 
    html, 
  });
    return info;
}