const { Router } = require('express');
const Presenter = require('../models/Presenter');

module.exports = Router()
  .post('/', (req, res, next) => {
    return Presenter
      .create(req.body)
      .then(presenter => res.send(presenter))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    if(!req.query) {
      req.query = {};
    }
    return Presenter
      .find(req.query)
      .then(presenters => res.send(presenters))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    return Presenter
      .findById(req.params.id)
      .populate('presentations')
      .then(presenter => res.send(presenter))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    return Presenter
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(presenter => res.send(presenter))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    return Presenter
      .findByIdAndDelete(req.params.id)
      .then(presenter => res.send(presenter))
      .catch(next);
  });
