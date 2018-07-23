const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = require('../app');
const User = require('../models/user');
const SkillType = require('../models/skillType');
const Order = require('../models/order');
const {
  users,
  populateUsers,
  skillTypes,
  populateSkillTypes,
  orders,
  populateOrders,
  skills,
  populateSkills
} = require('./seed/seed');

const token = jwt.sign({ user: users[0] }, process.env.JWT_SECRET, { expiresIn: 7200 }).toString();

beforeEach(populateSkillTypes);
beforeEach(populateUsers);
beforeEach(populateOrders);
beforeEach(populateSkills);


describe('Skill types', () => {
  describe('GET /skill', () => {
    it('should get all skills', (done) => {
      request(app)
        .get('/skill')
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(3);
        })
        .end(done);
    });
  });
  
  describe('POST /skill', () => {
    it('should create new skill', (done) => {
      const skill = {
        name: 'mocha',
        fullName: 'Mocha'
      }
      request(app)
        .post('/skill')
        .send(skill)
        .expect(201)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          SkillType.find({})
            .then((skills) => {
              expect(skills.length).toBe(4);
              expect(skills[3].name).toBe('mocha');
              expect(skills[3].fullName).toBe('Mocha');
              done();
            })
            .catch((e) => done(e));
        })
    });

    it('should not create new skill with missing data', (done) => {
      const skill = {
        name: 'mocha',
        fullName: ''
      }
      request(app)
        .post('/skill')
        .send(skill)
        .expect(400)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          SkillType.find({})
            .then((skills) => {
              expect(skills.length).toBe(3);
              done();
            })
            .catch((e) => done(e));
        })
    });
  });
  
  describe('DELETE /skill', () => {
    it('should remove a skill', (done) => {
      const skillName = skillTypes[0].name;
      request(app)
        .delete(`/skill/${skillName}`)
        .expect(204)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          SkillType.findOne({ name: skillName })
            .then((skill) => {
              expect(skill).toBeFalsy();
              done();
            })
            .catch((e) => done(e));
        })
    });

    it('should return not found error on non existing skill', (done) => {
      const skillName = 'none';
      request(app)
        .delete(`/skill/${skillName}`)
        .expect(404)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          done();
        })
    });
  });
  
});

describe('User', () => {
  describe('POST /auth/signup', () => {
    it('should sign up the user', (done) => {
      const user = {
        firstName: "Jan",
        lastName: "Morton",
        email: "jan@morton.com",
        password: "qazxsw"
      };
      request(app)
        .post('/auth/signup')
        .send(user)
        .expect(201)
        .expect(res => {
          expect(res.body._id).toBeTruthy();
          expect(res.body.email).toBe(user.email);
          expect(res.body.password).not.toBe(user.password);
        })
        .end(done);
    })
  });

  describe('POST /auth/signin', () => {
    it('should sign in the user', (done) => {
      request(app)
        .post('/auth/signin')
        .send({
          email: "taco@burrito.com",
	        password: "qazxsw"
        })
        .expect(200)
        .expect(res => {
          expect(res.body.userId).toBe(users[0]._id.toHexString());
          expect(res.body.token).toBeTruthy();
        })
        .end(done);
    });

    it('should not sign in the user', (done) => {
      request(app)
        .post('/auth/signin')
        .send({
          email: 'fake@email.com',
          password: 'fakepassword'
        })
        .expect(401)
        .end(done);
    })
  })
});

describe('Order', () => {
  describe('GET /order', () => {
    it('should get all orders', (done) => {
      console.log(done);
      request(app)
        .get(`/order?token=${token}`)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(2);
          expect(res.body[0].user._id).toBe(users[0]._id.toHexString())
          expect(res.body[0].skills[0].value).toBe(9)
        })
        .end(done);
    });

    it('should not get orders with wrong token', (done) => {
      console.log(done);
      request(app)
        .get('/order?token=none')
        .expect(401)
        .end(done);
    });

  });

  describe('Post /order', () => {
    it('should create an order', (done) => {
      const order = {
        skills: [
          {
            type: skillTypes[0].name,
            description: 'Very advanced JS',
            value: 10
          },
          {
            type: skillTypes[2].name,
            description: 'Advanced TS',
            value: 9
          }
        ]
      };

      request(app)
        .post(`/order?token=${token}`)
        .send(order)
        .expect(201)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Order.find({})
            .populate({ path: 'skills', populate: { path: 'type' }})
            .then(orders => {
              expect(orders.length).toBe(3);
              expect(orders[2].skills[0].value).toBe(10);
              done();
            })
            .catch(err => done(err));
        })
    });  
  });

  describe('Delete /order/id', () => {
    it('should delete order', (done) => {
      const orderId = orders[0]._id.toHexString();
      request(app)
        .delete(`/order/${orderId}?token=${token}`)
        .expect(204)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          Order.find({})
            .then(ords => {
              expect(ords.length).toBe(1);
              done();
            })
            .catch(e => done(e))
        })
    });
  });
})
