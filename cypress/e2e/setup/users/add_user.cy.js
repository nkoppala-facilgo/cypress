describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);

    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/add_user/data`).then(function (data) {
        this.data = data;
      });
  });
  describe("able to open and create user-types", function () {
    it("fc-5614 open user type page and create user <smoke>", function () {
      cy.visit("/user_management");
      cy.execute("script/setup/users/add_user", this.data);
    });
  });
});
