const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

let authToken = ""

async function loginUser() {
  const loginResponse = await api.post('/api/login')
    .send({ username: 'supertestuser', password: 'testi' })
  // console.log(loginResponse.body.token)
  authToken = loginResponse.body.token
}

loginUser();

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blogs have id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('authorized user can add a valid blog', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set({Authorization: `Bearer ${authToken}`})
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Canonical string reduction'
  )

})

test('unauthorized user gets status 401', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('if likes is not given, set the value to 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }

  await api
    .post('/api/blogs')
    .set({Authorization: `Bearer ${authToken}`})
    .send(newBlog)

    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)

    expect(likes[likes.length - 1]).toBe(0)
})

test('new blog without title gets a bad request statuscode', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api
  .post('/api/blogs')
  .set({Authorization: `Bearer ${authToken}`})
  .send(newBlog)
  .expect(400)

})

test('new blog without url gets a bad request statuscode', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2
  }

  await api
  .post('/api/blogs')
  .set({Authorization: `Bearer ${authToken}`})
  .send(newBlog)
  .expect(400)

})

test('remove blog by id', async () => {
  const blogs = await Blog.find({})
  const blogId = blogs[0]._id
  await api.delete(`/api/blogs/${blogId}`)
  .expect(204)
})

test('update likes', async () => {
  const blogs = await Blog.find({})
  console.log('found')
  const blogId = blogs[0]._id
  const dataToUpdate = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 9
  }
  
  await api
    .put(`/api/blogs/${blogId}`)
    .send(dataToUpdate)
    .expect(200)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(r => r.likes)
  expect(likes[0]).toBe(9)
})

afterAll(async () => {
  await mongoose.connection.close()
})