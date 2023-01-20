describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/fixed_assets_inventory/non_catalog_order_from_next_step_inspection/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("To Verify user is able to create an non-catalog order from next step inspection for Red and Yellow rating items", function () {
    it("FC-6900 User is able to create an non-catalog order from next step inspection for Red and Yellow rating items.<smoke> ", function () {
      cy.visit("/inspections/new");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/non_catalog_order_from_next_step_inspection",this.data);
    });
  });
});
