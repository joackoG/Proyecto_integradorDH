const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const uploadDir = path.join(__dirname, '../Public/img/imgProducto');
const { validationResult } = require('express-validator');


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

			res.render('product-create-form.ejs', { generos, usuario: usuario, successMessage, });

		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},
	store: async (req, res) => {
		try {
			const results = validationResult(req);
			const errors = results.errors;

			const generos = await db.Genero.findAll();
			const productos = await db.Producto.findAll();

			if (errors.length === 0) {

				const nuevoProducto = {
					...req.body,
					image: req.file?.filename || 'default-image.png'
				};


				const crearProducto = await db.Producto.create(nuevoProducto);
				const successMessage = 'El producto se ha creado exitosamente.';
				const usuario = req.session.usuario;

				res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });
			} else {
				console.log(errors);
				const usuario = req.session.usuario;
				return res.render('product-create-form.ejs', { generos, productos, usuario, errors: results.mapped(), oldData: req.body });
			}

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

				res.render('./product-edit-form.ejs', { producto, generos: generos, usuario });

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
			const results = validationResult(req);
			const errors = results.errors;
			const generos = await db.Genero.findAll();

			const productos = await db.Producto.findAll();
			
				if (producto) {
					
			if (errors.length === 0) {

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
					const successMessage = `Edición exitosa de: ${producto.nombreProd}`;

					const usuario = req.session.usuario;


					res.render('index', { generos: generos, productos: productos, successMessage: successMessage, usuario });

				}
				else{
					console.log(errors);
					const usuario = req.session.usuario;
	
					return res.render('product-edit-form', { generos, producto, usuario, errors: results.mapped(), oldData: req.body });
	
				}

				} else {
					const errorMessage = 'Producto no encontrado';
					res.render('index', { generos: generos, productos: productos, errorMessage: errorMessage });


				}
			} catch (error) {
				console.error(error);
				return res.status(500).send('Error interno del servidor');
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
