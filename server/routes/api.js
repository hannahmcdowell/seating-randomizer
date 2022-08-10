const express = require('express');
const classController = require('../controllers/classController');
const router = express.Router();

/**
 * if a user login is implememented, 
 * this will need to change to a patch request!
 */
router.post('/class', 
  classController.addClass,
  (req, res) => res.status(200).json(res.locals.userInfo)
);

module.exports = router;
