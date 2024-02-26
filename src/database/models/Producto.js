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
            type: DataTypes.STRING(100),
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
        descuento: {
            type: DataTypes.DECIMAL(10, 0),
            
        },
        stock: {
            type:DataTypes.INTEGER,
        },
        generos_idGenero:{
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

    const confi = {
        tableName: 'productos',
        timestamps: false

    }

    const Producto = sequelize.define(alias, cols, confi)

    Producto.associate=function(models){
        Producto.belongsTo(models.Genero, {
            as: 'genero',
            foreignKey:"generos_idGenero"
        });
        Producto.hasMany(models.CarritoCompras, {
            as: 'carritosCompras',
            foreignKey: 'id'
        });
    }
    return Producto;

};
