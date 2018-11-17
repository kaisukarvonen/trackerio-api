import express from 'express';
import CompletedActivity from '../models/completedActivity';
import { insert } from '../utils/actions';

const router = express.Router();

router.get('/', (req, res) => {
  CompletedActivity.find({})
    .sort('-date')
    .populate('categories.category')
    // .populate('user')
    .populate('sport')
    .exec((err, activities) => {
      if (err) throw err;
      res.json(activities);
    });
});

router.post('/', (req, res) => {
  const newCompletedActivity = new CompletedActivity(req.body);
  insert(newCompletedActivity, res);
});

router.put('/:id', (req, res) => {
  CompletedActivity.findOneAndUpdate({ _id: req.params.id }, req.body, err => {
    if (err) res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  CompletedActivity.remove({ _id: req.params._id }, err => {
    if (err) res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

export default router;
