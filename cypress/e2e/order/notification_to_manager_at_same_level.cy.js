describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.maintenancetechnician1.username,data.maintenancetechnician1.password);
      });
      cy.fixture(`data/${data_path}/order/notification_to_manager_at_same_level/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify that all same level managers gets notification for approve document when they are in same region.", function() {
        it('FC-4920 To verify that all same level managers gets notification for approve document when they are in same region. <smoke> ', function() {
            cy.visit('/document_orders/new');
            cy.execute('/script/order/exceed_limit',this.data);
        });
    });
});
