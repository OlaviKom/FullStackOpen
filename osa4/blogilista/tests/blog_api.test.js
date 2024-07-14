const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: 'testaillaan',
        author: 'Simo Testaus',
        url: 'testaillaan.fi',
        likes: '10'
    },
    {
        title: 'testauksen abc',
        author: 'Taina Testaaja',
        url: 'testabc.fi',
        likes: '20' 
    },
    {
        title: 'Testiä ja ruokaa',
        author: 'Kaarina Testailija',
        url: 'myfavoritetest.fi',
        likes: '50' 
    }

]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('blogs are retuned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async() => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
})

after(async () => {
    await mongoose.connection.close()
})