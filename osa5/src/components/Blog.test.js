import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
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

  const element = screen.findByText('Go To Statement Considered Harmful')

})