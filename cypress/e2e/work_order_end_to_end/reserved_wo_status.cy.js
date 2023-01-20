describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username, data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order_end_to_end/reserved_wo_status/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Verify WO Status is Reserved", function () {
        it('FC-10480 Verify WO Status is Reserved', function () {
            cy.execute('/script/work_order_end_to_end/work_order_create_reserved_status',this.data);
            cy.wait(4000)
            cy.execute('/script/work_order_end_to_end/reserved_wo_status',this.data);
            cy.contains('Complete').should('exist')
        });
    });
});
