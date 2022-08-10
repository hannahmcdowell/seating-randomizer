const express = require('express');
const classController = require('../controllers/classController');
const router = express.Router();

router.post('/class', 
  classController.addClass,
  (req, res) => res.status(200).json({})
);

module.exports = router;
