// Usuario.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require("../config/config");

module.exports = (sequelize, DataTypes) => {
    const alias = 'Usuario';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
        correo: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        FechaNac: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(45),
        },
        roles_id: {
            type: DataTypes.INTEGER,
        }
    };

    const confi = {
        tableName: 'usuarios',
    };

    const Usuario = sequelize.define(alias, cols, confi);

    Usuario.associate = function(models) {
        // Corrige el nombre del modelo en la relación
        Usuario.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'roles_id'
        });
    }

    return Usuario;
};
