const config = require("../config/config")

module.exports =(sequelize, DataTypes)=>{
    const alias = 'Rol'
    const cols ={
        usuarios_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,

        },
        id_carrito:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        productos_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
        },
        productos_generos_idGenero:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            
        },
        cantidad:{
            type:DataTypes.INTEGER,

        }

    }

    const config={
        tableName:'carritodecompras',
    }

    const Carrito= sequelize.define(alias,cols, config)
    return Carrito;
}