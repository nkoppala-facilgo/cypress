describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });
    describe("To verify Do not include overlay asset group setting is appeared on company setting page", function () {
        it("FC-9033 Do not include overlay asset group setting is appeared on company setting page <regression>", function () {
            cy.visit();
            cy.waitUntil(()=>cy.get("span[class=caret]").first().click({force: true}));
            cy.contains("Account Settings").click({force: true});
            cy.waitUntil(()=>cy.contains("Company Settings").click({force: true}));
            cy.contains("Do not include overlay asset group").should("be.exist");
        });
    });
});
