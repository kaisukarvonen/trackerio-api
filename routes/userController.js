import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET } from '../config';

const router = express.Router();

function generateToken(user) {
  const u = {
    displayName: user.displayName,
    username: user.username,
    _id: user._id.toString()
  };
  return jwt.sign(u, JWT_SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

router.post('/', (req, res) => {
  User.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      res.status(500).send('Login failed');
    } else {
      const token = generateToken(user);
      const newUser = { displayName: user.displayName, username: user.username, _id: user._id };
      res.json({ user: newUser, token });
    }
  });
});

export default router;
