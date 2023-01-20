describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify invoice documents result should appear within selected date range", function () {
        it("FC-6983 verify invoice documents result <smoke>", function () {
            cy.visit('/invoice_processings');
            cy.wait(7000);
            cy.execute("/script/invoice_processing/invoice_documents_within_selected_date");
        });
    });
});
  