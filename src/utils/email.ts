// import nodemailer from "nodemailer"
// import nodemailerSendgrid from "nodemailer-sendgrid"
// const sendEmailToUser = async (options: {
//   email: string
//   text: string
//   message: string
//   subject: string
// }) => {
//   const mailOptions = {
//     apiKey:
//       "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"
//   }
//   const transporter = nodemailer.createTransport(
//     nodemailerSendgrid(mailOptions)
//   )

//   const sendIt = {
//     to: options.email,
//     from: "fatinga@st.ug.edu.gh",
//     subject: options.subject,
//     text: options.text,
//     html: options.message
//   }

//   return await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(sendIt, (err, info) => {
//       if (err) {
//         console.error(err)
//         reject(err)
//       } else {
//         console.log(info)
//         resolve(info)
//       }
//     })
//   })
// }

// export default sendEmailToUser
