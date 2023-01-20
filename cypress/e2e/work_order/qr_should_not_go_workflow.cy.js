describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.fa.username,data.fa.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/qr_should_not_go_workflow/data`).then(function (data) {
            this.data = data;
        })
    })
    describe("QR should not go to workflow for NTE and Vendor Assignment approvals", function() {
        it('fc-6826 Verify that the QR should not go to workflow for NTE and Vendor Assignment approvals <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(4000)
            cy.execute('/script/work_order/qr_should_not_go_workflow',this.data)
        });
    });
});
    
