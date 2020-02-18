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

  it('gets a presenter by id', async() => {
    await request(app)
      .get(`/api/v1/presenter/${presenters[0]._id}`)
      .then((res) => {
        return expect(res.body).toEqual({
          _id: presenters[0]._id.toString(),
          __v: 0,
          name: 'N. Hazmat',
          email: 'test1@test.com',
          bio: 'I\'ve been everywhere, man.'
        });
      });
  });
});

