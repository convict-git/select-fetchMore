module.exports = {
  Query: {
    getCities(_, { input }, { models }) {
      return models.City.get(input);
    },
  },
};
