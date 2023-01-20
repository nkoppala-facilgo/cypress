describe('Session Login',()=>{
    beforeEach(() => {
      var data_path = Cypress.env(`data`)
      cy.fixture(`data/${data_path}/login/data`).then(function (data) {
        cy.login_with_session(data.maintenancesupervisor.username,data.maintenancesupervisor.password);
      });
      cy.fixture(`data/${data_path}/order/same_region_get_notification_for_approval/data`).then(function (data) {
        this.data = data;
      });
    });
    describe("To verify that all Property manager on same level, same region gets notification for approval via E-mail when maintenance supervisor creates document.", function() {
        it('FC-4915 To verify that all Property manager on same level, same region gets notification for approval via E-mail when maintenance supervisor creates document. <smoke> ', function() {
            cy.visit('/document_orders/new');
            cy.execute('/script/order/exceed_limit',this.data);
            cy.wait(5000);
            cy.waitUntil(()=>cy.contains("Order was successfully created").should('be.visible'));
          });
    });
});
