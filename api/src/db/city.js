const createCityModel = (db) => {
  console.log(`[INFO]: Total cities in database: ${db.length}`);
  return {
    get({ offset, limit }) {
      console.log(
        `[INFO]: Queries for getCities | offset: {${offset}}, limit: {${limit}} | `
      );
      if (offset >= db.length) {
        console.warn(
          `[WARN]: offset exceeding the length | offset: {${offset}} total cities: {${db.length}} | `
        );
        return [];
      }
      if (offset + limit >= db.length) {
        console.warn(
          `[WARN]: offset+limit exceeding the length, expect less data | cities sent ${limit}} | `
        );
        limit = db.length - offset;
      }
      return db.slice(offset, offset + limit);
    },
  };
};

module.exports = createCityModel;
