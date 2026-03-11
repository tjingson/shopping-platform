const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(getProducts)
  .post(protect, createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

  router.post("/upload", protect, upload.single("image"), (req, res) => {
  res.json({
    image: `/uploads/products/${req.file.filename}`,
  });
});

module.exports = router;