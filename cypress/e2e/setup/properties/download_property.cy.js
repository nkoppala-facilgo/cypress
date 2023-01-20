describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(
      `data/${data_path}/setup/properties/download_property/data`
    ).then(function (data) {
      this.data = data;
    });
  });
  describe("Setup- Properties || User is able to download Properties file.", function () {
    it("FC-6307 User is able to download Properties file.<smoke> ", function () {
      cy.visit("/properties");
      cy.wait(4000);
      cy.contains("span", "Download Properties").click();
      cy.select_by_label_new("Properties:", " CV0yb");
      cy.contains(".btn-primary", "Download").click({ force: true });
    });
  });
});
