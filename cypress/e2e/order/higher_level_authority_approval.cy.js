describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.maintenancetechnician1.username,data.maintenancetechnician1.password);
      });
      cy.fixture(`data/${data_path}/order/higher_level_authority_approval/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify that Document approve by one higher level authority then on that time all another person gets notification regarding approval.", function() {
        it('FC-4922 To verify that Document approve by one higher level authority then on that time all another person gets notification regarding approval. <smoke> ', function() {
            cy.visit('/document_orders/new');
            cy.execute('/script/order/exceed_limit',this.data);
            cy.waitUntil(()=>cy.contains("Order was successfully created").should('exist'));
            var data_path = Cypress.env(`data`);
            cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
          });
            cy.execute('/script/order/higher_level_authority_approval',this.data);
        });
    });
});
