describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
  });
  describe("warranty types", function () {
    it("fc-1220 To verify  user is able to download warranty Types <smoke> ", function () {
      cy.visit("");
      cy.wait(4000);
      cy.execute("/script/fixed_assets_inventory/enable_warrantytypes");
    });
  });
});
