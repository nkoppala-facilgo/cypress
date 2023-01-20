describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.pmc.username,data.pmc.password);
        cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/return_items/data`).then(function (data) {
          this.data = data;
        })
        })
    describe("Return Items button functionality", function() {
        it('fc-6894 Verify Return Items button functionality <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(4000)
            cy.execute('/script/work_order/return_items',this.data)
        });
    });
});
