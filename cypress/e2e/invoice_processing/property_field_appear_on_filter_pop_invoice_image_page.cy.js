describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify Property field is appeared on filter pop at Invoice Images page", function () {
        it("FC-8640 Property field is appeared on filter pop at Invoice Images page <regression>", function () {
            cy.visit();
            cy.contains("a", "Invoice Processing").click({force: true});
            cy.contains("a", "Invoice Images").click({force: true});
            cy.get(".fa-filter").click({multiple: true});
            cy.contains("Property:").should("exist");
        });
    });
});
