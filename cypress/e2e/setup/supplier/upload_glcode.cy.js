describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/supplier/upload_glcode/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe("Upload GL codes mapping", function () {
    it("FC-3039 Upload GL codes mapping <smoke> ", function () {
      cy.visit("/property_suppliers");
      cy.wait(4000);
      cy.execute("/script/setup/supplier/upload_glcode", this.data);
    });
  });
});
