const service = require("./product.service");

exports.addProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            imageUrl: req.file ? req.file.path : undefined,
            publicId: req.file ? req.file.filename : undefined
        };
        const product = await service.addProduct(productData, req.user.id);
        res.status(201).json({ message: "Product added successfully", product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await service.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getAdminProducts = async (req, res) => {
    try {
        const products = await service.getAdminProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            imageUrl: req.file ? req.file.path : undefined,
            publicId: req.file ? req.file.filename : undefined
        };
        const product = await service.updateProduct(req.params.id, productData, req.user.id);
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.updateProductStatus = async (req, res) => {
    try {
        const product = await service.updateProductStatus(req.params.id, req.body.status);
        res.status(200).json({ message: `Product ${req.body.status.toLowerCase()} successfully`, product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await service.deleteProduct(req.params.id, req.user.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await service.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}