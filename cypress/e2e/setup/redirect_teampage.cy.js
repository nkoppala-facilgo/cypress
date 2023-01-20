describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/redirect_teampage/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe("Setup- Users> Team|| Verify user is able to redirect on Team page.", function () {
    it("Fc-5353 To verify user is redirect to teams page <smoke>", function () {
      cy.visit("/user_management").wait(4000);
      cy.execute("script/setup/redirect_teampage", this.data);
    });
  });
});
