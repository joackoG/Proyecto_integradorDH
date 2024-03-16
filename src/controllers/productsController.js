const path = require('path');
<<<<<<< HEAD
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

			res.render('productDetail.ejs', { productos, Genero: generos });
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}

	},
=======
const db = require('../database/models'); 
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const product=db.product;
const category=db.categoria;
const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products.ejs', { product: product })
	},detail: (req, res) => {
		let id = req.params.id //guardamos el id que viene por params
		let product = products.find(product => product.id == id) //buscamos el producto
        db.product.findByPk(req.params.id,
            {
  
            })
            .then(movie => {
                res.render('productDetail.ejs', {product });
            })
			
    },

	// Detail - Detail from one product
	/*detail: (req, res) => {
		let id = req.params.id //guardamos el id que viene por params
		let product = products.find(product => product.id == id) //buscamos el producto
		if (product) { //preguntamos si existe
			return res.render('productDetail.ejs', { product })
		}
		return res.send('El producto que buscas no existe') //sino devuelvo un mensaje
	},*/
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e

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
		try {
			const id = req.params.id;
			const producto = await db.Producto.findByPk(id);
			const generos = await db.Genero.findAll();


			if (generos && producto) {

				res.render('./product-edit-form.ejs', { producto, Genero: generos });

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

				if (producto.image && producto.image !== 'default-image.png') {
					const oldImagePath = path.join(uploadDir, producto.image);

					// Verifica si la imagen existe antes de intentar eliminarla
					if (fs.existsSync(oldImagePath)) {
						fs.unlinkSync(oldImagePath);
					} else {
						console.warn(`La imagen ${producto.image} no existe en el sistema de archivos.`);
					}
				}

				producto.image = req.file.filename;

				// Actualizar otros campos
				producto.nombreProd = req.body.nombreProd || producto.nombreProd;
				producto.autor = req.body.autor || producto.autor;
				producto.generos_idGenero = req.body.generos_idGenero || producto.generos_idGenero;
				producto.descripcion = req.body.descripcion || producto.descripcion;
				producto.precio = req.body.precio || producto.precio;
				producto.descuento = req.body.descuento || producto.descuento;
				producto.stock = req.body.stock || producto.stock;

				// Guardar en la base de datos
				await producto.save();

				// Responder con éxito
				return res.status(200).send('Producto editado exitosamente');
			} else {
				return res.status(404).send('Producto no encontrado');
			}
		} catch (error) {
			console.error(error);
			return res.status(500).send('Error interno del servidor');
		}

	},


	// Create -  Method to store
	store: async (req, res) => {
		try {
			const generos = await db.Genero.findAll();

			const requiredFields = ['nombreProd', 'descripcion', 'precio', 'generos_idGenero', 'autor', 'descuento'];
			const missingFields = requiredFields.filter(field => !(field in req.body));

			if (missingFields.length > 0) {
				return res.status(400).send(`Los campos ${missingFields.join(', ')} son obligatorios.`);
			}


<<<<<<< HEAD
			const nuevoProducto = {
				...req.body,
				image: req.file?.filename || 'default-image.png'
			};


			const crearProducto = await db.Producto.create(nuevoProducto);

			const productos = await db.Producto.findAll();
			const successMessage = 'El producto se ha creado exitosamente.';

			res.render('index', { generos: generos, productos: productos, successMessage: successMessage });

		} catch (error) {
			console.error(error);
			res.status(500).send(error);
=======
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
			return res.render('productDetail.ejs', { product })
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e
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
				// Obtener la lista actualizada de productos después de la eliminación
				const productos = await db.Producto.findAll();
				const successMessage = 'El producto se ha eliminado exitosamente.';
				
				// Pasar la lista de géneros al renderizar la vista
				res.render('index', { generos: generos, productos: productos, successMessage: successMessage });
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
			res.render('productSearch.ejs', { encontrados: encontrados, productos, generos, query });

		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

};

module.exports = controller;
<<<<<<< HEAD
=======
/*..........................
const { log } = require('console');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = controller;


/* update: (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex(product => product.id == id);

    if (productIndex !== -1) {
        // Crear un nuevo objeto product utilizando el spread operator
        const updatedProduct = {
            ...products[productIndex],
            ...req.body
        };

        // Actualizar el objeto en el array
        products[productIndex] = updatedProduct;

        // Guardar en el archivo o realizar otras acciones necesarias
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        // Redireccionar o enviar respuesta según sea necesario
        res.redirect('/products');
    }
} */
>>>>>>> eb3abd9340e676eea8aaefe5a53409b155d8837e
