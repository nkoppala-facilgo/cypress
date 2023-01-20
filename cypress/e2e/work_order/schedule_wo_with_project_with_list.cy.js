describe("Session Login ", () => {
    beforeEach(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/schedule_wo_with_project_with_list/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("To verify Work order is create from Dashboard with selecting 'List' field & To verify user is able to search and select project while creating work order from dashboard.", function () {
        it("FC-7462 & FC-9351 schedule a work order with project & schedule a work order with list <smoke>", function () {
            cy.visit("/dashboards/graph");
            cy.wait(7000);
            cy.execute("script/work_order/schedule_wo_with_project_with_list", this.data);
        });
    });
});
