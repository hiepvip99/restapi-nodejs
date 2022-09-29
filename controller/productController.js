const {Product} = require("../model/model");

const productController = {
    addProduct: async  (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
           res.status(200).json("Add Success \n"+ saveProduct);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({$set: req.body});
            res.status(200).json("Update Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};

module.exports = productController;