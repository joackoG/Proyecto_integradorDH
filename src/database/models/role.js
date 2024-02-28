module.exports = (sequelize, DataTypes) => {
  let alias = 'Role'; // Alias repetido
  let columns = {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      rol: {
          type: DataTypes.STRING(45),
          allowNull: true
      }
  };
  let config = {
      timestamps: false
  };

  const Role = sequelize.define(alias, columns, config);

  return Role;
};
