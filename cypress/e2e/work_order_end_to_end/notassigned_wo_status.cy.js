describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/work_order_create_notassigned_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is NotAssigned", function () {
        it('FC-10449 Verify WO Status is NotAssigned', function () {
            cy.execute('/script/work_order_end_to_end/work_order_create_notassigned_status',this.data);
            cy.wait(3000);
            cy.execute('/script/work_order_end_to_end/complete_wo_status',this.data);
            cy.wait(1000);
            cy.contains('Completed').should('exist');
        });
    });
});
