import { useState } from "react";

const BlogForm = ({addBlog}) => {
  const [blogState, setBlogState] = useState({
    title:'',
    author:'',
    url:''
  })

  const onSubmit = (event) => {
    event.preventDefault();
    addBlog(blogState)
    setBlogState({
      title:'',
      author:'',
      url:''
    })
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
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, title:target.value}))}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={blogState.author}
            name="author"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, author:target.value}))}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={blogState.url}
            name="url"
            onChange={({ target }) => setBlogState(prevState => ({ ...prevState, url:target.value}))}
          />
        </div>

        <button type="submit">create</button>
      </form>
      </div>
    )
}

export default BlogForm