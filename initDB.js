import mongoose from 'mongoose';
import User from './models/user';
import Sport from './models/sport';
import Category from './models/category';
import { MONGOURL } from './config';

mongoose.connect(MONGOURL);

const createSports = () => {
  const sports = [{ name: 'Tankotanssi' }, { name: 'Venyttely' }, { name: 'Kuntosali' }];
  sports.forEach(sport => {
    const s = new Sport(sport);

    s.save(err => {
      if (err) {
        console.log(`ERROR on create Sport ${sport.name}: ${err.message}`);
      }
    });
  });
};

const createCategories = () => {
  const categories = [{ name: 'Venyvyys' }, { name: 'Lihaskunto' }, { name: 'Tanssi' }];
  categories.forEach(category => {
    const s = new Category(category);

    s.save(err => {
      if (err) {
        console.log(`ERROR on create Category ${category.name}: ${err.message}`);
      }
    });
  });
};

const createUsers = () => {
  const users = [
    { username: 'xkaisuk', displayName: 'Kaisu', password: '1234' },
    { username: 'sonjam', displayName: 'Sonja', password: '1234' }
  ];
  users.forEach(user => {
    const u = new User(user);
    u.save(err => {
      if (err) {
        console.log(`ERROR on create User ${user.username}: ${err.message}`);
      }
    });
  });
};

console.log('STARTING DATABASE INITIALIZING');

createSports();
createCategories();
createUsers();

console.log('FINISHED INITIALiZING DATABASE');
