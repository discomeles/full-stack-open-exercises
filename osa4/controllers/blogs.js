const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')

// --- Blogi API ---
// --- Hae kaikki ---
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// --- Lisää blogi ---
blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title) {
    return response.status(400).end()
  } else if (!request.body.url) {
    return response.status(400).end()
  } else {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0
  })
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }}
})

// --- Poista blogi id:n perusteella ---
blogRouter.delete('/:id', async(request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// --- Muokkaa blogia ---
blogRouter.put('/:id', async(request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, 
        blog, 
        { new: true })
    response.status(200).json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter