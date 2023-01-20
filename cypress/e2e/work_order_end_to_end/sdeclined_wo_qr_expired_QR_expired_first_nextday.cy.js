describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
           cy.execute('script/login/login', data.supplier)
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sdeclined_wo_qr_expired_QR_expired_first/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SDeclined -WO has an expired QR and a closed Quote, if the QR expired first", function () {
        it("FC-11005 Verify WO Status is SDeclined -WO has an expired QR and a closed Quote, if the QR expired first", function () {
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.contains("SDeclined").should("exist");
            cy.get('button[class="btn btn-sm btn-danger"]').click({ force: true });
            cy.contains('button', 'Yes').click();
            cy.wait(2000)
            cy.get('.confirm').contains('button','OK').click()   
            cy.reload();
            cy.contains("SCancelled").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username, data.pmc.password);
            });
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.contains("SDeclined").should("exist");
        });
    });
});
