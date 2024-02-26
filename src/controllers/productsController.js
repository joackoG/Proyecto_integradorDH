const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('../database/models');

// Se asume que tienes una variable "products" que se va a utilizar, pero no se ha definido en este fragmento de código.
// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	// index: (req, res) => {
	// 	// res.render('products.ejs', { products: products })
	// 	return res.render('/');
	// },

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		// En este punto, asumo que "products" está definido y es una lista de productos.
		let product = products.find(product => product.id == id);
		if (product) {
			return res.render('productDetail.ejs', { product });
		}
		return res.send('El producto que buscas no existe');
	},

	// Create - Form to create
	create: async (req, res) => {
		try {
			// Obtén los géneros desde tu base de datos o de donde corresponda
			const generos = await db.Genero.findAll(); // Reemplaza con tu lógica para obtener los géneros
	
			// Renderiza la vista y pasa los géneros como una variable
			res.render('product-create-form.ejs', { Genero: generos });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},

	edit: (req, res) => {
		let id = req.params.id;
		// Aquí también asumo que "products" está definido.
		let product = products.find(product => product.id == id);
		res.render('product-edit-form.ejs', { product });
	},

	// Update - Method to update
	update: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id == id);
		if (product) {
			product.name = req.body.name || product.name;
			product.price = req.body.price || product.price;
			product.description = req.body.description || product.description;
			product.category = req.body.category || product.category;
			product.image = req.body.image || product.image;
			product.discount = req.body.discount || product.discount;

			// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
			// No se debe escribir directamente en el archivo en el caso de una base de datos.
			// Este código se debe adaptar según cómo manejes la actualización en tu base de datos.
			res.redirect('/');
		}
	},

	// Create -  Method to store
	store: async (req, res) => {
		try {
			console.log("Entró al controlador de store");
			console.log("req.body:", req.body);
			const requiredFields = ['nombreProd', 'descripcion', 'precio', 'generos_idGenero', 'autor' , 'descuento' ];
			const missingFields = requiredFields.filter(field => !(field in req.body));
		  
			if (missingFields.length > 0) {
			  return res.status(400).send(`Los campos ${missingFields.join(', ')} son obligatorios.`);
			}
			console.log("req.body:", req.body);
			// Aquí corregí el nombre de la variable de nuevoPRoducto a nuevoProducto
			const nuevoProducto = {
			  id: uuidv4(),
			  ...req.body,
			  image: 'default-image.png'
			};
		  
			// Aquí utilizo el modelo de base de datos (db.Producto) para crear el nuevo producto
			const crearProducto = await db.Producto.create(nuevoProducto);
		  
			res.redirect('/');




			// Resto del código...
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	},

	// Update - Form to edit

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		//
	},
};

module.exports = controller;
