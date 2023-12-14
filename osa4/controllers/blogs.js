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
blogRouter.post('/', (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: 0
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter