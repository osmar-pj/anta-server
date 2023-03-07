import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles')
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, lastname, email, password, valid } = req.body
        const newUser = new User({
            name,
            lastname,
            email,
            valid,
            password: await User.encryptPassword(password)
        })

        const role = await Role.findOne({ name: 'user' })
        newUser.roles = [role._id]

        const savedUser = await newUser.save()

        res.status(200).json({ savedUser })
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const updateUserById = async (req, res) => {
    try {
        // actualizat los datos del user by id usando put
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new: true
            }
        )
        res.json(updatedUser)
    } catch (error) {
        
    }
}