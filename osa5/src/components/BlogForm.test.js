import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog form calls addBlog with right info', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  const userev = userEvent.setup()
  const addBlog = jest.fn()
  const toggleBlogForm = jest.fn()

  const { container } = render(<BlogForm addBlog={addBlog} toggleBlogForm={toggleBlogForm}/>)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = screen.getByText('create')

  await userev.type(titleInput, blog.title)
  await userev.type(authorInput, blog.author)
  await userev.type(urlInput, blog.url)

  await userev.click(createButton)

  expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlog.mock.calls[0][0].url).toBe(blog.url)

})