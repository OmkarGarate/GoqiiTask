const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = async (id)=>{
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '30d'})
}

const signup = async(req, res)=>{
    const {name, email, password, dob} = req.body

    try{
        const user = await User.signup(name, email, password, dob)

        const token = await createToken(user._id)

        res.status(200).json({user, token})
    }catch(error){
        res.status(400).json({error: error})
    }
}

const login = async(req, res)=>{
    const {email, password} = req.body 

    try{
        const user = await User.login(email, password)

        const token = await createToken(user._id)

        res.status(200).json({user, token})
    }catch(error){
        res.status(400).json({error: error})
    }
}

const getAllUsers = async(req, res)=>{      
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json({users})
}

const updateUser = async(req, res) =>{
    const {id} = req.params
    const data = req.body

    try{
        const user = await User.findOneAndUpdate({_id: id}, data, {new: true})

        if(!user){
            res.status(404).json("User not found")
        }

        res.status(200).json({user})


    }catch(error){
        res.status(400).json({error: error})
    }
}

const deleteUser = async(req, res)=>{
    const {id} = req.params

    try{
        const user = await User.findOneAndDelete({_id: id})

        if(!user)
        {
            res.status(404).json("User not found")
        }

        res.status(200).json("User deleted successfully")
    }catch(error){
        res.status(400).json({error: error})
    }
}

module.exports = {signup, login, getAllUsers, updateUser, deleteUser}