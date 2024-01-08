const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// const getToken = request => {
//   const authorization = request.headers.authorization
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

// --- Blogi API ---
// --- Hae kaikki ---
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

// --- Lisää blogi ---
blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title) {
    return response.status(400).end()
  } 
  if (!request.body.url) {
    return response.status(400).end()
  }
  // console.log(request.token)
  const decodedToken = jwt.verify(request.token, config.jwtsecret)
  // console.log(decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  
})

// --- Poista blogi id:n perusteella ---
blogRouter.delete('/:id', async(request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.jwtsecret)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'wrong user' })
  }


})

// --- Muokkaa blogia ---
blogRouter.put('/:id', async(request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, 
        blog, 
        { new: true })
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter