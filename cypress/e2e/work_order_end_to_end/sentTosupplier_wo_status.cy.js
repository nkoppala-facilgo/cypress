describe("Session Login", () => {
    var num_no;
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SentToSupplier/SReviewed/ QuoteProvided", function () {
        it("FC-10481,FC-10576,FC-10660 WO Status is SentToSupplier/SReviewed/ QuoteProvided", function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(5000); 
            cy.execute("/script/work_order/create_qr_nte", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                var data_path = Cypress.env(`data`)
                cy.readFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data.json`).then((obj) => {
                    obj['num_no'] = wo_number;
                    cy.writeFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data.json`, obj);
                });
                cy.visit("/work_orders/" + wo_number);
                num_no = wo_number;
                cy.wait(3000);
                cy.contains("SentToSupplier").should("exist");
                cy.contains("Copy").should("exist");
                cy.waitUntil(() => true);
                cy.contains("Return Items").should("exist");
                cy.waitUntil(() => true);
                cy.contains("Next Steps").should("exist");
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.contains("Logout").click({force: true});
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.supplier.username, data.supplier.password);
                });
                cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
                cy.contains("SReviewed").should("exist");
                cy.execute("/script/work_order_end_to_end/create_quote_wo", this.data);
                cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
                cy.contains("QuoteProvided").should("exist");
            });
        });
    });
});
