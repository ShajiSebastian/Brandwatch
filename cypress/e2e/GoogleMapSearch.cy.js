const map = require("../e2e/pages/map");
const commands = require("../support/commands");

describe('Google map search', () => {
  it('Searching for Three locations', () => {
    cy.googleMapSearch()
    //Selecting mode of travel as car
    cy.get(map.modeOfTravelCar).click()
    cy.fixture('locations').then(function (testdata) {
      // adding more destinations
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
  })

  it('Getting Distance required to travel between Manchester and Birmingham', () => {
    cy.googleMapSearch()
    //Selecting mode of travel as car
    cy.get(map.modeOfTravelCar).click()
    cy.get(map.totalDistance).invoke('text').then((distance) => {
      cy.log('Total distance: ' + distance)
    })
  })

  it('Getting Time required to travel between Manchester and Birmingham', () => {
    cy.googleMapSearch()
    //Selecting mode of travel as car
    cy.get(map.modeOfTravelCar).click()
    cy.get(map.totalTime).invoke('text').then((time) => {
      cy.log('Total time: ' + time)
    })
  })

  it('Getting distance and Time required to travel between Manchester and Birmingham by avoiding Motorways', () => {
    cy.googleMapSearch()
    //Selecting mode of travel as car
    cy.get(map.modeOfTravelCar).click()
    cy.get('button.OcYctc.fontTitleSmall.XbJon > span:nth-child(1)').click({ force: true })
    cy.get('div > div.ZWCkxf > div:nth-child(1) > div:nth-child(2) > label').click({ force: true })

    //Calculating the total time avoiding Motorway
    cy.get('.Fk3sm').eq(0).invoke('text').then((timeAvoidingMotorway) => {
      cy.log('Total time without using motorways: ' + timeAvoidingMotorway)
    })

    //Calculating the total distance avoiding Motorway
    cy.get('.ivN21e > div').eq(0).invoke('text').then((distanceAvoidingMotorway) => {
      cy.log('Total distance without using motorways: ' + distanceAvoidingMotorway)
    })
  })
})
