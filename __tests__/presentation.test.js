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

  it('sorts presentations by timeSlot', async() => {
    await Presentation.create([
      {
        title: 'Spot, and other POJOs',
        presenter: 'Ryan M',
        description: 'Spot is a very good POJO',
        timeSlot: 3,
        isScheduled: true
      },
      {
        title: 'Revels Music is Awesome',
        presenter: 'Robert L',
        description: 'Sing with us!',
        timeSlot: '1',
        isScheduled: true
      }
    ]);
    return request(app)
      .get('/api/v1/presentation/?isScheduled=true')
      .then((res) => {
        return expect(res.body).toEqual(
          [  
            {
              __v: 0,
              _id: expect.any(String),
              title: 'Revels Music is Awesome',
              presenter: 'Robert L',
              description: 'Sing with us!',
              timeSlot: 1,
              isScheduled: true
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
            {
              __v: 0,
              _id: expect.any(String),
              title: 'Spot, and other POJOs',
              presenter: 'Ryan M',
              description: 'Spot is a very good POJO',
              timeSlot: 3,
              isScheduled: true
            }
          ]);
      });
  });

  it('gets a presentation by id', async() => {
    const spot = await Presentation.create({
      title: 'Spot, and other POJOs',
      presenter: 'Ryan M',
      description: 'Spot is a very good POJO',
      timeSlot: 3,
      isScheduled: true
    });
    const id = spot._id.toString();

    return request(app)
      .get(`/api/v1/presentation/${id}`)
      .then((res) => {
        return expect(res.body).toEqual(
          {
            __v: 0,
            _id: id,
            title: 'Spot, and other POJOs',
            presenter: 'Ryan M',
            description: 'Spot is a very good POJO',
            timeSlot: 3,
            isScheduled: true
          });
      });

  });

  it('updates a presentation', async() => {
    const spot = await Presentation.create({
      title: 'Spot, and other POJOs',
      presenter: 'Ryan M',
      description: 'Spot is a very good POJO',
      timeSlot: 3,
      isScheduled: true
    });
    const id = spot._id.toString();

    return request(app)
      .patch(`/api/v1/presentation/${id}`)
      .send({ isScheduled: false })
      .then((res) => {
        return expect(res.body).toEqual(
          {
            __v: 0,
            _id: id,
            title: 'Spot, and other POJOs',
            presenter: 'Ryan M',
            description: 'Spot is a very good POJO',
            timeSlot: 3,
            isScheduled: false
          });
      });

  });

  it('deletes a presentation by id', async() => {
    const spot = await Presentation.create({
      title: 'Spot, and other POJOs',
      presenter: 'Ryan M',
      description: 'Spot is a very good POJO',
      timeSlot: 3,
      isScheduled: true
    });
    const id = spot._id.toString();
    request(app)
      .delete(`/api/v1/presentation/${id}`)
      .then((res) => {
        return expect(res.body).toEqual(
          {
            __v: 0,
            _id: id,
            title: 'Spot, and other POJOs',
            presenter: 'Ryan M',
            description: 'Spot is a very good POJO',
            timeSlot: 3,
            isScheduled: true
          });
      });
    return request(app)
      .get(`/api/v1/presentation/${id}`)
      .then((res) => {
        return expect(res.body).toEqual({});
      });
  });
});
