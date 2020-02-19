require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Presenter = require('../lib/models/Presenter');
const Presentation = require('../lib/models/Presentation');

describe('presentation routes', () => {

  beforeAll(() => {
    connect();
  });

  let presentations;
  let presenters;
  beforeEach(async() => {
    await mongoose.connection.dropDatabase();
    presenters = await Presenter.create([
      {
        name: 'N. Hazmat',
        email: 'test1@test.com',
        bio: 'I\'ve been everywhere, man.'
      },
      {
        name: 'M. Vorkosigan',
        email: 'test2@test.com',
        bio: 'Cetaganda isn\'t happy with me.'
      }
    ]);
    presentations = await Presentation.create([
      {
        title: 'History of Morris Dance',
        presenter: presenters[0]._id,
        description: '1000 Years of Morris',
        timeSlot: 2,
        isScheduled: true,
      },
      {
        title: 'Mid 90\'s Shoegaze Music',
        presenter: presenters[1]._id,
        description: 'So much 4AD',
        isScheduled: false,
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets a presenter by id', () => {
    return request(app)
      .get(`/api/v1/presenter/${presenters[0]._id}`)
      .then((res) => {
        expect(res.body).toEqual({
          _id: presenters[0]._id.toString(),
          __v: 0,
          name: 'N. Hazmat',
          email: 'test1@test.com',
          bio: 'I\'ve been everywhere, man.'
        });
      });
  });

  it('gets all presenters', () => {
    return request(app)
      .get('/api/v1/presenter/')
      .then(res => {
        expect(res.body).toHaveLength(presentations.length);
        presenters.forEach(presenter => {
          expect(res.body).toContainEqual({
            __v: 0,
            _id: presenter.id,
            bio: presenter.bio,
            email: presenter.email,
            name: presenter.name
          });
        });
      });
  });

  it('can update a presenter', async() => {
    const presenter = await Presenter.create({
      name: 'Spot',
      bio: 'I like the dog park',
      email: 'spot@spot.com'
    });
    const id = presenter._id.toString();
    return request(app)
      .patch(`/api/v1/presenter/${id}`)
      .send({ email: 'spottyspot@spot.com' })
      .then((res) => {
        return expect(res.body).toEqual({
          __v: 0,
          _id: id,
          name: 'Spot',
          bio: 'I like the dog park',
          email: 'spottyspot@spot.com'
        });
      });
  });
});

