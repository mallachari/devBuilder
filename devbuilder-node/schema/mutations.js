const graphql = require('graphql');
const { 
  GraphQLObjectType,
  GraphQLInputObjectType, 
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = graphql;
const jwt = require('jsonwebtoken');

const SkillType = require('../models/skillType');
const SkillTypesType = require('./skillTypesType');
const OrderType = require('./orderType');

const OrderService = require('../services/orderService');

const SkillInputType = new GraphQLInputObjectType({
  name: 'SkillInputType',
  fields: {
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    value: { type: GraphQLInt }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSkillType: {
      type: SkillTypesType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        fullName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, fullName }) {
        return (new SkillType({ name, fullName })).save();
      }
    },
    deleteSkillType: {
      type: SkillTypesType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name }) {
        return SkillType.findOneAndRemove( { name });
      }
    },
    addOrder: {
      type: OrderType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        token: { type: new GraphQLNonNull(GraphQLString) },
        skills: { type: new GraphQLNonNull(new GraphQLList(SkillInputType)) }
      },
      resolve(parentValue, { token, skills }) {
        try {
          var decoded = jwt.verify(token, process.env.JWT_SECRET);
          return OrderService.addOrder(decoded.user, skills);
        } catch(err) {
          return null;
        }
      }
    },
    deleteOrder: {
      type: OrderType,
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { token, id }) {
        try {
          var decoded = jwt.verify(token, process.env.JWT_SECRET);
          return OrderService.deleteOrder(id);
        } catch(err) {
          return null;
        }
      }
    }
  }
});

module.exports = mutation;