const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method to encrypt the password
userSchema.statics.signup = async function(email, password){

    if (!email || !password){
        throw Error('All fields must be filled.')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid.')
    }
    // TO DO: Show the password requirements 
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong.')
    }

    const exists = await this.findOne({ email })

    if (exists){
        throw Error('Email already registered. Please log in.')
    }

    // bcrypt adds a salt to your password for added security, salt for identical passwords will be different, thus the hashes will be different 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user 
}

// static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password){
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect email.')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password.')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)