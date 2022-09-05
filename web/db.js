import mongoose from 'mongoose';
const db_connection = function () {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(`mongodb://localhost:27017/tabs_db`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        error.message = 'could not connect to database, the server may be down';
        reject(error);
      });
  });
};

export default db_connection;
