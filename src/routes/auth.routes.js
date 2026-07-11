const express = require('express');
const { register } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerSchema } = require('../validations/auth.validation');

const router = express.Router();
const protect = require('../middlewares/auth.middleware');
router.get('/me', protect, (req, res) => res.json({ success: true, user: req.user }));
router.post('/register', validate(registerSchema), register);

module.exports = router;