const express = require('express');

const { userAuth } = require('../middlewares')

const router = express.Router();

const { userController, bagController, inventoryController } = require('../controllers');

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Bag routes
router.get('/bag/:bookId', userAuth, bagController.getBagById);
router.get('/inventory-all-bags/:inventoryId', userAuth, bagController.allInventoryBags);
router.get('/user-all-bags', userAuth, bagController.allUserBags);
router.post('/bag', userAuth, bagController.createBag);
router.put('/bag', userAuth, bagController.updateBag);
router.delete('/bag/:bagId', userAuth, bagController.deleteBagByID);

// Inventory routes
router.get('/inventories', userAuth, inventoryController.getInventories);
router.get('/inventory/:inventoryId', userAuth, inventoryController.getInventoryById);
router.get('/user-inventories', userAuth, inventoryController.getUserInventories);
router.put('/inventory/:inventoryId', userAuth, inventoryController.updateInventory);

module.exports = router;
