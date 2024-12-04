const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const authMiddleware = require('../middleware/auth');
// Define routes
router.get('/', itemsController.getAllItems);
router.post('/', itemsController.addItem);
router.put('/:id', itemsController.updateItem);
router.patch('/:id', itemsController.partialUpdateItem);
router.delete('/:id', itemsController.deleteItem);




router.post('/', authMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, itemController.updateItem);
router.patch('/:id', authMiddleware, itemController.partialUpdateItem);
router.delete('/:id', authMiddleware, itemController.deleteItem);

module.exports = router;
