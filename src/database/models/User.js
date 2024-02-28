module.exports = (sequelize, DataTypes) => {
  let alias = 'User'; // Alias repetido
  let columns = {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      FechaNac: {
          type: DataTypes.DATE,
          allowNull: false
      },
      correo: {
          type: DataTypes.STRING(45),
          allowNull: false
      },
      pasword: {
          type: DataTypes.STRING(45),
          allowNull: false
      },
      id_rol: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      roles_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  };
  let config = {
      timestamps: false
  };

  const User = sequelize.define(alias, columns, config);

  User.associate = models => {
      User.belongsTo(models.Role, { foreignKey: 'roles_id', as: 'role' });
  };

  return User;
};
