describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.maintenanceManager.username,data.maintenanceManager.password);
      });
      cy.fixture(`data/${data_path}/order/approval_sent_to_upper_level/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify that Maintenance manager document goes to upper level heirarchy for approval.", function() {
        it('FC-4924 To verify that Maintenance manager document goes to upper level heirarchy for approval. <smoke> ', function() {
          cy.visit()
          cy.wait(3000)
          cy.get('.icon-menu-work-order').click()
          cy.wait(5000)
          cy.on('uncaught:exception', (err, runnable) => { return false })
          cy.contains("Non-Catalog Order").click()
          cy.wait(5000)
            cy.execute('/script/order/exceed_limit',this.data);
            cy.wait(10000);
            cy.contains("Order was successfully created.").should('be.visible');
          });
    });
});
