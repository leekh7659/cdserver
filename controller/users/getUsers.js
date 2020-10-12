const utils = require('../utils');

module.exports = async (req, res) => {
  const { db } = res;
  // const auth = await utils.jwt.verify(req.session.auth, (err, decoded) => {
  //   if (err) return false;
  //   return decoded.data;
  // });
  // if (!auth || auth !== 'admin') return res.endWithMessage(400, 'UNAUTHORIZED REQUEST');

  const query = `
  SELECT *
  FROM 
    Users AS U
  ORDER BY
    U.createdAt
  `;

  const users = await new Promise((resolve, reject) => {
    db.mysql.query(query, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  return res.json(users);
};
