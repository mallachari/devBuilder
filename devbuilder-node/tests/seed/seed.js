const {
  ObjectID
} = require('mongodb');
const User = require('../../models/user');
const SkillType = require('../../models/skillType');
const Order = require('../../models/order');
const Skill = require('../../models/skill');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const orderOneId = new ObjectID();
const orderTwoId = new ObjectID();

const skillTypeOneId = new ObjectID();
const skillTypeTwoId = new ObjectID();
const skillTypeThreeId = new ObjectID();

const skillOneId = new ObjectID();
const skillTwoId = new ObjectID();
const skillThreeId = new ObjectID();
const skillFourId = new ObjectID();



const users = [
  {
    _id: userOneId,
    firstName: 'Taco',
    lastName: 'Burrito',
    password: 'qazxsw',
    email: 'taco@burrito.com'
  },
  {
    _id: userTwoId,
    firstName: 'Burrito',
    lastName: 'Taco',
    password: 'qazxsw',
    email: 'burrito@taco.com'
  }
];

const skillTypes = [
  {
    _id: skillTypeOneId,
    name: 'javascript',
    fullName: 'JavaScript'
  },
  {
    _id: skillTypeTwoId,
    name: 'typecript',
    fullName: 'TypeScript'
  },
  {
    _id: skillTypeThreeId,
    name: 'nodejs',
    fullName: 'Node.js'
  }
];

const skills = [
  { 
    _id: skillOneId,
    type: skillTypeOneId,
    description: 'Advanced JS',
    value: 9,
    order: orderOneId
  },
  {
    _id: skillTwoId,
    type: skillTypeTwoId,
    description: 'Basic TS',
    value: 5,
    order: orderOneId
  },
  {
    _id: skillThreeId,
    type: skillTypeOneId,
    description: 'Strong JS background',
    value: 10,
    order: orderTwoId
  },
  {
    _id: skillFourId,
    type: skillTypeThreeId,
    description: 'Experience with node.js',
    value: 6,
    order: orderTwoId
  }
];

const orders = [
  {
    _id: orderOneId,
    user: userOneId,
    skills: [
      skillOneId,
      skillTwoId 
    ]
  },
  {
    _id: orderTwoId,
    user: userTwoId,
    skills: [
      skillThreeId,
      skillFourId
    ]
  }
];

const setTimeout = function(done) {
  this.timeout(10000);
}

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      const user1 = new User(users[0]).save();
      const user2 = new User(users[1]).save();
      return Promise.all([user1, user2]);
    })
    .then(() => done());
}

const populateSkillTypes = function(done) {
  this.timeout(10000);
  SkillType.remove({})
  .then(() => {
    return SkillType.insertMany(skillTypes);
  })
  .then(() => done());
}

const populateSkills = function(done) {
  this.timeout(10000);
  Skill.remove({})
  .then(() => {
    return Skill.insertMany(skills);
  })
  .then(() => done());
}

const populateOrders = (done) => {
  Order.remove({})
    .then(() => {
      //return Order.insertMany(orders);
      const order1 = new Order(orders[0]).save();
      const order2 = new Order(orders[1]).save();
      return Promise.all([order1, order2]);
    })
    .then(() => done());
}

module.exports = {
  users,
  populateUsers,
  skillTypes,
  populateSkillTypes,
  orders,
  populateOrders,
  skills,
  populateSkills,
  setTimeout
}

