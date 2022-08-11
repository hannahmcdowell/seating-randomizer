const express = require('express');
const classController = require('../controllers/classController');
const router = express.Router();

router.post('/signup',
  classController.createUser,
  (req, res) => res.status(200).json(res.locals.user)
);

router.post('/login', 
  classController.verifyUser,
  (req, res) => res.status(200).json(res.locals.user)
);

router.patch('/class', 
  classController.addClass,
  (req, res) => res.status(200).json(res.locals.updatedUserInfo)
);

router.get('/class', 
  classController.classes,
  (req, res) => res.status(200).json(res.locals.classInfo)
);

module.exports = router;
