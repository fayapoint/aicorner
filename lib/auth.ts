import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'admin-secret';

// Simple admin user for demo purposes
const ADMIN_USER = {
  id: 'admin',
  username: 'admin',
  email: 'admin@ainseconds.com',
  role: 'admin',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIiByeD0iNzUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkE8L3RleHQ+PC9zdmc+',
  firstName: 'Admin',
  lastName: 'User'
};

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function authenticateAdmin(credentials: LoginCredentials): Promise<AdminUser | null> {
  const { username, password } = credentials;
  
  // Simple authentication - in production, use proper user management
  if (username === 'admin' && password === ADMIN_SECRET_KEY) {
    return ADMIN_USER;
  }
  
  return null;
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Middleware to check admin authentication
export function requireAdmin(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user || user.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Forbidden' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add user to request context
    (request as any).user = user;
    
    return handler(request, ...args);
  };
}
