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
  })

})