// CarritoCompras.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require("../config/config");

module.exports = (sequelize, DataTypes) => {
    const alias = 'CarritoCompras';
    const cols = {
        usuarios_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_carrito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productos_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productos_generos_idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        }
    };

    const confi = {
        tableName: 'carritodecompras',
        timestamps: false

    };

    const CarritoCompras = sequelize.define(alias, cols, confi);

    CarritoCompras.associate = function(models) {
        CarritoCompras.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'usuarios_id'
        });

        // Utiliza el nombre correcto del modelo Producto aquí
        CarritoCompras.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey: 'productos_id'
        });
    }

    return CarritoCompras;
};
