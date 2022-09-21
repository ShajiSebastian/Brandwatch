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

const map = require("../e2e/pages/map");

Cypress.Commands.add('googleMapSearch',(() => { 
    cy.visit('/') // url is taking from cypress.config.js
    cy.get('.CxJub').within(() => {
      cy.contains('Accept all').click() //
    })

    //Verifying the invoked url
    cy.url().should('contain', 'https://www.google.com/maps')

    cy.get('#hArJGc').click()
    cy.fixture('locations').then(function (testdata) {
      cy.get(map.location1, { timeout: 8000 }).type(testdata.location1)
      cy.get(map.location2).type(testdata.location2)

    })
 }))
