describe('Blog app', function() {
  beforeEach(function() {
    cy.resetdb()
    cy.adduser({ name: 'Test User', username:'testuser', password:'testword' })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password:'testword' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('cypress blog')
      cy.get('#author').type('Cypress Author')
      cy.get('#url').type('cypress.test.url')
      cy.get('#blog-submit-button').click()
      cy.contains('cypress blog')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'Fakeblog Title',
          author: 'Fake Testauthor',
          url: 'fake.tests.org'
        })
      })

      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('user who created it can remove it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
      })
    })
  })
  describe('When another user has added a blog', function() {
    beforeEach(function() {
      cy.adduser({ name: 'Other User', username:'otheruser', password:'otherword' })
      cy.login({ username: 'otheruser', password:'otherword' })
      cy.addBlog({
        title: 'Other Fakeblog Title',
        author: 'Otherfake Testauthor',
        url: 'otherfake.tests.org'
      })
      cy.contains('logout').click()
      cy.login({ username: 'testuser', password:'testword' })
    })

    it('only user who added it can see the remove button', function() {
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })
  })
  describe('When multiple blogs are added', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password:'testword' })
      cy.addBlog({
        title: 'First Blog',
        author: 'First Author',
        url: 'first.url.org'
      })
      cy.addBlog({
        title: 'Second Blog',
        author: 'Second Author',
        url: 'second.url.org'
      })
      cy.addBlog({
        title: 'Third Blog',
        author: 'Third Author',
        url: 'third.url.org'
      })
    })

    it.only('blog that gets most likes comes first', function() {
      cy.contains('Third Blog')
        .contains('view')
        .click()

      cy.contains('like').click()

      cy.contains('hide').click()

      cy.contains('First Blog')
        .contains('view')
        .click()

      cy.contains('like').click()

      cy.contains('hide').click()

      cy.contains('Third Blog')
        .contains('view')
        .click()

      cy.contains('like').click()

      cy.contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'Third Blog')
      cy.get('.blog').eq(1).should('contain', 'First Blog')
    })
  })
})