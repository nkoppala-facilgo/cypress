describe("Session Login", () => {
    var num_no;
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sdeclined_wo_open_QR_and_supplier_closed_the_quote/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SDeclined -WO has an open QR and the supplier closed the Quote", function () {
        it("FC-10821 WO Status is SDeclined -WO has an open QR and the supplier closed the Quote", function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            let due_date = mm + '/' + dd + '/' + (today.getFullYear());
            let service_date = mm + '/' + dd + '/' + (today.getFullYear());
            let quote_expires = mm + '/' + dd + '/' + (today.getFullYear());
            this.data.due_date=due_date
            this.data.service_date=service_date
            this.data.quote_expires=quote_expires
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(5000); 
            cy.execute("/script/work_order/create_qr_nte", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                var data_path = Cypress.env(`data`)
                cy.readFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sdeclined_wo_open_QR_and_supplier_closed_the_quote/data.json`).then((obj) => {
                    obj['num_no'] = wo_number;
                    cy.writeFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sdeclined_wo_open_QR_and_supplier_closed_the_quote/data.json`, obj);
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
                    cy.visit();
                    cy.login_with_session(data.supplier.username, data.supplier.password);
                });
                cy.visit("/work_orders");
                cy.get(".fa-filter").click();
                cy.select_by_label("WO#(s)", num_no, 1500);
                cy.contains("button", "Search").click();
                cy.get(".media").first().click();
                cy.contains("SReviewed").should("exist");
                cy.wait(2000);
                cy.execute("/script/work_order_end_to_end/create_quote_wo", this.data);
                cy.visit("/work_orders/" + num_no);
                cy.get(".fa-filter").click();
                cy.select_by_label("WO#(s)", num_no, 1500);
                cy.contains("button", "Search").click();
                cy.get(".media").first().click();
                cy.contains("QuoteProvided").should("exist");
                cy.get('button[class="btn btn-sm btn-danger"]').click({ force: true });
                cy.contains('Yes, void this Quote!').should('exist'); 
                cy.contains('Yes, void this Quote!').click();
                cy.get('.confirm').click(); 
                cy.contains('SCancelled').should('exist'); 
            });
        });
    });
});
