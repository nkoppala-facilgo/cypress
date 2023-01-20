describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify Date field is appeared on Form Filter pop up at Invoice Image Documents page", function () {
        it("FC-9029 Date field is appeared on Form Filter pop up at Invoice Image Documents page <regression>", function () {
            cy.visit();
            cy.waitUntil(()=>cy.contains("a", "Invoice Processing").click({force: true}));
            cy.contains("a", "Invoice Images").click({force: true});
            cy.get(".fa-filter").click({multiple: true});
            cy.contains("Invoice Date Range:").should("exist");
        });
    });
});
