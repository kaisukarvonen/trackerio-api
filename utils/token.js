import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../config';

export const isAuthed = (req, res, next) => {
  const header = req.header('authorization');
  if (header) {
    const token = header.split(' ')[1];
    try {
      jwt.verify(token, JWT_TOKEN);
      return next();
    } catch (error) {
      res.status(500).send('Token is not valid');
    }
  } else {
    res.status(500).send('Token missing');
  }
};
