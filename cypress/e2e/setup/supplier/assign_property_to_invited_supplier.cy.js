describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/supplier/assign_property_to_invited_supplier/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Setup- Supplier|| To verify that PMC is able to assign property to the invited supplier.", function () {
    it("FC-5606 To verify that PMC is able to assign property to the invited supplier. <smoke> ", function () {
      cy.visit("/property_suppliers");
      cy.wait(4000);
      cy.execute("/script/setup/supplier/assign_property_to_invited_supplier",this.data);
    });
  });
});
