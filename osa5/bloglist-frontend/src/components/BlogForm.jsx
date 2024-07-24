const BlogForm = (props) => {
    return(
        <div>
            <form onSubmit={props.addBlog}>
                <div>
                    title
                    <input
                    type = "text"
                    value = {props.title}
                    name = "title"
                    onChange = {({ target }) => props.setNewTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                    type = "text"
                    value = {props.author}
                    name = "author"
                    onChange = {({ target }) => props.setNewAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                    type = "text"
                    value = {props.url}
                    name = "URL"
                    onChange = {({ target }) => props.setNewUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>       
            </form>
        </div>
    )
}

export default BlogForm