describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/resume_status/data`).then(function (data) {
            this.data = data;
        })
        })
    describe("verify Resume status button on WO summary page", function() {
        it('fc-7119 To verify Resume status button on WO summary page (WO status- On Hold) <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(4000)
            cy.execute('/script/work_order/resume_status',this.data)
        });
    });
});
    
