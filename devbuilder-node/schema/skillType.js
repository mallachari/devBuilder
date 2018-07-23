const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const SkillTypesType = require('./skillTypesType');
const Skill = require('../models/skill');


const SkillType = new GraphQLObjectType({
  name: 'SkillType',
  fields: {
    id: { type: GraphQLID },
    type: { 
      type: SkillTypesType,
      resolve(parentValue) {
        return Skill.findById(parentValue)
          .populate('type')
          .then(skill => skill.type)
      } 
    },
    description: { type: GraphQLString },
    value: { type: GraphQLInt }
  }
})

module.exports = SkillType;