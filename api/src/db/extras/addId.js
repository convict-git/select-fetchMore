const { nanoid } = require('nanoid');
const cities = require('./us-cities.json');

console.log(JSON.stringify(cities.map((city) => ({ id: nanoid(), ...city }))));
