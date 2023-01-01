const { city: db } = require('./cityDB');
const createCityModel = require('./city');

const dbSliced = db.slice(0, 100);
console.log(dbSliced.length);

module.exports = {
  models: {
    City: createCityModel(dbSliced),
  },
  db: dbSliced,
};
