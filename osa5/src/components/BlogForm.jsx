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
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, title:target.value }))}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogState.author}
            name="author"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, author:target.value }))}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogState.url}
            name="url"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, url:target.value }))}
          />
        </div>

        <button type="submit">create</button>
        <button type="button" onClick={handleCancel}>cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  toggleBlogForm: PropTypes.func.isRequired
}

export default BlogForm