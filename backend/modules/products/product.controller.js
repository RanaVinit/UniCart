const service = require("./product.service");

exports.addProduct = async (req, res) => {
    try {
        const product = await service.addProduct(req.body, req.user.id);
        res.status(201).json("Product added successfully");
    } catch (err) {
        res.status(400).json( {error: err.message} );
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json( {error: err.message } );
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await service.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json( {error: err.message } );
    }
}