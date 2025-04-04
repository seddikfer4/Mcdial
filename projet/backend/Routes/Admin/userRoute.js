// routes/userRoutes.js
const express = require('express');
const { createUser,getUsers,getUserById,getUsersGroups,updateUser,copyUser,getUserStats} = require('../../Controllers/Admin/User');
//const userController = require('../controllers/Admin/User');

const router = express.Router();
// create user routes


router.post('/create-users',createUser );

router.get( '/users-group', getUsersGroups);

// get all users routes
router.get('/allUsers', getUsers);
// get user by id routes
router.get('/getUserById/:userId', getUserById);

router.put('/users/:userId', updateUser);

//copy user route
router.post("/copyUser",copyUser)

// get user stats routes

router.post('/userStats', getUserStats);
module.exports = router;