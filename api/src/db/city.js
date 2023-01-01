const createCityModel = (db) => {
  console.log(`[INFO]: Total cities in database: ${db.length}`);
  return {
    get({ offset, limit }) {
      const timeStamp = new Date().toLocaleTimeString();
      console.log(
        `[INFO: ${timeStamp}]: Queries for getCities | offset: {${offset}}, limit: {${limit}} | `
      );
      if (offset >= db.length) {
        console.warn(
          `[WARN ${timeStamp}]: offset exceeding the length | offset: {${offset}} total cities: {${db.length}} | `
        );
        return {
          data: [],
          hasMore: false,
        };
      }
      if (offset + limit >= db.length) {
        console.warn(
          `[WARN ${timeStamp}]: offset+limit exceeding the length, expect less data | cities sent ${limit}} | `
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
