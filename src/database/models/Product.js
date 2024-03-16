module.exports = (sequelize, DataTypes) => {
  let alias = 'Product'; // Alias repetido
  let columns = {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      nombreProd: {
          type: DataTypes.STRING(45),
          allowNull: false
      },
      descripcion: {
          type: DataTypes.STRING(100),
          allowNull: false
      },
      precio: {
          type: DataTypes.DECIMAL,
          allowNull: false
      },
      descuento: {
          type: DataTypes.DECIMAL,
          allowNull: true
      },
      stock: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      categorias_idCategorias: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  };
  let config = {
      timestamps: false
  };

  const Product = sequelize.define(alias, columns, config);

  Product.associate = function (models ){
      Product.belongsTo(models.Category, { foreignKey: 'categorias_idCategorias', as: 'category' });
  };

  return Product;
};

  