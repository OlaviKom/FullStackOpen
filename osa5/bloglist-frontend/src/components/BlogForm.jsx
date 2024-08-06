import { useState } from 'react'
const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor = "title">title</label>
          <input
            id = "title"
            type = "text"
            value = {newTitle}
            name = "title"
            onChange = {({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>

          <label htmlFor = "author">author</label>
          <input
            id = "author"
            type = "text"
            value = {newAuthor}
            name = "author"
            onChange = {({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor = "url">url</label>
          <input
            id = "url"
            type = "text"
            value = {newUrl}
            name = "URL"
            onChange = {({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm