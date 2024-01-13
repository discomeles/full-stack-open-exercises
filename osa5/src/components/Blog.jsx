import {useState} from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    const value = showAll === true ? false : true
    setShowAll(value)
  }

  const buttonText = showAll === false ? "view" : "hide"

  const blogInfo = () => (
    <>
    <br/>
    {blog.url}<br/>
    {blog.likes} <button type="button">like</button><br/>
    {blog.user.name}<br/>
    </>
  )

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