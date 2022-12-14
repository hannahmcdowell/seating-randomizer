const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const classController = {};

// helper function to create classController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err, status } = errInfo;
  return {
    log: `classController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in classController.${method}. Check server logs for details.`}, 
    status
  };
};

// middleware to add a new class to a user's entry in the database
classController.addClass = (req, res, next) => {
  const { username, period, roster } = req.body;
  // if missing period or roster from req.body, throw error
  if (!username || !period || !roster) {
    return next(createErr({
      method: 'addClass',
      type: 'missing class information on req.body',
      err: 'incorrect info on req.body',
      status: 400
    }));
  }
  // convert the roster to an array of strings
  const rosterArray = roster.split(', ');
  // define a new user with class object to store in db
  // define a new class object to store in db
  const newClass = { 
    period,
    roster: rosterArray
  };
  // update to user
  const update = {
    $push: {
      periods: period,
      classes: newClass
    }
  }
  // find the user, update and return updated document
  User.findOneAndUpdate({ username }, update, { new: true })
    .then(data => {
      res.locals.updatedUserInfo = data;
      return next();
    })
    .catch(err => 
      next(createErr({
        method: 'addClass',
        type: 'saving to database',
        err,
        status: 500
      }))
    );
};

classController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  // if missing period or roster from req.body, throw error
  if (!username || !password) {
    return next(createErr({
      method: 'createUser',
      type: 'missing user information on req.body',
      err: 'incorrect info on req.body',
      status: 400
    }));
  }
  // define a new user to store in db
  const user = { 
    username,
    password
  };
  
  User.create(user)
    .then(data => {
      res.locals.user = data;
      return next();
    })
    .catch(err => 
      next(createErr({
        method: 'createUser',
        type: 'saving to database',
        err,
        status: 500
      }))
    );
}

classController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  // if missing period or roster from req.body, throw error
  if (!username) {
    return next(createErr({
      method: 'verifyUser',
      type: 'missing username or password on req.body',
      err: 'incorrect info on req.body',
      status: 400
    }));
  }
  // attempt to find the user with the given username
  User.findOne({username}).exec()
    .then(data => {
      if (data === null) {
        res.locals.user = {error: 'Username and/or password not found.'};
        return next();
      }
      // compare input password with the encrypted password
      bcrypt.compare(password, data.password)
        .then((bool) => {
          if (bool) {
            res.locals.user = data;
          } else {
            res.locals.user = {error: 'Username and/or password not found.'};
          }
          return next();
        })
        .catch((err) => 
          next(createErr({
            method: 'verifyUser',
            type: 'bcrypt compare method error',
            err
          }))
        );
    })
    .catch((err) => 
      next(createErr({
        method: 'verifyUser',
        type: 'findOne method error',
        err
      }))
    );
}

classController.classes = (req, res, next) => {
  const requestedUser = req.query;
  // if missing requestedUser from req.query, throw error
  if (!requestedUser) {
    return next(createErr({
      method: 'classes',
      type: 'missing username information on req.query',
      err: 'incorrect info on req.query',
      status: 400
    }));
  }

  User.findOne(requestedUser).exec()
    .then(data => {
      if (data === null) {
        return next(createErr({
          method: 'classes',
          type: 'username doesn\'t exist in database',
          err: 'no user exists',
          status: 400
        }));
      }
      res.locals.classInfo = data;
      return next();
    })
    .catch(err => 
      next(createErr({
        method: 'classes',
        type: 'retrieving from database',
        err,
        status: 500
      }))
    );
}

module.exports = classController;