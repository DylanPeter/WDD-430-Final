const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/me', (req, res) => {
    // TEMPORARY — hardcoded until auth is set up
    res.json({
      _id: '687d7b4c652ec6d41b3aa751',
      name: 'Dylan Petersen',
      email: 'dylan@example.com'
    });
  });
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;