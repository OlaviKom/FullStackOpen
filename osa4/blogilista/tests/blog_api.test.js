const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { request } = require('node:http')


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

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('id is written right', async() => {
    const response = await api.get('/api/blogs')

    const blogs = response.body.forEach(blog => {
        const valueNames = Object.keys(blog)
        assert.strictEqual(valueNames.includes('id'), true)
        // assert.strictEqual(blog._id, undefined)
    })   
})

test('blog can be added', async() => {
    const newBlog = {
        title: 'Unelmieni testaus',
        author: 'Saara Testimaa',
        url: 'dreamtester.fi',
        likes: '300' ,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    console.log(titles)

    assert.strictEqual(response.body.length, initialBlogs.length +1)
    assert(titles.includes('Unelmieni testaus'))
})

test('blog likes are at least 0', async() => {
    const newBlog = {
        title: 'Testailun ihanuus',
        author: 'Sami Testimaa',
        url: 'lovelytester.fi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    response.body.forEach(blog => {
        console.log(blog.likes)
        assert.strictEqual(blog.likes >= 0, true)
    })
})

test('blog without title or url is not added', async() => {
    const newBlog = {
        //title: 'Testailua ja kaljaa',
        author: 'Kari Näkäräinen',
        //url: 'dreamtester.fi',
        likes: '300' ,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
    
})

describe('deletion of a blog', () => {
    test('blog deleted successfully', async() =>{
        const blogsInDb = await Blog.find({})
        const blogs = blogsInDb.map(blog => blog.toJSON())
        const blogToDelete = blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length -1)

        assert(!response.body.includes(blogToDelete))
    })
})

describe('updating of a blog', () => {
    test('blog update successfully', async() =>{
        const blogsInDb = await Blog.find({})
        const blogs = blogsInDb.map(blog => blog.toJSON())
        const initialBlog = blogs[1]


        const blogToUpdate = {
            title: initialBlog.title,
            author: initialBlog.author,
            url: initialBlog.url,
            likes: 120
        }

        await api
            .put(`/api/blogs/${initialBlog.id}`)
            .send(blogToUpdate)
            .expect(200)
        
        const response = await api.get(`/api/blogs/${initialBlog.id}`)

        assert.notDeepStrictEqual(response.body, initialBlog)
    })
}) 

after(async () => {
    await mongoose.connection.close()
})