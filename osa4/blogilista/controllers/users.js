const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const blog = require('../models/blog')

userRouter.post('/', async(request, response) => {
    const { username, name, password, blogs } = request.body

    if(password.length < 3){
        return response.status(400).json({ error: 'password must be at least tre characters long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
        blogs,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async(request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title:1, author:1, id:1 })
    response.json(users)
})

module.exports = userRouter