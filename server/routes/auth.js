const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middlewares/auth");

const authRouter = express.Router()

authRouter.post('/api/signup', async (req, res) => {
    try {
        const {name, email, password} = req.body

        const existingUser = await User.findOne({email: email})
        if (existingUser) {
            return res.status(400).json({msg: "User email already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        let user = new User({email, password: hashedPassword, name})
        user = await user.save()
        res.status(200).json({user: user})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

authRouter.post('/api/signin', async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: "User with this email does not exists!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({msg: "incorrect password!"})
        }

        const token = jwt.sign({id: user._id}, "passwordKey")
        res.status(200).json({token, ...user._doc})

    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.body.header('s-auth-token')
        if (!token) return res.json(false)

        const verified = jwt.verify(token, 'passwordkey')
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        res.status(200).json(true)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({...user._doc, token: req.token})


})


module.exports = authRouter


























