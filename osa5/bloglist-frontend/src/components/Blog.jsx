import Togglable from './Togglable'
import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user, blogs, setBlogs, }) => {

  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const addLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes += 1
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => (b.id === blog.id ? returnedBlog : b)))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      try{
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception){
        console.log(exception)
      }
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button style= {{ marginLeft: '5px' }} onClick = {() => setBlogInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button style= {{ marginLeft: '5px' }} onClick = {() => setBlogInfoVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div> likes {blog.likes}
          <button style= {{ marginLeft: '5px' }} onClick={() => addLike(blog)} >like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.name === user.name &&(
          <button onClick = {() => removeBlog(blog)}>delete</button>
        )}
      </div>
    </div>
  )}

export default Blog