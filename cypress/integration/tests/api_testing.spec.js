context('Location information', () => {
    it('Search with invalid ID', () => {
        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + '0000',
            failOnStatusCode: false
        }).its('status')
            .should('equal', 404)
    })
})