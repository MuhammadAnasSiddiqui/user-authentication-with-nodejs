const express = require('express');
const router = express.Router();
const { signupController, loginController } = require('../controllers/authControllers');

router.post("/api/signup", signupController);
router.post("/api/login", loginController);

module.exports = router 