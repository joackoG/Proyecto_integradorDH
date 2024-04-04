const path = require('path');
const db = require('../database/models');
const uploadDir = path.join(__dirname, '../Public/img/imgUsuario');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { log } = require('console');

const controllers = {



  login: async (req, res) => {
    const userLogged  = await req.session.usuario;
    res.render('users/login', { successMessage: null, errorMessage: null, userLogged  });


  },

  procesoLogin: async (req, res) => {
    try {
      const generos = await db.Genero.findAll();
      const productos = await db.Producto.findAll();
      const { correo, password, recuerdame } = req.body

      const usuario = await db.Usuario.findOne({
        where: { correo },
        // attributes: ['id', 'correo', 'password','nombre' , 'admin', 'fotoPerfil']
      });
      


      if (usuario && (await bcrypt.compare(password, usuario.password))) {


        console.log('Ingreso exitoso');
        req.session.usuario = {
          id: usuario.id,
          nombre: usuario.nombre,
          admin: usuario.admin ,
          fotoPerfil: usuario.fotoPerfil,
        };
        
        delete req.session.usuario.password

        // const path = req.path;

        const successMessage = `Bienvendio a SHENLONG COMICS : ${usuario.nombre}`;
        if(req.body.recuerdame == 'on'){
          res.cookie('recuerdame', usuario.correo, { maxAge: 60000 * 60 });
        }
        userLogged = req.session.usuario;
        console.log(userLogged)
        return res.redirect('/');
        // res.render('index', { generos, productos, successMessage, userLogged });



      } else {

        res.render('users/login', { errorMessage: 'Correo y/o contraseña incorrecta', successMessage: null, userLogged : null });
      }
    } catch (error) {
      console.error('Error al manejar el inicio de sesión:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  cerrarSesion: async (req, res) => {
    try {
      if (req.session.usuario) {
        res.clearCookie("recuerdame");
        req.session.destroy();

        res.redirect('/')
      } 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).send('Error interno del servidor');
    }


  },

  register: (req, res) => {

    res.redirect('/register');
  },

  nuevoRegistro: async (req, res) => {
    try {
      const userLogged = req.session.usuario;

      const results = validationResult(req);
      const errors = results.errors;

      if (errors.length === 0) {

        const nuevoUsuario = {
          nombre: req.body.nombre,
          correo: req.body.correo,
          fechaNac: req.body.fechaNac,
          password: await bcrypt.hash(req.body.password, 10),
          fotoPerfil: req.file ? req.file.filename : 'default-image.png',
        };
        const crearRegistro = await db.Usuario.create(nuevoUsuario);
        const successMessage = `Se ha registrado exitosamente a: ${crearRegistro.nombre}`;
        res.render('users/login', { successMessage, userLogged  });

      } else {
        console.log(errors);
        const userLogged  = req.session.usuario;

        return res.render('users/register', { userLogged , errors: results.mapped(), oldData: req.body });

      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error interno del servidor al procesar el registro: ${error.message}`);
    }
  },

  editUser: async (req, res) => {
    try {
      userLogged =req.session.usuario;
      const id = req.params.id;
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {

        res.render('./users/userEdit-form.ejs', { userLogged, usuario });

      } else {
        return res.status(404).send('usuario  no encontrado')
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const productos = await db.Producto.findAll();
      const generos = await db.Genero.findAll();
      let userLogged  = req.session.usuario;

      const id = req.params.id;
      const usuario = await db.Usuario.findByPk(id);

      const results = validationResult(req);
      const errors = results.errors;


      if (usuario) {
        if (errors.length === 0) {

          if (req.file && req.file.filename) {
            if (usuario.fotoPerfil && usuario.fotoPerfil !== 'default-image.png') {
              const oldImagePath = path.join(uploadDir, usuario.fotoPerfil);

              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              } else {
                console.warn(`La imagen ${usuario.fotoPerfil} no existe en el sistema de archivos.`);
              }
            }

            usuario.fotoPerfil = req.file.filename || usuario.fotoPerfil;
          }

          usuario.nombre = req.body.nombre || usuario.nombre;
          usuario.fechaNac = req.body.fechaNac || usuario.fechaNac;
          usuario.correo = req.body.correo || usuario.correo;
          usuario.password = req.body.password || usuario.password;


          await usuario.save();
          Object.assign(userLogged, {
            nombre: usuario.nombre,
            fotoPerfil: usuario.fotoPerfil
          });
          const successMessage = `Edición exitosa de: ${usuario.nombre}`;
          res.render('index', { generos, productos, successMessage, usuario, userLogged  });
        }else{
          console.log(errors);
  
          return res.render('users/userEdit-form', { userLogged , usuario,errors: results.mapped(), oldData: req.body });
        }
      } else {
        const errorMessage = 'Usuario no encontrado';
        // const userLogged  = req.session.usuario;
        res.render('index', { generos, errorMessage, userLogged });


      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  profile: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {

        res.render('./users/profile.ejs', { usuario });

      } else {
        return res.status(404).send('usuario  no encontrado')
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

  },
  userDelete: async (req,res)=>{
    const id = req.params.id;
      console.log(id)
      const eliminarUsuario = await db.Usuario.destroy({
        where:{
          id:id
        }
      })

      if(eliminarUsuario){
        const successMessage = 'El pusuario se ha eliminado exitosamente.';
        res.clearCookie("recuerdame");
        req.session.destroy();
       
      }
  },
  usersList: async (req, res)=>{
    const usuarios = await db.Usuario.findAll();
    const userLogged  = req.session.usuario
    res.render('users/usersList.ejs' , {usuarios, userLogged})
  },
  userDeleteAdmin: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const eliminarUsuario = await db.Usuario.destroy({
            where: {
                id: id
            }
        });

        if (eliminarUsuario) {
            const successMessage = 'El usuario se ha eliminado exitosamente.';
            res.redirect('/users/usersList');
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Hubo un error al intentar eliminar el usuario.');
    }
}



};



module.exports = controllers;
