import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, toggleBlogForm }) => {
  const [blogState, setBlogState] = useState({
    title:'',
    author:'',
    url:''
  })

  const onSubmit = (event) => {
    event.preventDefault()
    addBlog(blogState)
    setBlogState({
      title:'',
      author:'',
      url:''
    })
    toggleBlogForm()
  }

  const handleCancel = (event) => {
    setBlogState({
      title:'',
      author:'',
      url:''
    })
    toggleBlogForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            type="text"
            value={blogState.title}
            name="title"
            id="title"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, title:target.value }))}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogState.author}
            name="author"
            id="author"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, author:target.value }))}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogState.url}
            name="url"
            id="url"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, url:target.value }))}
          />
        </div>

        <button type="submit" id="blog-submit-button">create</button>
        <button type="button" id="blog-cancel-button" onClick={handleCancel}>cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired
}

export default BlogForm