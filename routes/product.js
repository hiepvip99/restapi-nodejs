const productController = require("../controller/productController");
const router = require("express").Router();
const multer = require('multer');
const { Product } = require("../model/model");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() +":"+ file.originalname);
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.post("/addProductImage", upload.single('images'), async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name,
      images: [req.file.filename]
    });
    await product.save();
    res.status(200).json("Add Success");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/addImage", upload.single('images'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.id);
    await product.updateOne({ $push: { images: req.file.filename } })
    // await product.save();
    res.status(200).json("Add Image Success");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/deleteImage", async (req, res) => {
  try {
    await fs.unlink("./uploads/"+req.body.images, () => {});
    await Product.updateMany({images: req.body.images},{ $pull: { images: req.body.images } });
    res.status(200).json("Delete Image Success");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/add", productController.addProduct);

//Get all orders
router.get("/get", productController.getAllProduct);

//Get order
router.get("/get/:id", productController.getProduct);

//Update Order
router.put("/update/:id", productController.updateProduct);

//Delete Order
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;