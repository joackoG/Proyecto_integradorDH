module.exports = (sequelize, DataTypes) => {
  let alias = 'ShoppingCart'; // Alias repetido
  let columns = {
      usuarios_id: {
          type: DataTypes.INTEGER,
          primaryKey: true
      },
      productos_id: {
          type: DataTypes.INTEGER,
          primaryKey: true
      },
      productos_categorias_idCategorias: {
          type: DataTypes.INTEGER,
          primaryKey: true
      },
      id_carrito: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true
      },
      cantidad: {
          type: DataTypes.INTEGER,
          allowNull: true
      }
  };
  let config = {
      tableName: 'carritoDeCompras',
      timestamps: false
  };

  const ShoppingCart = sequelize.define(alias, columns, config);

  ShoppingCart.associate = models => {
      ShoppingCart.belongsTo(models.User, { foreignKey: 'usuarios_id', as: 'user' });
      ShoppingCart.belongsTo(models.Product, { foreignKey: 'productos_id', as: 'product' });
  };

  return ShoppingCart;
};
