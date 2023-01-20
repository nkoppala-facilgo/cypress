describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("Download the GL codes mapping file", function () {
    it("Fc-5620 Download the GL codes mapping file <smoke> ", function () {
      cy.visit("/property_suppliers");
      cy.wait(4000);
       cy.execute("/script/setup/supplier/download_glcode");
    });
  });
});
