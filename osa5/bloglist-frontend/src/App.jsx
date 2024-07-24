import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginform'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user) 
      setUsername('')
      setPassword('')
    } catch(exception) {
      //setErroMessage('wrong credentials')
      setTimeout(() => {
        //setErroMessage('null')
      },5000)
    }
    console.log('loging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  if(user === null){
    return (
      <div>
        <h2>Login in to application</h2>
        <LoginForm
        handleLogin = {handleLogin}
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
         />
      </div>
    ) 
  }
  return (
    <div>
      <h2>blogs</h2>
      <p> {user.name} logged in
      <button onClick = {handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <BlogForm
      addBlog = {addBlog}
      title = {newTitle}
      setNewTitle = {setNewTitle}
      autho = {newAuthor}
      setNewAuthor = {setNewAuthor}
      url = {newUrl}
      setNewUrl = {setNewUrl}
      />
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App