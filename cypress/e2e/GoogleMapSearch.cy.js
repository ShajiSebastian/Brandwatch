const map = require("../e2e/pages/map");

describe('Google map search', () => {
  it('Searching for three locations', () => {
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

      //Selecting mode of travel as car
      cy.get(map.modeOfTravelCar).click()
      cy.get(map.addDestination, { timeout: 8000 }).click()
      cy.get(map.location3).type(testdata.location3).type('{enter}')
      cy.get(map.addDestination, { timeout: 8000 }).click()
      cy.get(map.location4).type(testdata.location4).type('{enter}')

      cy.get(map.googleMap).should('be.visible')
      cy.get(map.routeDetails).should('exist')
      cy.contains('Details').click()
      cy.get('.M3pmwc').should('contain', testdata.location1)
      cy.get('.M3pmwc').should('contain', testdata.location2)
      cy.get('.M3pmwc').should('contain', testdata.location3)
      cy.get('.M3pmwc').should('contain', testdata.location4)
    })

    //Calculating the total time of travel
    cy.get(map.totalTime).invoke('text').then((time) => {
      cy.log('Total time: ' + time)
    })

    //Calculating the total distance of travel
    cy.get(map.totalDistance).invoke('text').then((distance) => {
      cy.log('Total distance: ' + distance)
    })

    //After avoiding motorways
    cy.get('.ysKsp').click()
    cy.get('button.OcYctc.fontTitleSmall.XbJon > span:nth-child(1)').click({ force: true })
    cy.get('div > div.ZWCkxf > div:nth-child(1) > div:nth-child(2) > label').click({ force: true })

    //Calculating the total time avoiding Motorway
    cy.get('.Fk3sm').invoke('text').then((timeAvoidingMotorway) => {
      cy.log('Total time without using motorways: ' + timeAvoidingMotorway)
    })

    //Calculating the total distance avoiding Motorway
    cy.get('.ivN21e > div').invoke('text').then((distanceAvoidingMotorway) => {
      cy.log('Total distance without using motorways: ' + distanceAvoidingMotorway)
    })
  })


  // The below script checks for any broken links in the page. Now it fails as there is a broken link and response code is not 200
  it('Check for broken links', () => {
    cy.visit('/') // url is taking from cypress.config.js
    cy.get('.CxJub').within(() => {
      cy.contains('Accept all').click()
    })
    cy.get("a:not([href*='mailto:]']").each(page => { // working links will get response code as 200
      cy.request(page.prop('href')) //sending API request and verifying response status code in a short way
    })
  })

})