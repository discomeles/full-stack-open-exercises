// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('resetdb', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})

Cypress.Commands.add('adduser', ({ name, username, password }) => {
  const user = {
    name: name,
    username: username,
    password: password
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  cy.visit('')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username: username, password: password
  }).then(response => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('')
  })
})