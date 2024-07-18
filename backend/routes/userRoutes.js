const { model } = require('mongoose')
const {signup, login, getAllUsers, updateUser, deleteUser, getOneUser} = require('../controllers/userController')
const express = require('express')

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/getAllUsers', getAllUsers)

router.get('/getOneUser/:id', getOneUser)

router.put('/updateUser/:id', updateUser)

router.delete('/deleteUser/:id', deleteUser)

module.exports = router