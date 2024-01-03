import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'nat@visibyte.dev',
    to: email,
    subject: 'Reset password',
    html: `<a href="${resetLink}">Reset password</a>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'nat@visibyte.dev',
    to: email,
    subject: 'Verify your email address',
    html: `<a href="${confirmLink}">Confirm email address</a>`,
  });
}
