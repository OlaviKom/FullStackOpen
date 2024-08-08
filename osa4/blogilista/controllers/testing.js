const router = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/resert', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

module.exports = router