const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const {
    db,
  } = res;

  const {
    email,
    name,
    password,
    mobile,
  } = req.body;

  if (!email || !name || !password || !mobile) return res.endWithMessage(400, 'INVALID INPUT');
  const allUsers = await db.User.findAll({ where: {} });
  const usersJSON = allUsers.map((el) => el.toJSON());
  const tableIsEmpty = usersJSON.length === 0;

  const createUser = async (values) => db.User.create(values);

  const existingUser = await db.User.findOne({
    where: {
      [Op.or]: [{ email }, { mobile }],
    },
  })
    .catch((err) => {
      throw err;
    });

  if (existingUser) return res.endWithMessage(400, 'duplicate');

  const values = {
    name,
    email,
    password,
    mobile,
  };

  values.auth = tableIsEmpty ? 'admin' : 'user';

  const newUser = await createUser(values);
  return res.json(newUser);
};
