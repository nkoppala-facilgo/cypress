describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/setup/users/disable_team/data`).then(function (data) {
      this.data = data;
    });
  });
  describe("Setup- Users> Team|| Verify user is able to Disable Team ", function () {
    it("FC-5623 Verify user is able to Disable Team <smoke> ", function () {
      cy.visit("/user_management");
      cy.contains("a", "Teams").click();
      cy.wait(4000);
      cy.contains("button", this.data["team"]).parent().parent().find("td").eq(4).invoke("text")
      .then((value) => {
          cy.log(value);
          if (value == "Enabled") {
            this.data.value = "Disable";
            cy.execute("script/setup/users/disable_team", this.data);
          } else {
            this.data.value = "Enable";
            cy.execute("script/setup/users/disable_team", this.data);
          }
        });
    });
  });
});
