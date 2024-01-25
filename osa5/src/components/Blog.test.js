import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'test',
      name: 'test',
      id: '1'
    },
    id: '65a006c5d43eb7c738934d47'
  }

  const user = {
    username: 'test',
    name: 'test',
    id: '1'
  }

  render(<Blog blog={blog} user={user}/>)

  const element=screen.getByText('Go To Statement Considered Harmful Edsger W. Dijkstra')
  expect(element).toBeDefined()

})

test('clicking the view button shows all blog info', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'test',
      name: 'test',
      id: '1'
    },
    id: '65a006c5d43eb7c738934d47'
  }

  const user = {
    username: 'test',
    name: 'test',
    id: '1'
  }

  render(
    <Blog blog={blog} user={user}/>
  )

  const userev = userEvent.setup()
  const button = screen.getByText('view')
  await userev.click(button)

  const urlElement = screen.getByText('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
  const likeElement = screen.getByText('likes 5')
  const userElement = screen.getByText('test')

  expect(urlElement).toBeDefined()
  expect(likeElement).toBeDefined()
  expect(userElement).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'test',
      name: 'test',
      id: '1'
    },
    id: '65a006c5d43eb7c738934d47'
  }

  const user = {
    username: 'test',
    name: 'test',
    id: '1'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} user={user} />
  )

  const userev = userEvent.setup()
  const button = screen.getByText('view')
  await userev.click(button)

  const likeButton = screen.getByText('like')
  await userev.click(likeButton)
  await userev.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})