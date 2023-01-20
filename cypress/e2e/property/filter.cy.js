describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/property/filter/data`).then(function (data) {
        this.data = data;
      }
    );
  });
  describe("Setup- Property|| User is able to Filter property.", function () {
    it("FC-5612 To verify user is able to filter property ", function () {
      cy.visit("/properties").wait(4000);
      cy.execute("script/property/filter", this.data);
    });
  });
});
