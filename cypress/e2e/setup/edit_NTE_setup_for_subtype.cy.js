describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
    });

    describe("To verify user is able to edit 'NTE setup' for Subtype ", function () {
        it("FC-9043 user is able to edit 'NTE setup' for Subtype <regression> ", function () {
            cy.visit("");
            cy.wait(7000);
            cy.execute("/script/setup/edit_NTE_setup_for_subtype");
        });
    });
});
