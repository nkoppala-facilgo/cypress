describe("Session Login", () => {
    var num_no;
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sdeclined_expired_qr/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SDeclined -WO has an expired QR but no Quote", function () {
        it("FC-11004 WO Status is SDeclined -WO has an expired QR but no Quote", function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(5000); 
            cy.execute("/script/work_order/create_qr_nte", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
                var data_path = Cypress.env(`data`)
                cy.readFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sdeclined_expired_qr/data.json`).then((obj) => {
                    obj['num_no'] = wo_number;
                    cy.writeFile(`cypress/fixtures/data/${data_path}/work_order_end_to_end/sdeclined_expired_qr/data.json`, obj);
                });
                cy.visit("/work_orders/" + wo_number);
                num_no = wo_number;
                cy.wait(3000);
                cy.contains("SentToSupplier").should("exist");
            });
        });
    });
});
