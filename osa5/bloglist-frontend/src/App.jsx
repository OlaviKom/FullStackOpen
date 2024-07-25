import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './styles/notification.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

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
    try{
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
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType('succeed')
      setTimeout(() => {
        setMessage('null')
        setMessageType('null')
      },5000)
    } catch(exception) {
      setMessage('adding a blog failed')
      setMessageType('error')
      setTimeout(() =>{
        setMessage('null')
        setMessageType('null')
      }, 5000)
    }  
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
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage('null')
        setMessageType('null')
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
        <Notification
          message = {message}
          type = {messageType} 
        />
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
      <Notification
         message={message}
         type={messageType}     
      />
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