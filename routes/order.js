const orderController = require("../controller/orderController");

const router = require("express").Router();

//Add order
router.post("/add", orderController.addOrder);

//Get all orders
router.get("/get", orderController.getAllOrder);

//Get order
router.get("/get/:id", orderController.getOrder);

//Update Order
router.put("/update/:id", orderController.updateOrder);

//Delete Order
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;