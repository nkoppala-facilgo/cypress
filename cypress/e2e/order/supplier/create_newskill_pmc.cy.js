describe("Session Login ", () => {
  beforeEach(() => {
    var data_path = Cypress.env(`data`);
    cy.fixture(`data/${data_path}/login/data`).then(function (data) {
      cy.login_with_session(data.pmc.username, data.pmc.password);
    });
    cy.fixture(`data/${data_path}/order/create_newskill_pmc/data`).then(
      function (data) {
        this.data = data;
      }
    );
  });
  describe(" Skills", function () {
    it(" FC-5266 To verify user is able to create new skill <smoke>", function () {
      cy.visit().wait(3000);
      cy.execute("script/order/create_newskill_pmc", this.data);
      cy.contains("Create skill successfully. Open the last page")
        .should("exist")
        .wait(7000);
    });
  });
});
