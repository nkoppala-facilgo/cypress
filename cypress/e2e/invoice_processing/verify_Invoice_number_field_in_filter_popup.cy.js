describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify 'Invoice Number' field is appeared on filter pop up on 'Invoice image document' page", function () {
        it("FC-6893 Verify Invoice Number Field in Filter Popup Page <smoke>", function () {
            cy.visit('/invoice_processings');
            cy.wait(7000);
            cy.get('#js-react-InvoiceProcessingIndexButtons').contains('span','Filter').click({force: true});
            cy.wait(1000);
            cy.contains('Invoice Number:').should('exist');
        });
    });
});
  