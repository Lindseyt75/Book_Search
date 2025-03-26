import jwt from 'jsonwebtoken';

interface UserToken {
  _id: string;
  name: string;
}

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ').pop(); // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: 'You are not authorized!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as UserToken;
    req.user = decoded;  // Attach the decoded user to the request object
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
