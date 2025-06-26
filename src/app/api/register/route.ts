import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const sqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'borrowed_beats',
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, email, password, username } = await req.json();

    if (!name || !email || !password ||!username) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 🔍 Check if user exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save to MongoDB
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword, 
    });

    // ✅ Save to MySQL
    const connection = await sqlPool.getConnection();
    await connection.execute(
      'INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword,username]
    );
    connection.release();

    return new Response(JSON.stringify({
      message: 'User registered successfully.',
      user: { name: user.name, email: user.email }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
