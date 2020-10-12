module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User', {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      mobile: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
    }, {
      hooks: {
        afterValidate: (data, options) => {
          // const encoded = crypto.createHash('sha1');
          // eslint-disable-next-line no-param-reassign
          // data.password = encoded.digest('hex');
        },
      },
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );

  return user;
};
