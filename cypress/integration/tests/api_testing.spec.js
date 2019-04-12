const casablancaId = 1532755
const expectedTitle = 'Casablanca'

context('Location information', () => {
    const urlToTest = Cypress.config('baseUrl')

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
})