describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SDeclined", function () {
        it("FC-11003 Verify WO Status is SDeclined", function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(5000); 
            cy.execute("/script/work_order/create_qr_nte", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                var data_path = Cypress.env(`data`)
                cy.visit("/work_orders/" + wo_number);
                cy.wait(3000);
                cy.contains("SentToSupplier").should("exist");
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.contains("Logout").click({force: true});
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.supplier.username, data.supplier.password);
                });
                cy.visit("/work_orders");
                cy.get(".fa-filter").click();
                cy.select_by_label("WO#(s)", wo_number, 1500);
                cy.contains("button", "Search").click();
                cy.get(".media").first().click();
                cy.get(".document-action-buttons").find('.btn-danger').click();
                cy.wait(5000);
                cy.get('.confirm').click();
                cy.wait(3000);
                cy.reload
                cy.contains("SDeclined").should("exist");
                cy.get("span[class=caret]").eq(0).click({force: true});
                cy.contains("Logout").click({force: true});
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.execute('script/login/login', data.pmc)
                });
                cy.visit("/work_orders");
                cy.get(".fa-filter").click();
                cy.select_by_label("WO#(s)", wo_number, 1500);
                cy.contains("button", "Search").click();
                cy.wait(3000);
                cy.get(".media").first().click();
                cy.contains("SDeclined").should("exist");
            });
        });
    });
});

