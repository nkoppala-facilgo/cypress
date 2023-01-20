describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
           cy.execute('script/login/login', data.pmc)
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sdeclined_expired_qr/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SDeclined -WO has an expired QR but no Quote", function () {
        it("FC-11004 WO Status is SDeclined -WO has an expired QR but no Quote", function () {
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.wait(3000);
            cy.get(".fa-filter").click();
            cy.select_by_label("WO#(s)", this.data.num_no, 1500);
            cy.contains("button", "Search").click();
            cy.waitUntil(() => cy.get(".media").first().click());
            cy.contains("SDeclined").should("exist");
            cy.contains("(Expired)").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.supplier)
            });
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.wait(3000);
            cy.contains("SDeclined").should("exist");
            cy.contains("(Expired)").should("exist");
        });
    });   
});  
