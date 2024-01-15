import {useState} from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const isUser = blog.user.username === user.username

  const toggleShowAll = () => {
    const value = showAll === true ? false : true
    setShowAll(value)
  }

  const updateLikes = (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(blogObject, blog.id)
  }

  const delBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const buttonText = showAll === false ? "view" : "hide"

  const blogInfo = () => {
  
    return (
    <>
    <br/>
    {blog.url}<br/>
    {blog.likes} <button 
                    type="button"
                    onClick={(e) => updateLikes(blog)}>like</button><br/>
    {blog.user.name}<br/>
    {isUser && <button type="button" onClick={(e) => delBlog(blog)}>remove</button>}
    </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button 
                                    type="button" 
                                    onClick={(e) => toggleShowAll()}>{buttonText}</button>
      {showAll && blogInfo()}
    </div>  
  )

}


export default Blog