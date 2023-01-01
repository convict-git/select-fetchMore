const { city: db } = require('./cityDB');
const createCityModel = require('./city');

module.exports = {
  models: {
    City: createCityModel(db),
  },
  db,
};
