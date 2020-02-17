const { Router } = require('express');
const Presentation = require('../models/Presentation');

module.exports = Router()
  .post('/', (req, res, next) => {
    return Presentation
      .create(req.body)
      .then(presentation => res.send(presentation))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    if(!req.query) {
      req.query = {};
    }
    return Presentation
      .find(req.query)
      .then(presentations => res.send(presentations))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    return Presentation
      .findById()
      .then(presentation => res.send(presentation))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { name } = req.body;
    return Presentation
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .then(presentation => res.send(presentation))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    return Presentation
      .findByIdAndDelete(req.params.id)
      .then(presentation => res.send(presentation))
      .catch(next);
  });
