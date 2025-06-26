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

    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],   // First try to find user in MongoDB by email or username
    });

    let sqlUser = null;

    if (!user) {
      const connection = await sqlPool.getConnection();   // If not found in MongoDB, check MySQL
        
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1',
        [identifier, identifier]
      );
      connection.release();

      if (Array.isArray(rows) && rows.length > 0) {
        sqlUser = rows[0];
      }
    }

    const userToCheck = user || sqlUser;  

    if (!userToCheck) {
      return new Response(JSON.stringify({ message: 'Invalid credentials.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = user ? user.password : userToCheck.password;

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      message: 'Login successful',
      user: {
        name: userToCheck.name,
        email: userToCheck.email,
        username: userToCheck.username || '',
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
