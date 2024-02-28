const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/models');
const { param } = require('../app');

// Se asume que tienes una variable "products" que se va a utilizar, pero no se ha definido en este fragmento de código.
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Detail - Detail from one product
	detail: (req, res) => {
		// let id = req.params.id;
		// En este punto, asumo que "products" está definido y es una lista de productos.
		// let product = products.find(product => product.id == id);
		// if (product) {
		// 	return res.render('productDetail.ejs', { product });
		// }
		// return res.send('El producto que buscas no existe');
	},

	// Create - Form to create
	create: async (req, res) => {
		try {

			const generos = await db.Genero.findAll();

			if (!generos) {

				return res.status(404).send('No se encontraron géneros.');
			}

			res.render('product-create-form.ejs', { Genero: generos });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},

	edit: async (req, res) => {
		try{
			const id = req.params.id;
			const producto = await db.Producto.findByPk(id);
			const generos = await db.Genero.findAll();


			if (generos && producto ) {
				
				res.render('./product-edit-form.ejs', { producto , Genero: generos});

			} else{
				return res.status(404).send('producto o genero  no encontrado')
			}

		}catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
		// let id = req.params.id;

		// let product = products.find(product => product.id == id);
		// res.render('product-edit-form.ejs', { product });
	},

	// Update - Method to update
	update: (req, res) => {

		const id = req.params.id;

		// const product = products.find(product => product.id == id);
		// if (product) {
		// 	product.name = req.body.name || product.name;
		// 	product.price = req.body.price || product.price;
		// 	product.description = req.body.description || product.description;
		// 	product.category = req.body.category || product.category;
		// 	product.image = req.body.image || product.image;
		// 	product.discount = req.body.discount || product.discount;

		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		// No se debe escribir directamente en el archivo en el caso de una base de datos.
		// Este código se debe adaptar según cómo manejes la actualización en tu base de datos.
		// res.redirect('/');
	},


	// Create -  Method to store
	store: async (req, res) => {
		try {

			const requiredFields = ['nombreProd', 'descripcion', 'precio', 'generos_idGenero', 'autor', 'descuento'];
			const missingFields = requiredFields.filter(field => !(field in req.body));

			if (missingFields.length > 0) {
				return res.status(400).send(`Los campos ${missingFields.join(', ')} son obligatorios.`);
			}


			const nuevoProducto = {
				...req.body,
				image: 'default-image.png'
			};


			const crearProducto = await db.Producto.create(nuevoProducto);

			res.redirect('/index');
			// res.render('/products/create', { Genero: generos });

		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},


		// Delete - Delete one product from DB
		destroy: async (req, res) => {
			try {
				const id = req.params.id;
				const eliminarProducto = await db.Producto.destroy({
					where: {
						id: id
					}
				});
		
				if (eliminarProducto) {
				
					// res.redirect('/index');
					res.status(200).json({ message: "Registro eliminado correctamente" });
				} else {
					res.status(404).json({ error: 'El producto que intentas eliminar no existe' });
				}
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: 'Error al eliminar el producto' });
			}
		},
		
};

module.exports = controller;
