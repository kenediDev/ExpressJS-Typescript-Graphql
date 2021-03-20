import { createTransport, Transporter } from 'nodemailer';

export const transpoter = async (args: string): Promise<Transporter> => {
  let transpoter: Transporter = createTransport({
    pool: true,
    host: process.env.smtp_host,
    port: parseInt(process.env.smtp_port),
    secure: true,
    auth: {
      user: process.env.smtp_user,
      pass: process.env.smtp_pass,
    },
  });

  if (process.env.TESTING === 'false') {
    transpoter.verify(function (err, success) {
      if (success) {
        console.log('SMTP Connection');
      } else {
        console.log('SMTP Something wrong');
      }
    });
  }

  await transpoter.sendMail({
    from: process.env.smpt_user, // sender address
    to: args, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  return transpoter;
};
