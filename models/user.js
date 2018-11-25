import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      const userError = new Error('User not found.');
      userError.status = 401;
      return callback(userError);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      }
      return callback();
    });
  });
};

/* eslint-disable */
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/* eslint-enable */

const User = mongoose.model('User', userSchema);
export default User;
