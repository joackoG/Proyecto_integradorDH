const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/models');
const { param } = require('../app');
const uploadDir = path.join(__dirname, '../Public/img/imgProducto');

// Se asume que tienes una variable "products" que se va a utilizar, pero no se ha definido en este fragmento de código.
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Detail - Detail from one product
	detail: async (req, res) => {
		try {

			const id = req.params.id;
			const generos = await db.Genero.findAll();
			const productos = await db.Producto.findByPk(id);

			if (!generos) {

				return res.status(404).send('No se encontraron géneros.');
			}
			const usuario = req.session.usuario;
			res.render('productDetail.ejs', { productos, Genero: generos, usuario });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}

	},

	// Create - Form to create
	create: async (req, res) => {
		try {

			const generos = await db.Genero.findAll();

			if (!generos) {

				return res.status(404).send('No se encontraron géneros.');
			}
			const successMessage = req.session ? req.session.successMessage : undefined;
			const errorMessage = req.session ? req.session.errorMessage : undefined;

			const usuario = req.session.usuario;

			res.render('product-create-form.ejs', { generos, usuario:usuario, successMessage,  });

		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},

	edit: async (req, res) => {
		try {
			const id = req.params.id;
			const producto = await db.Producto.findByPk(id);
			const generos = await db.Genero.findAll();


			if (generos && producto) {
				const usuario = req.session.usuario;

				res.render('./product-edit-form.ejs', { producto, Genero: generos, usuario });

			} else {
				return res.status(404).send('producto o genero  no encontrado')
			}

		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}

	},

	update: async (req, res) => {
		try {
			const id = req.params.id;
			const producto = await db.Producto.findByPk(id);

			if (producto) {
				if (req.file && req.file.filename) {
					
					if (producto.image && producto.image !== 'default-image.png') {
						const oldImagePath = path.join(uploadDir, producto.image);

						if (fs.existsSync(oldImagePath)) {
							fs.unlinkSync(oldImagePath);
						} else {
							console.warn(`La imagen ${producto.image} no existe en el sistema de archivos.`);
						}
					}

					// Asignar el nuevo nombre de archivo
					producto.image = req.file.filename;
				}

				producto.nombreProd = req.body.nombreProd || producto.nombreProd;
				producto.autor = req.body.autor || producto.autor;
				producto.generos_idGenero = req.body.generos_idGenero || producto.generos_idGenero;
				producto.descripcion = req.body.descripcion || producto.descripcion;
				producto.precio = req.body.precio || producto.precio;
				producto.descuento = req.body.descuento || producto.descuento;
				producto.stock = req.body.stock || producto.stock;

				
				await producto.save();
				const generos = await db.Genero.findAll();
				const productos = await db.Producto.findAll();
				const successMessage = `Edición exitosa de: ${producto.nombreProd}`;

				const usuario = req.session.usuario;
				

				res.render('index', { generos: generos, productos: productos, successMessage: successMessage , usuario});

			} else {
				const errorMessage = 'Producto no encontrado';
				res.render('index', { generos: generos, productos: productos, errorMessage: errorsMessage });

				
			}
		} catch (error) {
			console.error(error);
			return res.status(500).send('Error interno del servidor');
		}
	},

		// const requiredFields = ['nombreProd', 'descripcion', 'precio', 'generos_idGenero', 'autor', 'descuento'];
			// const missingFields = requiredFields.filter(field => !(field in req.body));
			// if (missingFields.length > 0) {
			// 	return res.status(400).send(`Los campos ${missingFields.join(', ')} son obligatorios.`);
			// }else{
			// const campos = req.body.length()

	// Create -  Method to store
	store: async (req, res) => {
		try {

			const generos = await db.Genero.findAll();

			const camposObligatorios = ['nombreProd', 'descripcion', 'precio', 'generos_idGenero', 'autor', 'descuento'];

			for (const campo of camposObligatorios) {
				if (!req.body[campo] || req.body[campo].trim() === '') {
					const errorMessage = `El campo ${campo} es obligatorio y no puede estar vacío.`;
					const productos = await db.Producto.findAll();
					const usuario = req.session.usuario;
					
					// Renderizar la vista con el mensaje de error
					return res.render('product-create-form.ejs', { generos, productos, errorMessage, usuario });
				}
			}


			const nuevoProducto = {
				...req.body,
				image: req.file?.filename || 'default-image.png'
			};


			const crearProducto = await db.Producto.create(nuevoProducto);
			const productos = await db.Producto.findAll();
			const successMessage = 'El producto se ha creado exitosamente.';
			const usuario = req.session.usuario;

			res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });
		
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},


	// Delete - Delete one product from DB
	destroy: async (req, res) => {
		try {
			const id = req.params.id;
			const generos = await db.Genero.findAll();

			const eliminarProducto = await db.Producto.destroy({
				where: {
					id: id
				}
			});
			if (eliminarProducto) {
			
				const productos = await db.Producto.findAll();
				const successMessage = 'El producto se ha eliminado exitosamente.';
				const usuario = req.session.usuario;
				
				res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });
			} else {
				res.status(404).json({ error: 'El producto que intentas eliminar no existe' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Error al eliminar el producto' });
		}
	},

	search: async (req, res) => {

		try {
			const query = req.query.search || '';
			const productos = await db.Producto.findAll();
			const generos = await db.Genero.findAll();
			let encontrados = [];
			if (query) {
				encontrados = await db.Producto.findAll({
					where: {
						nombreProd: {
							[db.Sequelize.Op.like]: `%${query}%`
						}
					}
				});
			}
			const usuario = req.session.usuario;
			res.render('productSearch.ejs', { encontrados: encontrados, productos, generos, query, usuario });

		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

};

module.exports = controller;
