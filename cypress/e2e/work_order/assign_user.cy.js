describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env("data");
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/work_order/assign_user/data`).then(function (data) {
            this.data = data;
        });
    });
    describe("Work Order", function () {
        it('FC-4410 Verify user is able to assign to user on Work Order', function () { 
           cy.visit();
           cy.wait(7000);
           cy.get('.icon-menu-work-order').click();
           cy.on('uncaught:exception', (err, runnable) => { return false });
           cy.contains("Create Work Orders").click();
           cy.wait(5000);
           cy.execute('/script/work_order/assign_user',this.data) 
        });
    });
});
