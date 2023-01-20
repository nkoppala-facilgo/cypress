describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.wait(3000)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.visit();
            cy.execute('script/login/login', data.pmc)
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/sentTosupplier_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is SvcSched", function () {
        it("FC-10820 Verify WO Status is SvcSched", function () {
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.contains("Confirmed").should("exist");
            cy.contains("Copy").should("exist");
            cy.contains("Return Items").should("exist");
            cy.contains("Next Steps").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({ force: true }); 
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
               cy.visit();
               cy.execute('script/login/login', data.supplier)
            });
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.wait(3000);
            cy.execute("/script/work_order_end_to_end/edit_button_on_wo_summary_page", this.data);
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({ force: true }); 
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
               cy.visit();
               cy.execute('script/login/login', data.pmc)
            });
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.contains("SvcSched").should("exist");
            cy.contains("Copy").should("exist");
            cy.contains("Return Items").should("exist");
            cy.contains("Next Steps").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({ force: true }); 
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
               cy.visit();
               cy.execute('script/login/login', data.supplier)
            });
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.contains("SvcSched").should("exist");
            cy.contains("Edit").should("exist");
            cy.contains("Complete").should("exist");
            cy.contains("Reject").should("exist");
        });
    });
});