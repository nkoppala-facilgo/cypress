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
    describe("Verify WO Status is QuoteProvided/SvcOrdered/Confirmed", function () {
        it("FC-10660,Fc-10661,Fc-10819 WO Status is QuoteProvided/SvcOrdered/Confirmed", function () {
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.contains("QuoteProvided").should("exist");
            cy.wait(3000)
            cy.execute("/script/work_order_end_to_end/check_out_from_pmc_side", this.data);
            cy.visit("/work_orders/"+ this.data.num_no);
            cy.waitUntil(() => cy.get(".media").first().click());
            cy.contains("SvcOrdered").should("exist");
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.execute('script/login/login', data.supplier)
            });
            cy.execute("/script/work_order_end_to_end/wo_id_filter", this.data);
            cy.wait(2000);
            cy.reload();
            cy.contains("SReviewed").should("exist");
            cy.wait(3000);
            cy.execute("/script/work_order_end_to_end/confirm_wo_status", this.data);
            cy.reload();
            cy.waitUntil(()=>cy.contains("Confirmed").should("exist"));
            cy.contains("Edit").should("exist");
            cy.contains("Confirmed").should("exist");
        });
    });
});
