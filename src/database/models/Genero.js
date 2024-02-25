const config = require("../config/config")

module.exports =(sequelize, DataTypes)=>{
    const alias = 'Genero'
    const cols ={
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        genero:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique: true,       
        },
    }
}

    const config={
        tableName:'generos',
    }

    const Genero= sequelize.define(alias,cols, config)
    return Genero;