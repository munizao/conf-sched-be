require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Presentation = require('../lib/models/Presentation');

describe('presentation routes', () => {
  
  beforeAll(() => {
    connect();
  });
  
  // let examplePresentation;
  beforeEach(async() => {
    await mongoose.connection.dropDatabase();

    await Presentation.create({
      title: 'History of Morris Dance',
      presenter: 'Linda G',
      description: '1000 Years of Morris',
      isScheduled: false,
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all presentations', async() => {
    return request(app)
      .get('/api/v1/presentation/')
      .then(res => {
        console.log(res.body);
        return expect(res.body).toEqual(
          [
            {
              __v: 0,
              _id: expect.any(String),
              title: 'History of Morris Dance',
              presenter: 'Linda G',
              description: '1000 Years of Morris',
              isScheduled: false,
            }
          ] 
        );
      });
  });
});
