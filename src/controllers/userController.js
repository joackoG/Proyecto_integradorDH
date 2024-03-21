const path = require('path');
const db = require('../database/models');
const uploadDir = path.join(__dirname, '../Public/img/imgUsuario');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const controllers = {



  login: async (req, res) => {
    const usuario = await req.session.usuario;
    res.render('login', { successMessage: null, errorMessage: null, usuario });


  }, procesoLogin: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.render("users/login", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
  
      const { correo, password } = req.body;
      const userToLogin = await db.Usuario.findOne({ where: { correo: correo } });
  
      if (!userToLogin) {
        const errorMessage = 'Credenciales incorrectas';
        return res.render('login', { errorMessage });
      }
  
      const isOkThePassword = bcryptjs.compareSync(password, userToLogin.password);
  
      if (!isOkThePassword) {
        const errorMessage = 'Credenciales incorrectas';
        return res.render('login', { errorMessage });
      }
  
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
  
      if (req.body.recuerdame) {
        res.cookie("userEmail", req.body.email, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
        });
      }
  
      console.log("Usuario logueado:", userToLogin.nombre);
      return res.redirect('profile');
    } catch (error) {
      console.error('Error al manejar el inicio de sesión:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  cerrarSesion: async (req, res) => {

    try {
      const generos = await db.Genero.findAll();
      const productos = await db.Producto.findAll();

      if (req.session.usuario) {
        res.clearCookie("userEmail");
        req.session.destroy();

        const successMessage = `Su sesion se ha cerrado`;
        res.redirect("/")

      } else {
        const successMessage = `No hay usuario autenticado`;
        res.redirect('/')
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).send('Error interno del servidor');
    }


  },

  register: (req, res) => {

    const usuario = null;
    res.render('register', { usuario });
    // res.render('register');
  },

  nuevoRegistro: async (req, res) => {
    try {
      const usuario = req.session.usuario;

      const results = validationResult(req);
      const errors = results.errors;

      if (errors.length === 0) {

        const nuevoUsuario = {
          nombre: req.body.nombre,
          correo: req.body.correo,
          fechaNac: req.body.fechaNac,
          password: await bcryptjs.hash(req.body.password, 10),
          fotoPerfil: req.file ? req.file.filename : 'default-image.png',
        };
        const crearRegistro = await db.Usuario.create(nuevoUsuario);
        const successMessage = `Se ha registrado exitosamente a: ${crearRegistro.nombre}`;
        res.render('login', { successMessage: successMessage, usuario });

      } else {
        console.log(errors);
        const usuario = req.session.usuario;

        return res.render('register', { usuario, errors: results.mapped(), oldData: req.body });

      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error interno del servidor al procesar el registro: ${error.message}`);
    }
  },

  editUser: async (req, res) => {
    try {
      
        // En tu controlador de usuarios (userController.js)
        
            // Obtener el usuario actualmente logueado de req.session.userLogged
    
        
            // Renderizar la vista del formulario de edición de usuario
  
          
     
      const usuario = await db.Usuario.findByPk(req.session.userLogged.id);

      if (usuario) {

        res.render('userEdit-form', { usuario: usuario });


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
          const successMessage = `Edición exitosa de: ${usuario.nombre}`;
          // const usuario = req.session.usuario;
          res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });
        }else{
          console.log(errors);
          const usuarioLog = req.session.usuario;
  
          return res.render('userEdit-form', { usuarioLog, usuario,errors: results.mapped(), oldData: req.body });
        }
      } else {
        const errorMessage = 'Usuario no encontrado';
        const usuario = req.session.usuario;
        res.render('index', { generos: generos, errorMessage, usuario });


      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error interno del servidor');
    }
  },

  profile: async (req, res) => {
    try {
      const id = req.session.userLogged.id
      console.log(id)
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {

        res.render('./profile.ejs', { usuario });

      } else {
        return res.status(404).send('usuario  no encontrado')
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

  },
logout: (req, res) => {
  res.clearCookie("userEmail");
  req.session.destroy();
  return res.redirect('/login');
},
  // logout: (req, res) => {
  //   // req.session.destroy()
  //   req.session.userLogged = undefined //borrar session
  //   res.clearCookie('rememberme') //borrar cookie
  //   res.redirect('/')
  // }
  // proceso de login
  // if(rememberme == 'on'){
  //   res.cookie('rememberme', userFound.email, {maxAge: 60000 * 60})
  // }
};



module.exports = controllers;
