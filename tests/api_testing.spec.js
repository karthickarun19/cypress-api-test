require('dotenv').config()

const fixtureFileName = 'api_testing_data.json'

/// <reference types="cypress" />
// @ts-check
context('Location information', () => {
    let casablancaId
    let expectedTitle 
    let urlToTest

    // variable initialization before starting tests
    before(() => {
        cy.fixture(fixtureFileName).then((data) => {
            expectedTitle = data.expectedTitle
            casablancaId = data.cityId
        })
        urlToTest = Cypress.config('baseUrl')
    })

    // negative test: test with non existent ID
    it('Search with non-existent ID', () => {
        cy.request({
            method: 'GET',
            url: urlToTest + '0000',
            failOnStatusCode: false
        }).its('status')
            .should('equal', 404)
    })

    // negative test: test with invalid ID
    it('Search with invalid ID', () => {
        cy.request({
            method: 'GET',
            url: urlToTest + 'toto',
            failOnStatusCode: false
        }).its('status')
            .should('equal', 404)
    })

    /*
     * test with valid ID(casablanca)
     * perform assertions on returned response
    */
    it('Search with Valid ID: Casablanca', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + casablancaId,
            failOnStatusCode: false           
        }).then(({body}) => {
            expect(body.consolidated_weather.length).to.equal(6, '6 days worth of data should be returned')
            expect(body.title).to.equal(expectedTitle, 'title should match')
            expect(body.woeid).to.equal(casablancaId, 'woeid should match')
        })
    })

  
    it('Search with Valid ID: Chennai', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + '2295424',
            failOnStatusCode: false           
        }).then(({body}) => {
            expect(body.consolidated_weather.length).to.equal(6, '6 days worth of data should be returned')
            expect(body.title).to.equal(body.title, process.env.chennaiexpectedTitle)
            expect(body.woeid).to.equal(body.woeid, process.env.chennaicityId)
        })
    })
})