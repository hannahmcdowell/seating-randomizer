const User = require('../models/userModel');

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

// middleware to add a new user with a class to the database
// if user login is implemented, need:
// 1) createUser middleware
// 2) addClass (to user) middleware
classController.addClass = (req, res, next) => {
  const { period, roster } = req.body;
  // if missing period or roster from req.body, throw error
  if (!period || !roster) {
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
  const userWithClass = { 
    username: 'Hannah',
    periods: [period],
    classes: [{
      period,
      roster: rosterArray
    }]
  };
  
  User.create(userWithClass)
    .then(data => {
      res.locals.userInfo = data;
      console.log('Data returned from db in addClass middleware', data);
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
      console.log('Data returned from db in classes middleware', data);
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