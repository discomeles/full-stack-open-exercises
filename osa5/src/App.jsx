import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  },[])

  const toggleBlogForm = () => {
    const value = showBlogForm === true ? false : true
    setShowBlogForm(value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    console.log(blogObject)
    blogService.create(blogObject, user.token)
      .then(returnedBlog => {
        const blogToList = { ...returnedBlog, user: { username:user.username, name: user.name } }
        setBlogs(blogs.concat(blogToList))
        setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
  }

  const updateBlog = async (blogObject,id) => {
    const updatedBlog = await blogService.update(blogObject,id)
    const blogToList = { ...updatedBlog, user: { username:user.username, name: user.name } }
    const modifiedBlogs = blogs.reduce((acc, obj) => {
      if (obj.id === id) {
        acc.push(blogToList)
      } else {
        acc.push(obj)
      }
      return acc
    }, [])
    setBlogs(modifiedBlogs)
  }

  const removeBlog = async (id) => {
    const response = await blogService.remove(id, user.token)
    if (response.status === 204) {
      const remainingBlogs = blogs.filter(element => element.id !== id)
      setBlogs(remainingBlogs)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Error message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notifMessage} />
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>logout</button>
      </p>
      <div>
        {!showBlogForm && <button type="button" onClick={(e) => toggleBlogForm()}>new blog</button>}
        {showBlogForm && <BlogForm
          addBlog={addBlog}
          showBlogForm={showBlogForm}
          toggleBlogForm={toggleBlogForm}/>}
      </div>
      <div>
        {blogs.toSorted((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
        )}
      </div>
    </div>
  )
}

export default App