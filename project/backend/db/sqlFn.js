module.exports = function query(sql) {
  return new Promise((resolve, reject) => {
    global.con.query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
