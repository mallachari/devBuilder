const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const SkillTypesType = new GraphQLObjectType({
  name: 'SkillTypesType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    fullName: { type: GraphQLString }
  }
});

module.exports = SkillTypesType;