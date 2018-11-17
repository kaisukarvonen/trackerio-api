import express from 'express';
import Category from '../models/category';
import { isAuthed } from '../utils/token';
import { insert } from '../utils/actions';

const router = express.Router();

router.get('/', (req, res) => {
  Category.find({})
    .sort('name')
    .exec((err, categories) => {
      if (err) throw err;
      res.json(categories);
    });
});

router.post('/', (req, res) => {
  const newCategory = new Category(req.body);
  insert(newCategory, res);
});

router.put('/:id', (req, res) => {
  Category.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
    if (err) res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  Category.remove({ _id: req.params._id }, err => {
    if (err) res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

export default router;
