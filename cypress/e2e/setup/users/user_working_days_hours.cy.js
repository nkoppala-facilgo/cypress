describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/user_working_days_hours/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("User is able to import User Working Days/Hours", function () {
    it("fc-1355 User is able to import User Working Days/Hours <smoke> ", function () {
      cy.visit("/user_management");
      cy.wait(400);
      cy.execute("script/setup/users/user_working_days_hours", this.data);
    });
  });
});
