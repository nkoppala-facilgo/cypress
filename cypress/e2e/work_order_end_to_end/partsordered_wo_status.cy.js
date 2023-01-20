describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/partsordered_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is PartsOrdered", function () {
        it("FC-11002 Verify WO Status is PartsOrdered", function () {
              cy.execute("/script/work_order/create_wo_with_project", this.data);
              cy.wait(5000); 
              cy.execute("/script/work_order/prod_type_non_catalog", this.data);
              cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
              cy.get('.confirm').click();
              cy.get('button[class=\"pull-right btn btn-default\"]').contains('button', 'Close').click({force: true});
              cy.visit("/work_orders/" + wo_number);
              cy.get(".media").first().click();
            });
        });
    });
});
