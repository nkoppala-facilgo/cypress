describe('Session Login ',()=>{
    beforeEach(() => {
        var data_path = Cypress.env(`data`)
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
            cy.on('uncaught:exception', (err, runnable) => { return false })
        });
        cy.fixture(`data/${data_path}/work_order/product_type_catalog_order/data`).then(function (data) {
            this.data = data;
        })
    })
    describe("Product type Catalog Order", function() {
        it('fc-7117 Create Product type Catalog Order <smoke>', function() {
            cy.visit()
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.wait(4000)
            cy.execute('/script/work_order/product_type_catalog_order',this.data)
        });
    });
});
    
