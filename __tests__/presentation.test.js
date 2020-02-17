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

    await Presentation.create([
      {
        title: 'History of Morris Dance',
        presenter: 'Linda G',
        description: '1000 Years of Morris',
        timeSlot: 2,
        isScheduled: true,
      },
      {
        title: 'Mid 90\'s Shoegaze Music',
        presenter: 'Ali M',
        description: 'So much 4AD',
        isScheduled: false,
      }
    ]);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all presentations', async() => {
    return request(app)
      .get('/api/v1/presentation/')
      .then((res) => {
        return expect(res.body).toEqual(
          [
            {
              __v: 0,
              _id: expect.any(String),
              title: 'Mid 90\'s Shoegaze Music',
              presenter: 'Ali M',
              description: 'So much 4AD',
              isScheduled: false,
            },   
            {
              __v: 0,
              _id: expect.any(String),
              title: 'History of Morris Dance',
              presenter: 'Linda G',
              description: '1000 Years of Morris',
              timeSlot: 2,
              isScheduled: true,
            },
          ] 
        );
      });
  });

  it('gets all scheduled presentations', async() => {
    await Presentation.create();

    return request(app)
      .get('/api/v1/presentation/?isScheduled=true')
      .then((res) => {
        return expect(res.body).toEqual(
          [
            {
              __v: 0,
              _id: expect.any(String),
              title: 'History of Morris Dance',
              presenter: 'Linda G',
              description: '1000 Years of Morris',
              timeSlot: 2,
              isScheduled: true,
            }
          ] 
        );
      });
  });
});
