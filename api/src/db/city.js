const createCityModel = (db) => {
  console.log(`[INFO]: Total cities in database: ${db.length}`);
  return {
    get({ offset, limit }) {
      console.log(
        `[INFO: ${new Date().toLocaleTimeString()}]: Queries for getCities | offset: {${offset}}, limit: {${limit}} | `
      );
      if (offset >= db.length) {
        console.warn(
          `[WARN]: offset exceeding the length | offset: {${offset}} total cities: {${db.length}} | `
        );
        return {
          data: [],
          hasMore: false,
        };
      }
      if (offset + limit >= db.length) {
        console.warn(
          `[WARN]: offset+limit exceeding the length, expect less data | cities sent ${limit}} | `
        );
        limit = db.length - offset;
      }
      return {
        data: db.slice(offset, offset + limit),
        hasMore: !(offset + limit === db.length),
      };
    },
  };
};

module.exports = createCityModel;
