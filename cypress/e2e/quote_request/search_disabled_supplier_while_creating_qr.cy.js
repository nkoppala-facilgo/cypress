describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/quote_request/search_disabled_supplier_while_creating_qr/data`).then(function (data) {
            this.data = data;
        });
    });

    describe("To verify user is able to search disabled registered/non- registered supplier while creating QR from from left nav ", function () {
        it("Fc-9040 user is able to search disabled registered/non- registered supplier while creating QR <regression>", function () {
            cy.visit();
            cy.wait(3000);
            cy.execute("/script/quote_request/search_disabled_supplier_while_creating_qr", this.data);
        });
    });
});
