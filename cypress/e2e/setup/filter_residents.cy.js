describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/filter_residents/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Residents|| To Verify user is able to filter residents.", function () {
    it("FC-5359 To verify user is filter residents  <smoke>", function () {
      cy.visit("").wait(4000);
      cy.execute("script/setup/filter_residents", this.data);
    });
  });
});
