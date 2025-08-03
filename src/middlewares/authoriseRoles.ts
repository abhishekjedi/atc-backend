import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      (req as any).user = payload;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export default authorizeRoles;