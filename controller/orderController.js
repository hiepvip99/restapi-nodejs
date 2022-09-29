const {Order} = require("../model/model");

const orderController = {
    addOrder: async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const savedOrder = await newOrder.save();
           res.status(200).json("Add Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getAllOrder: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    updateOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            await order.updateOne({$set: req.body});
            res.status(200).json("Update Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteOrder: async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Success");
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = orderController;