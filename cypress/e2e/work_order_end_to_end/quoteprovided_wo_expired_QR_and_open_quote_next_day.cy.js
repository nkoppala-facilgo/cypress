describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/quoteprovided_wo_expired_QR_and_open_quote/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is QuoteProvided -WO has an expired QR and open Quote", function () {
        it("FC-11282 Verify WO Status is QuoteProvided -WO has an expired QR and open Quote", function () {
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.get(".fa-filter").click();
            cy.select_by_label("WO#(s)", this.data.num_no, 1500);
            cy.contains("button", "Search").click();
            cy.get(".media").first().click();
            cy.contains("QuoteProvided").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.supplier.username, data.supplier.password);
            });
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.get(".fa-filter").click();
            cy.select_by_label("WO#(s)", this.data.num_no, 1500);
            cy.contains("button", "Search").click();
            cy.get(".media").first().click();
            cy.contains("QuoteProvided").should("exist");
        });
    });
});
