import {buildUser} from '../support/generate'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    const user = buildUser()
    cy.visit('/')

    cy.findByRole('button', {name: /register/i}).click()
    cy.findByRole('dialog', {name: /registration form/i}).within(() => {
      cy.findByRole('textbox', {name: /username/i}).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /register/i}).click()
    })

    cy.findByRole(/navigation/i).within(() => {
      cy.findByRole('link', {name: /discover/i}).click()
    })

    cy.findByRole(/main/i).within(() => {
      cy.findByRole('searchbox', {name: /search/i}).type('Becoming{enter}')
      cy.findByRole('listitem', {name: /becoming/i}).within(() => {
        cy.findByRole('button', {name: /add to list/i}).click()
      })
    })

    cy.findByRole(/navigation/i).within(() => {
      cy.findByRole('link', {name: /reading list/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('listitem').click()

      cy.findByRole('textbox', {name: /notes/i}).type('This is my note')
      cy.findByLabelText('loading').should('exist')
      cy.findByLabelText('loading').should('not.exist')

      cy.findByRole('button', {name: /mark as read/i}).click()

      cy.findByRole('radio', {name: /5 stars/i}).click({force: true})
    })

    cy.findByRole(/navigation/i).within(() => {
      cy.findAllByRole('link', {name: /finished books/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1)
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      cy.findByRole('listitem').click()

      cy.findByRole('button', {name: /remove from list/i}).click()

      cy.findByRole('textbox', {name: /notes/i}).should('not.exist')
      cy.findByRole('radio', {name: /5 stars/i}).should('not.exist')
    })

    cy.findByRole(/navigation/i).within(() => {
      cy.findAllByRole('link', {name: /finished books/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 0)

      // Interesting how can the first one work and the second one does not?
      cy.findByRole('button', {name: /remove from list/i}).should('not.exist')
      cy.findByRole('button', {name: /remove from list/i}).click()
    })
  })
})
