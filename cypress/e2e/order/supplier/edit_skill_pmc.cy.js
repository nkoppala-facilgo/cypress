describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/edit_skill_pmc/data`).then(function (
      data
    ) {
      this.data = data;
    });
  });
  describe(" Skills", function () {
    it("FC-5265 To verify user is able to edit skill. <smoke>", function () {
      cy.visit().wait(4000);
      cy.execute("script/order/edit_skill_pmc", this.data);
      cy.contains("Update skill successfully, please reload page for check the update")
      .should("exist")
      .wait(7000);
    });
  });
});
