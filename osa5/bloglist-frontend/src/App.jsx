import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './styles/notification.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const blogFormRef = useRef()

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

  const addBlog = async (blogObject) => {
      try{ 
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
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

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

    return sortedBlogs
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>

        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      
      <br></br>
      {sortBlogs(blogs).map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          user={user} 
          blogs = {blogs} 
          setBlogs={setBlogs} />
      )}
      
    </div>
  )
}

export default App