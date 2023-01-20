describe("Session Login", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/cdeclined_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is CDeclined", function () {
        it("FC-11285 WO Status is CDeclined", function () {
            cy.execute("/script/work_order/create_wo_with_project", this.data);
            cy.wait(5000); 
            cy.execute("/script/work_order/non_catalog", this.data);
            cy.contains('button[class="pull-right btn btn-default"]', "Close").click({force: true});
            cy.contains("label", "WO#:").parent().find("input[type=text]").invoke("val").then((wo_number) => {
            cy.visit("/work_orders/" + wo_number);
            cy.wait(2000);
            cy.get(".media").first().click();
            cy.wait(2000);
            cy.reload();
            cy.execute("/script/work_order_end_to_end/void_wo_in_hierarchy_table", this.data);
            cy.get("span[class=caret]").eq(0).click({force: true});
            cy.contains("Logout").click({force: true});
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.visit()
                cy.login_with_session(data.supplier.username, data.supplier.password);
            });
                cy.visit("/work_orders/");
                cy.get(".fa-filter").click();
                cy.select_by_label("WO#(s)", wo_number, 1500);
                cy.contains("button", "Search").click();
                cy.wait(3000);
                cy.get(".media").first().click();
                cy.reload()
                cy.contains("button", "Accept Cancellation").click();
            }); 
        });
    });
});
 

