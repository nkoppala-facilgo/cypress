describe('Session Login ',()=>{
    beforeEach(() => {
           var data_path = Cypress.env(`data`)
          cy.fixture(`data/${data_path}/login/data`).then(function (data) {
          cy.login_with_session(data.pmc.username,data.pmc.password);
          });
     cy.fixture(`data/${data_path}/order/through_workflow/data`).then(function (data) {
        this.through_workflow_data = data;
     })
  }) 
    describe("create Order ", function() {
        it(' FC-2204 Test that orders when created go through workflow to the right person <smoke>', function() {
            cy.wait(3000)
            cy.visit()
            cy.get(".icon-menu-work-order").click()
            cy.wait(5000)
            cy.on('uncaught:exception', (err, runnable) => { return false })
            cy.contains("Non-Catalog Order").click()
            cy.wait(3000)
            cy.execute('script/order/through_workflow', this.through_workflow_data)
            var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
        });
    });
});