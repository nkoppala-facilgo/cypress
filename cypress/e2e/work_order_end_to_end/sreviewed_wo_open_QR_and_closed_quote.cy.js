describe("Session Login", () => {
    var num_no;
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username, data.pmc.password);
            });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sreviewed_wo_open_QR_and_closed_quote/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SReviewed -WO has an open QR and closed Quote", function () {
        it("FC-11287 Verify WO Status is SReviewed -WO has an open QR and closed Quote", function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(3000); 
            cy.execute("/script/work_order/create_qr_nte", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                cy.visit("/work_orders/" + wo_number);
                num_no = wo_number;
                cy.wait(3000);
                cy.contains("SentToSupplier").should("exist");
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.contains("Logout").click({force: true});
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.visit();
                    cy.login_with_session(data.supplier.username, data.supplier.password);
                });
                cy.visit("/work_orders/" + num_no);
                cy.get(".media").first().click();
                cy.contains("SReviewed").should("exist");
                cy.reload();
                cy.wait(2000);
                cy.execute("/script/work_order_end_to_end/create_quote_wo", this.data);
                cy.visit("/work_orders/" + num_no);
                cy.get(".media").first().click();
                cy.contains("QuoteProvided").should("exist").wait(2000);
                cy.get('button[class="btn btn-sm btn-danger"]').click({ force: true });
                cy.contains('Yes, void this Quote!').should('exist'); 
                cy.contains('Yes, void this Quote!').click();
                cy.get('.confirm').click(); 
                cy.contains('SCancelled').should('exist'); 
                cy.reload();
                cy.contains('SReviewed').should('exist');
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.contains("Logout").click({force: true});
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.visit();
                    cy.execute('script/login/login', data.pmc)
                }); 
                cy.visit("/work_orders/" + num_no);
                cy.get(".media").first().click();
                cy.contains("SReviewed").should("exist");
            });
        });
    });
});
