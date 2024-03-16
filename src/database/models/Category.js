module.exports = (sequelize, DataTypes) => {
    const Categorias = sequelize.define('Category', {
      idCategorias: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoria: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    }, {
      tableName: 'categorias',
      timestamps: false
    });
  
    Categorias.associate = models => {
      // Define las asociaciones si las hubiera
    };
  
    return Categorias;
  };
  