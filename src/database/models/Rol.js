const { Sequelize, DataTypes } = require('sequelize');
const config = require("../config/config");

module.exports = (sequelize, DataTypes) => {
    const alias = 'Rol';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        rol: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
    };

    const confi = {
        tableName: 'roles',
        timestamps: false

    };

    const Rol = sequelize.define(alias, cols, confi);

    Rol.associate= function(models){
        Rol.hasMany(models.Usuario,{
            as:"Usuario",
            foreignKey:"id"
        })
    }
    return Rol;
};
