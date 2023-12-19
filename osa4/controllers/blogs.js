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

module.exports = blogRouter