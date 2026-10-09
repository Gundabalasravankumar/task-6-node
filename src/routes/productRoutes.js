const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', roleMiddleware('manager', 'admin'), createProduct);
router.put('/:id', roleMiddleware('manager', 'admin'), updateProduct);
router.delete('/:id', roleMiddleware('admin'), deleteProduct);

module.exports = router;
