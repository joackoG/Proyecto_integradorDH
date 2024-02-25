const config = require("../config/config")

module.exports =(sequelize, DataTypes)=>{
    const alias = 'Rol'
    const cols ={
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        rol:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique: true,       
        },
    }

    const config={
        tableName:'roles',
    }

    const Rol= sequelize.define(alias,cols, config)
    return Rol
}