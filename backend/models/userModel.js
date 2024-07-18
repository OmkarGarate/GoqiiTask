const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    dob: {
        type: String, 
        required: true
    }
})

UserSchema.statics.signup = async function(name, email, password, dob){
    // const {name, email, password, dob} = req.body 

    if(!name || !email || !password || !dob)
    {
        throw Error("Please fill all the details")
    }

    if(!validator.isEmail(email))
    {
        throw Error("Please enter valid email")
    }

    if(!validator.isStrongPassword(password))
    {
        throw Error("Please enter a strong password")
    }

    const exists = await this.findOne({email})
    
        if(exists){
            throw Error("Email already in use")
        }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

        const user = await this.create({
            name: name,
            email: email,
            password: hash,
            dob: dob
        })
    
        return user
}

UserSchema.statics.login = async function(email, password){
    // const {email, password} = req.body

    if(!email || !password)
    {
        throw Error("Please fill all the details")
    }

    const user = await this.findOne({email: email})

    if(!user)
    {
        throw Error("Please enter valid email address")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match)
    {
        throw Error("Wrong password")
    }

    return user;
}

module.exports = mongoose.model('User', UserSchema)