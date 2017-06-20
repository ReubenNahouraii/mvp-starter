let db = require('./connectDB');

let selectAllFromTable = function(tableName) {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${tableName}`, function(err, results, fields) {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

let selectUser = function(currUser) {
  return new Promise((resolve, reject) => {
    db.query(`Select * from users where name='${currUser}'`, (err, results, fields) => {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

let addUser = function(currUser) {
  return new Promise((resolve, reject) => {
    db.query(`insert into users values (null, '${currUser}', 0, 0)`, (err, results, fields) => {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

let addTopic = function(topic) {
  return new Promise((resolve, reject) => {
    db.query(`insert into topics values (null, '${topic}')`, (err, results, fields) => {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// let selectTopics = function(currUser) {
//   return new Promise((resolve, reject) => {
//     db.query(`Select * from users where name='${currUser}'`, (err, results, fields) => {
//       if(err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };
module.exports.selectAllFromTable = selectAllFromTable;
module.exports.selectUser = selectUser;
module.exports.addUser = addUser;
module.exports.addTopic = addTopic;
