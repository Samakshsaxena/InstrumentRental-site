// /app/api/sendContactEmail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thanks for contacting Instrument Rental 🎵',
    text: `Hi ${name},\n\nThank you for reaching out to us at Instrument Rental. We'll get back to you shortly!\n\nStay musical,\nThe Instrument Rental Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Email failed to send.' }, { status: 500 });
  }
}
