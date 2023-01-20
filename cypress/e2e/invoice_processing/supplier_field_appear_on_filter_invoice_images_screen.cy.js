describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify Supplier field is appear on filter modal of Invoice images screen", function () {
        it("FC-8638 Total amount field is appeared on filter pop up on Invoice Image page <regression>", function () {
            cy.visit();
            cy.contains("a", "Invoice Processing").click({force:true});
            cy.contains("a","Invoice Images").click({force:true});
            cy.get(".fa-filter").click({multiple:true});
            cy.contains("Supplier:").should("exist");
        });
    });
});
