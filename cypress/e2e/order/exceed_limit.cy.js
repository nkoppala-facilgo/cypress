describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.maintenanceManager.username,data.maintenanceManager.password);
      });
      cy.fixture(`data/${data_path}/order/exceed_limit/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify that when Property manager has exceed the document limit then same document should be goes to one upper level for approval.", function() {
        it('fc-4923 To verify that when Property manager has exceed the document limit then same document should be goes to one upper level for approval. <smoke> ', function() {
            cy.visit('/document_orders/new');
            cy.execute('/script/order/exceed_limit',this.data);
             var data_path = Cypress.env(`data`)
            if(data_path=='staging'){
                cy.contains('button','Do Not Save All Items').click()
            }
            cy.wait(9000)
            cy.contains('Order was successfully created.').should('exist')
        });
    });
});
