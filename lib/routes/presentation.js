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
      .sort({ timeSlot: 1 })
      .then(presentations => res.send(presentations))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    return Presentation
      .findById(req.params.id)
      .then(presentation => res.send(presentation))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    return Presentation
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(presentation => res.send(presentation))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    return Presentation
      .findByIdAndDelete(req.params.id)
      .then(presentation => res.send(presentation))
      .catch(next);
  });
