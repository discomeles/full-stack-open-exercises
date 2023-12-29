const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

// apufunktio
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

describe('one initial user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testi', 10)
    const user = new User({ username: 'supertestuser', passwordHash})
    await user.save()
  })

  test('user creation succeeds with a new username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'tuwix',
      name: 'Tuvix Neelok',
      password: 'janeway'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails if username is less than 3 characters', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'tu',
      name: 'Tuvix Neelok',
      password: 'janeway'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails if password is less than 3 characters', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'tuvix',
      name: 'Tuvix Neelok',
      password: 'ja'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails with proper status code and message if user already exists', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'supertestuser',
      name: 'Super Tester',
      password: 'testi'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})