export const insert = (object, res) => {
  object.save((err, jsonObject) => {
    if (err) res.status(500).send(err.message);
    res.json(jsonObject);
  });
};
