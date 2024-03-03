const path = require('path');
const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');
const { production } = require('../database/config/config');

const controllers = {
  // Aquí van los métodos
  login: (req, res) => {
    const successMessage = "";

    res.render('login', {   successMessage: successMessage });

  },
  //   processLogin: (req, res) => {
  //     // Obtener la info del formulario
  //     let { email, password, rememberme } = req.body
  //     // Comparar Password con la DB && Email
  //     let userFound = users.find(user=> user.email == email)

  //     // console.log('body--', req.body);
  //     // console.log('userFound - ', userFound);
  //     // console.log('Comparacion de password',bcryptjs.compareSync(password, userFound.password));

  //     if(userFound && bcryptjs.compareSync(password, userFound.password)){
  //         // Crear la sesión
  //         delete userFound.password
  //         // userFound.password = null;
  //         req.session.userLogged = userFound

  //         if(rememberme == 'on'){
  //             res.cookie('rememberme', userFound.email, {maxAge: 60000 * 60})
  //         }

  //         // Redireccionar a alguna parte
  //         return res.redirect('/users/profile')
  //     }
  //     return res.send('El usuario y contraseña no coinciden')
  // }

  register: (req, res) => {
    

    res.render('register');
  },

  nuevoRegistro: async (req, res) => {
    try {
      console.log('paso');
      const nuevoUsuario = {
        ...req.body,
        password: uuidv4(),
      };

      

      const crearRegistro = await db.Usuario.create(nuevoUsuario);
			

      if (crearRegistro) {
				
				const successMessage = `Se ha registrado exitosamente a: ${crearRegistro.nombre}`;
				
				res.render('login', {   successMessage: successMessage });
      
   
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error interno del servidor al procesar el registro: ${error.message}`);
    }
  },

  editUser: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await db.Usuario.findByPk(id);

      if (usuario) {

        res.render('./userEdit-form.ejs', { usuario });

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
  
			const id = req.params.id;
			const usuario = await db.Usuario.findByPk(id);

			if (usuario) {
			

				usuario.nombre = req.body.nombre || usuario.nombre;
				usuario.fechaNac = req.body.fechaNac || usuario.fechaNac;
				usuario.correo= req.body.correo || usuario.correo;
        usuario.password = req.body.password || usuario.password;
				
				await usuario.save();
				const generos = await db.Genero.findAll();
				const productos = await db.Producto.findAll();
				const successMessage = `Edición exitosa de: ${usuario.nombre}`;

				res.render('index', { generos: generos, productos: productos, successMessage: successMessage });

			} else {
				const errorMessage = 'Producto no encontrado';
				res.render('index', { generos: generos, productos: productos, successMessage: successMessage });

				
			}
		} catch (error) {
			console.error(error);
			return res.status(500).send('Error interno del servidor');
		}
	},

  //   profile: (req, res)=>{
  //     // console.log(req.session.userLogged);
  //     res.render('users/profile.ejs', {userLogged: req.session.userLogged})
  // },
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
