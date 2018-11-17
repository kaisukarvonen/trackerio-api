import express from 'express';
import Sport from '../models/sport';
import { isAuthed } from '../utils/token';
import { insert } from '../utils/actions';

const router = express.Router();

router.get('/', (req, res) => {
  Sport.find({})
    .sort('name')
    .exec((err, sports) => {
      if (err) res.status(500).send(err);
      res.json(sports);
    });
});

router.post('/', (req, res) => {
  const newSport = new Sport(req.body);
  insert(newSport, res);
});

router.put('/:id', (req, res) => {
  Sport.findOneAndUpdate({ _id: req.params.id }, req.body, (err, sport) => {
    if (err) res.status(500).send(err);
    res.send(200);
  });
});

router.delete('/:id', (req, res) => {
  Sport.remove({ _id: req.params._id }, err => {
    if (err) res.status(500).send(err);
    res.send(200);
  });
});

export default router;
