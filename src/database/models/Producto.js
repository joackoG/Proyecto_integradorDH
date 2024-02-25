const config = require("../config/config")

module.exports = (sequelize, DataTypes) => {
    const alias = 'Producto'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombreProd: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        generos_idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        autor:{
            type: DataTypes.STRING(100),
            allowNull: false,

        },
        image:{
            type: DataTypes.STRING(100),
        }
    }

    const config = {
        tableName: 'productos',
    }

    const Producto = sequelize.define(alias, cols, config)
    return Producto;
}